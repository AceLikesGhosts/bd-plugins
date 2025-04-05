import Logger from '@lib/logger';
import type { Plugin } from 'betterdiscord';
import { Settings } from './components/Settings';
import config from './config.json';
import { PatchUserPopout } from './patches/PatchUserPopout';

export const DefaultSettings = {
    noteString: 'first opened at %current_date%',
};

export const logger = new Logger(config);

export default class AQuickNote implements Plugin {
    static settings: typeof DefaultSettings;

    public start(): void {
        logger.log('Loading settings.');
        const loadedSettings = BdApi.Data.load(config.name, 'settings');
        AQuickNote.settings = {
            ...DefaultSettings,
            ...loadedSettings
        };

        logger.log('Patching UserPopout');
        PatchUserPopout();
    }

    public stop(): void {
        logger.log('Shutting down');
        
        logger.log('Unpatching');
        BdApi.Patcher.unpatchAll(config.name);
    }

    public getSettingsPanel(): () => JSX.Element {
        return Settings;
    }
}