import parseJSDocMeta from '@lib/utils/Metadata';
import { getSemVer } from '@lib/modules/SemVer';

import type Logger from '@lib/logger';
import type { Meta } from 'betterdiscord';

// ncc doesn't touch this
import fs from 'fs';
import path from 'path';
import Toasts from '@lib/components/Toasts';

// #region booger aids
interface GitHubRelease {
    url: string;
    assets_url: string;
    upload_url: string;
    html_url: string;
    id: number;
    author: {
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
    };
    node_id: string;
    tag_name: string;
    target_commitish: string;
    name: string;
    draft: boolean;
    prerelease: boolean;
    created_at: string;
    published_at: string;
    assets: GitHubReleaseAsset[];
    tarball_url: string;
    zipball_url: string;
    body: string;
}

interface GitHubReleaseAsset {
    url: string;
    id: number;
    node_id: string;
    name: string;
    label: string;
    uploader: {
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
    };
    content_type: string;
    state: string;
    size: number;
    download_count: number;
    created_at: string;
    updated_at: string;
    browser_download_url: string;
}
// #endregion

type UpdateLinkExists = Meta & { updateLink: string; };
export const /** @__PURE__ */ DELAY_TIME = 60 * 1000 * 60;

// Due to webpack, this is completely okay to do, and
// won't leak onto `window`

function showBannerPopup(instance: Updater, remote: { meta: Meta, contents: string; }, localMeta: UpdateLinkExists): void {
    BdApi.UI.showNotice(
        `${ localMeta.name } has an update!`,
        {
            type: 'info',
            buttons: [
                {
                    label: 'Update',
                    onClick: () => {
                        try {
                            writePluginFile(remote.meta, remote.contents);
                            Toasts.toast(`Updated ${ localMeta.name } (v${ localMeta.version }) to ${ remote.meta.version }`, Toasts.Kind.SUCCESS);
                        }
                        catch(err) {
                            Toasts.toast(`Failed to update ${ localMeta.name }.`, Toasts.Kind.FAILURE);
                            instance['logger'].critical(err);
                        }
                        close();
                    }
                }
            ]
        }
    );
}

function fetchBySource(instance: Updater, localMeta: UpdateLinkExists): void {
    const { updateLink } = localMeta;

    void fetch(updateLink, {
        method: 'GET'
    }).then(async response => {
        const text = await response.text();
        const remoteMeta = parseJSDocMeta(text);
        const remoteVersion = getSemVer(remoteMeta.version);

        if(!remoteVersion) {
            instance['logger'].info('Failed to find or parse version of remote.', remoteMeta.version);
            return;
        }

        // assume that local semver is okay
        if(remoteVersion.compare(localMeta.version) !== -1) {
            instance['logger'].info(`Currently up to date (${ localMeta.version } == ${ remoteMeta.version })`);
            return;
        }

        // we are behind remote
        instance['logger'].info(`Showing banner asking to update to version ${ remoteMeta.version }`);

        showBannerPopup(instance, { meta: remoteMeta, contents: text }, localMeta);
    });
}

function fetchByRelease(instance: Updater, meta: UpdateLinkExists): void {
    // https://api.github.com/repos/AceLikesGhosts/bd-plugins/releases
    // -> array
    // -> { name, assets }
    // -> assets: []
    void fetch(meta.updateLink, {
        method: 'GET'
    }).then(async response => {
        const releases: GitHubRelease[] = await response.json();

        for(let i: number = 0; i < releases!.length; i++) {
            const release = releases[i];
            const name = release.name;

            if(!name || typeof name !== 'string') {
                (instance['logger'] as Logger).critical(`Release had invalid 'name' property`, release);
                continue;
            }

            const splitName = name.split('_');
            const releaseName = name[1];

            if(!releaseName || releaseName.toLowerCase() !== meta.name.toLowerCase()) {
                continue;
            }

            const version = splitName[0];

            const remoteSemVer = getSemVer(version);

            if(!remoteSemVer) {
                (instance['logger'] as Logger).critical(`Release version did not follow SemVer rules`, version, remoteSemVer);
                return;
            }

            if(remoteSemVer.compare(meta.version) !== -1) {
                instance['logger'].info(`Currently up to date (${ meta.version } == ${ meta.version })`);
                return;
            }

            for(let j: number = 0; j < release.assets.length; j++) {
                const asset = release.assets[j];
                const { name } = asset;

                if(name.toLowerCase() !== `${ meta.name }.plugin.js`) {
                    continue;
                }

                // waste of resources tech but I DONT CARE!
                fetchBySource(instance, { ...meta, updateLink: asset.browser_download_url });
            }
        }
    });
}

function writePluginFile(meta: Meta, newData: string): void {
    fs.writeFileSync(path.join(BdApi.Plugins.folder, `${ meta.name }.plugin.js`), newData, { encoding: 'utf-8' });
}

/**
 * A generic updater that out sources the work to another one.
 * Only a class for encapsulation.
 * 
 * @warn If a plugin gets added to the official BetterDiscord registery
 * use the native updater, instead of this one.
 */
export default /** @__PURE__ */ class Updater {
    // @ts-expect-error Too bad, liar!
    private readonly logger: Logger | console;
    private interval?: NodeJS.Timeout;

    public constructor(meta: Meta, logger?: Logger) {
        if(!meta.updateLink) {
            (logger?.critical || console.error)(new Error(`No update link was found for plugin ${ meta.name }`));
            return;
        }

        this.logger = logger || console ? { ...console, info: (message: unknown, ...data: unknown[]) => console.log(message, ...data) } : console;
        if(meta.updateLink.startsWith('https://raw.githubusercontent.com/')) {
            this.interval = setInterval(() => {
                fetchBySource(this, meta as UpdateLinkExists);
            }, DELAY_TIME);
        }
        else if(meta.updateLink.startsWith('https://github.com/')) {
            this.interval = setInterval(() => {
                fetchByRelease(this, meta as UpdateLinkExists);
            }, DELAY_TIME);
        }
        else {
            (logger?.critical || console.error)(new Error(`Update link exists but it does not match a raw link or project link.`));
        }
    }

    public stop(): void {
        this['logger'].log('Removed update interval.');
        clearInterval(this.interval);
        this.interval = void 0;
    }
}