import type { Meta, Plugin } from 'betterdiscord';

import Logger from '@lib/logger';
import AccountSwitcher from './patches/AccountSwitcher';
import GuildVerification from './patches/GuildVerification';
import Idle from './patches/Idle';
import NSFWPatch from './patches/NSFWPatch';
import PTT from './patches/PTT';
import setBadge from './patches/setBadge';
import SpotifyPremium from './patches/SpotifyPremium';
import StreamPreview from './patches/StreamPreview';
import Timeout from './patches/Timeout';
import { Settings } from './components/Settings';

export const DefaultSettings = {
    PTT: false,
    CallTimeout: false,
    NSFW: false,
    StreamPreview: false,
    CustomPreviewImage: '',
    SpotifyPremium: false,
    SpotifyPause: false,
    Verification: false,
    MaxAccounts: false,
    Idle: false,
    electronBadge: false
};

export default class ADiscordBypasses implements Plugin {
    public readonly logger: Logger;
    public constructor(meta: Meta) {
        this.logger = new Logger(meta);
    }

    public static settings: typeof DefaultSettings | undefined = void 0;

    start(): void {
        this.logger.log('started');
        ADiscordBypasses.settings = BdApi.Data.load('ADiscordBypasses', 'settings') || DefaultSettings;

        NSFWPatch(this);
        SpotifyPremium(this);
        Timeout(this);
        GuildVerification(this);
        StreamPreview(this);
        PTT(this);
        AccountSwitcher(this);
        Idle();
        setBadge();
    }

    stop(): void {
        this.logger.log('stopped');
        BdApi.Data.save('ADiscordBypasses', 'settings', ADiscordBypasses.settings);
        BdApi.Patcher.unpatchAll('ADiscordBypasses');
    }

    getSettingsPanel(): () => JSX.Element {
        return Settings;
    }
}