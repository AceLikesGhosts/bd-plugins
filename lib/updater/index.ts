import { getSemVer } from '@lib/common/SemVer';
import Logger from '@lib/logger';
import type Meta from '@lib/types';
import parseJSDocMeta from '@lib/utils/Metadata';
import { writeFileSync } from 'fs';
import { join } from 'path';

const updateLogger = new Logger({
    name: 'Updater',
    version: 'INTERNAL'
} as Meta);

interface GithubRelease {
    /** The name of the tag, ie. v1.0.0_Plugin, follows SemVer */
    tag_name: string;
    /** The assets related to the release */
    assets: GithubAsset[];
}

interface GithubAsset {
    /** The name of the file within the asset */
    name: string;
    /** The link to download the file. */
    browser_download_url: string;
}


/**
 * Wrapper around writeFileSync to write plugins
 */
async function updateFile(meta: Meta, text: string): Promise<void> {
    updateLogger.info('Updated "' + meta.name + '" to version "' + meta.version + '".');
    writeFileSync(
        join(
            BdApi.Plugins.folder,
            `${ meta.name }.plugin.js`
        ),
        text
    );
}


function showNotice(meta: Meta, type: 'raw' | 'releases'): void {
    const close = BdApi.UI.showNotice(
        `${ meta.name } (v${ meta.version }) has an available update!`,
        {
            type: 'info',
            buttons: [
                {
                    label: 'Update',
                    onClick: () => {
                        if(type === 'releases') {
                            void updateByRelease(meta);
                        }
                        else if(type === 'raw') {
                            void updateByRaw(meta);
                        }

                        close();
                    }
                },
                {
                    label: 'Close',
                    onClick: () => {
                        close();
                    }
                }
            ]
        }
    );
}

async function fetchLatestRelease(meta: Meta): Promise<GithubRelease[]> {
    let repo = meta.updateLink?.split('.com/')[1];
    if(repo![repo!.length - 1] === '/') {
        repo = repo?.substring(0, repo.length - 1);
    }

    const resp = await fetch(`https://api.github.com/repos/${ repo }/release`);
    return await resp.json() as GithubRelease[];
}

async function updateByRelease(meta: Meta): Promise<void> {
    const releases = await fetchLatestRelease(meta);
    const localSemVer = getSemVer(meta.version);

    if(!localSemVer) {
        throw new Error('Local metadata\'s version was broken, expected a valid version following SemVer but recieved "' + meta.version + '"');
    }

    for(const release of releases) {
        const splitName = release.tag_name.split('_') as [string, string];

        if(splitName[1] !== meta.name) {
            updateLogger.debug('releases : expected "' + meta.name + '" but got "' + splitName[1] + '".');
            continue;
        }

        if(localSemVer.compare(splitName[0]) !== -1) {
            updateLogger.debug('releases : "' + splitName[0] + '" was not later than the current build "' + meta.version + '".');
            return;
        }

        for(const asset of release.assets) {
            if(asset.name !== `${ meta.name }.plugin.js`) {
                updateLogger.debug('releases : expected "' + meta.name + '.plugin.js" but recieved "' + asset.name + '".');
                continue;
            }

            const assetFetch = await fetch(asset.browser_download_url);
            const blob = await assetFetch.blob();
            const text = await blob.text();
            await updateFile(meta, text);
        }
    }
}

async function updateByRaw(meta: Meta): Promise<void> {
    const url = meta.source || meta.updateLink;
    const resp = await fetch(url!);
    const text = await resp.text();
    await updateFile(meta, text);
}

// #region Update Checks 
async function canUpdateRaw(meta: Meta): Promise<void> {
    const url = meta.updateLink || meta.source;

    const resp = await fetch(url!);
    const text = await resp.text();

    const remoteMeta = parseJSDocMeta(text);

    const localSemver = getSemVer(meta.version);
    if(!localSemver) {
        throw new Error('Local metadata\'s version was broken, expected a valid version following SemVer but recieved "' + meta.version + '"');
    }

    if(localSemver.compare(remoteMeta.version) !== -1) {
        updateLogger.debug('releases : "' + remoteMeta.version + '" was not later than the current build "' + meta.version + '".');
        return;
    }

    return showNotice(meta, 'raw');
}

/** Checks if remote has an update with releases */
async function canUpdateReleases(meta: Meta): Promise<void> {
    const releases = await fetchLatestRelease(meta);
    const localSemVer = getSemVer(meta.version);
    if(!localSemVer) {
        throw new Error('Local metadata\'s version was broken, expected a valid version following SemVer but recieved "' + meta.version + '"');
    }

    for(const release of releases) {
        // [0] = v0.0.0
        // [1] = Plugin Name
        const splitName = release.tag_name.split('_') as [string, string];
        if(splitName[1] !== meta.name) {
            updateLogger.debug('releases : expected "' + meta.name + '" but got "' + splitName[1] + '".');
            continue;
        }

        if(localSemVer.compare(splitName[0]) !== -1) {
            updateLogger.debug('releases : "' + splitName[0] + '" was not later than the current build "' + meta.version + '".');
            return;
        }

        return showNotice(meta, 'releases');
    }
}
// #endregion

export default /** @__PURE__ */ class Updater {
    // private readonly meta: Meta;
    private readonly interval: NodeJS.Timeout | null = null;

    public constructor(meta: Meta) {
        if(!fetch) {
            throw new Error('missing Fetch on window, can\'t make requests');
        }

        if(!meta.updateLink && !meta.source) {
            throw new Error('Updater instance was created when there is no updateLink or source');
        }

        if(meta.updateLink?.startsWith('https://raw.githubusercontent.com/') || meta.source?.startsWith('https://raw.githubusercontent.com/')) {
            this.interval = setInterval(() => {
                updateLogger.debug('checking if it\'s possible to update from raw');
                void canUpdateRaw(meta);
                // void updateFromRaw(meta);
            });
        }
        else if(meta.updateLink?.startsWith('https://github.com/')) {
            this.interval = setInterval(() => {
                updateLogger.debug('checking if it\'s possible to update from releases');
                void canUpdateReleases(meta);
            });
        }
        else {
            throw new Error('Invalid updateLink (not a Github raw nor repo URL), and there was no source URL.');
        }
    }

    public stop(): void {
        if(this.interval) {
            updateLogger.debug('clearing Update interval');
            clearInterval(this.interval);
        }
    }
}