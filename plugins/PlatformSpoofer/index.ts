import Logger from '@lib/logger';
import type { Plugin } from 'betterdiscord';
import config from './config.json';
import Settings from './components/Settings';

interface IDiscordWebSocket {
    close(): void;
    connect(): void;
    isClosed(): void;
    isConnected(): void;
}

interface IPropertyShit {
    getSuperProperties(): { browser: string; os: string; } & Record<string, unknown>;
}

export const PropertiesToSpoofAs = {
    ios: {
        browser: 'Discord iOS',
        os: 'iOS'
    },
    android: {
        browser: 'Discord Android',
        os: 'Android'
    },
    web: {
        browser: 'Discord Web',
        os: 'Other'
    },
    linux: {
        browser: 'Discord Client',
        os: 'Linux'
    },
    win32: {
        browser: 'Discord Client',
        os: 'Windows'
    },
    darwin: {
        browser: 'Discord Client',
        os: 'Mac OS X'
    }
};

export interface ISettings {
    active: boolean;
    type: 'ios' | 'android' | 'web' | 'linux' | 'win32' | 'darwin';
}

export default class PlatformSpoofer implements Plugin {
    public static socket: IDiscordWebSocket | null = null;
    public propertyStuff: IPropertyShit | null = null;

    public static DefaultSettings: ISettings = {
        active: true,
        type: 'win32'
    };
    public static settings: ISettings = this.DefaultSettings;

    private readonly logger = new Logger(config);

    public start(): void {
        this.logger.log('started');

        this.logger.log('found websocket module');
        PlatformSpoofer.socket = BdApi.Webpack.getByKeys('socket', 'localVoiceState').socket;
        this.logger.log('found property related things (getSuperProperties, getSuperPropertiesBase64)');
        this.propertyStuff = BdApi.Webpack.getByKeys('getSuperProperties', 'getSuperPropertiesBase64');

        this.logger.log('patched `getSuperProperties`');
        BdApi.Patcher.instead(config.name, this.propertyStuff!, 'getSuperProperties', (context, args, orig) => {
            if(!PlatformSpoofer.settings.active) return orig.apply(context, args);

            const data = orig.apply(context, args);
            return {
                ...data,
                browser: PropertiesToSpoofAs[PlatformSpoofer.settings?.type]?.browser,
                os: PropertiesToSpoofAs[PlatformSpoofer.settings?.type]?.os
            };
        });
    }

    public stop(): void {
        BdApi.Patcher.unpatchAll(config.name);
        BdApi.UI.showConfirmationModal('Refresh Client', 'In order to fully disable PlatformSpoofer you are required to reload your Discord client.', {
            onConfirm() {
                window.location.reload();
            },
            onCancel() {
                return;
            },
        });
    }

    public getSettingsPanel(): () => JSX.Element {
        return Settings.bind(this);
    }
}