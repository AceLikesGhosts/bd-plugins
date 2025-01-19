import type { Plugin } from 'betterdiscord';
import type { TPropertiesToSpoofAs } from './utils';
import Logger from '@lib/logger';
import meta from './config.json';
import PatchPropertyManager from './patches/PropertyManager';
import Settings from './components/Settings';
import PatchGameManager from './patches/GameManager';

const DefaultSettings = {
    type: 'win32'
} as { active: boolean; type: keyof TPropertiesToSpoofAs; };

export const logger = new Logger(meta);
export { meta };
export default class PlatformSpoofer implements Plugin {
    public static settings: typeof DefaultSettings;

    public start(): void {
        logger.log('started');

        PlatformSpoofer.settings = {
            ...DefaultSettings,
            ...BdApi.Data.load(meta.name, 'settings')
        };

        PatchPropertyManager();
        PatchGameManager();
    }

    public stop(): void {
        BdApi.Patcher.unpatchAll(meta.name);
        BdApi.Data.save(meta.name, 'settings', PlatformSpoofer.settings);
        BdApi.UI.showConfirmationModal('Refresh Client', 'In order to fully disable PlatformSpoofer you are required to reload your Discord client.', {
            onConfirm() {
                window.location.reload();
            }
        });
    }

    public getSettingsPanel(): () => React.ReactNode {
        return Settings.bind(this);
    }
}