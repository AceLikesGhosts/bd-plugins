import { getSemVer } from '@lib/common/SemVer';
import Logger from '@lib/logger';
import parseJSDocMeta from '@lib/utils/Metadata';
import type { Meta } from 'betterdiscord';

// ncc doesn't touch our funny imports
import { unlink, writeFile } from 'fs';
import path from 'path';
import type { SemVer } from 'semver';

const updateLogger = new Logger(
    {
        name: 'Updater',
        version: 'INTERNAL'
    } as Meta
);

interface GithubRelease {
    tag_name: string;
    assets: GithubAsset[];
}

interface GithubAsset {
    name: string;
    browser_download_url: string;
}

async function downloadFromRelease(currentMeta: Meta, currentSemver: SemVer): Promise<void> {
    const releaseURL: string = `https://api.github.com/repos/${ currentMeta.updateLink!.split('.com/')[1] }`;
    const releases = await (
        await fetch(releaseURL)
    ).json() as GithubRelease[];

    for(let i: number = 0; i < releases.length; i++) {
        const release = releases[i];
        // v1.0.0_NAME
        // v0.5.1-RC_NAME
        const splitName = release.tag_name.split('_');
        const name = splitName[1];

        // missing name, or wrong name (this will fuck people who rename plugins)
        if(!name || name !== currentMeta.name) {
            continue;
        }

        // our version is higher
        if(currentSemver.compare(splitName[0]) !== -1) {
            continue;
        }

        for(let j: number = 0; j < release.assets.length; j++) {
            const asset = release.assets[j];
            if(asset.name !== `${ currentMeta.name }.plugin.js`) {
                continue;
            }

            // this is the asset we want to use.
            // we now have to download it
            const outPath = path.join(BdApi.Plugins.folder, `${ currentMeta.name }.plugin.js`);
            const resp = await fetch(asset.browser_download_url);
            const buffer = await resp.arrayBuffer();
            unlink(outPath, (err) => {
                if(err) {
                    updateLogger.critical(err);
                    return;
                }

                updateLogger.debug('unlinked file', outPath);

                writeFile(outPath, Buffer.from(buffer), {}, (err) => {
                    if(err) {
                        updateLogger.critical(err);
                        return;
                    }

                    updateLogger.debug(`updated plugin ${ currentMeta.name } to ${ splitName[0] } from ${ currentMeta.version }`);
                });
            });
        }
    }
}

async function downloadFromRaw(currentMeta: Meta, currentSemver: SemVer): Promise<void> {
    const text = await (await fetch(currentMeta.updateLink!)).text();
    const rawMeta = parseJSDocMeta(text);

    if(currentSemver.compare(rawMeta.version) !== -1) {
        return;
    }

    const outPath = path.join(BdApi.Plugins.folder, `${ currentMeta.name }.plugin.js`);
    unlink(outPath, (err) => {
        if(err) {
            updateLogger.critical(err);
            return;
        }

        writeFile(outPath, text, (err) => {
            if(err) {
                updateLogger.critical(err);
                return;
            }

            updateLogger.debug(`updated plugin ${ currentMeta.name } to ${ rawMeta.version } from ${ currentMeta.version }`);
        });
    });
}

export default /** @__PURE__ */ class Updater {
    public static DURATION: number = 3600;
    public constructor(meta: Meta) {
        const semVer = getSemVer(meta.version) as SemVer;
        if(meta.updateLink?.startsWith('https://github.com/')) {
            return setInterval(() => {
                updateLogger.debug('attempting to download from releases');
                void downloadFromRelease(meta, semVer);
            }, Updater.DURATION);
        }
        else if(meta.updateLink?.startsWith('https://raw.github.com/')) {
            return setInterval(() => {
                updateLogger.debug('attempting to download from raw');
                void downloadFromRaw(meta, semVer);
            }, Updater.DURATION);
        }
        else {
            throw new Error(`Illegal Scheme Expected: Recieved UpdateURL "${ meta.updateLink }" but it was not a Raw Github link nor a link to a mono repo supporting releases.`);
        }
    }
}