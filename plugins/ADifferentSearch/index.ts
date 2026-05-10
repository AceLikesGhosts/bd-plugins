import Logger from '@lib/logger';
import type { Plugin } from 'betterdiscord';
import meta from './config.json';
import Settings from './Settings';

const logger: Logger = new Logger(meta);
export { meta };

const DefaultSettings = {
    searchEngineName: 'startpage',
    searchEngineURL: 'https://startpage.com/sp/search?query='
};


const capitalise = (str: string) => str[0].toUpperCase() + str.slice(1, str.length);

export default class ADifferentSearch implements Plugin {
    public static settings: typeof DefaultSettings = DefaultSettings;

    public start(): void {
        logger.info('started');

        logger.info('Loading settings.');
        ADifferentSearch.settings = {
            ...DefaultSettings,
            ...BdApi.Data.load(meta.name, 'settings')
        };

        (async () => {
            // dear squid, doggsyboosty, and arven.
            // i hate you.
            // stop breaking API and making me do bullshit like this.
            // how dare you break an API with a semver MINOR update.
            // fuck you.
            const mod = await BdApi.Webpack.waitForModule(BdApi.Webpack.Filters.byStrings('search-google'), { raw: true });
            const key = Object.keys(mod.exports).find(k => typeof mod.exports[k] === 'function' && mod.exports[k].toString().includes('search-google'))!;
            BdApi.Patcher.after(meta.name, mod.exports, key, (_, args, ret) => {
                if(
                    !args[0] ||
                    typeof args[0] !== 'string' ||
                    !Array.isArray(ret) ||
                    !ret[0]
                ) {
                    return;
                }

                ret[0].props.label = `Search with ${ capitalise(ADifferentSearch.settings.searchEngineName) }`;
                BdApi.Patcher.instead(meta.name, ret[0].props, 'action', () => {
                    window.open(
                        ADifferentSearch.settings.searchEngineURL + args[0]
                    );
                });
            });
        })();
    }

    public stop(): void {
        logger.info('stopped');

        logger.info('Saving settings.');
        BdApi.Data.save(meta.name, 'settings', ADifferentSearch.settings);

        logger.info('Unpatching');
        BdApi.Patcher.unpatchAll(meta.name);
    }

    public getSettingsPanel(): () => React.ReactNode {
        return Settings;
    }
}