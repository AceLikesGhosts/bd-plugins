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

        const [mod, key] = BdApi.Webpack.getWithKey(
            BdApi.Webpack.Filters.byStrings('search-google'),
        );

        BdApi.Patcher.after(meta.name, mod, key, (_, [searchString], [ret]) => {
            ret.props.label = `Search with ${ capitalise(ADifferentSearch.settings.searchEngineName) }`;
            BdApi.Patcher.instead(meta.name, ret.props, 'action', () => {
                window.open(
                    ADifferentSearch.settings.searchEngineURL + searchString
                );
            });
        });
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