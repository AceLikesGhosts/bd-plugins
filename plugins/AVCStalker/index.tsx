import type { Cancel, Plugin } from 'betterdiscord';
import config from './config.json';
import PatchUserCallHeader from './patches/UserCallHeader';
import Logger from '@lib/logger';

import Settings from './components/Settings';
import onVoiceChange from './voiceState';
import Dispatcher from '@lib/modules/Dispatcher';
import PatchUserContext from './patches/UserContext';
import PatchUserAccountMenu from './patches/UserAccountMenu';
import PatchUserPopout from './patches/UserPopout';
import { save } from './data/FileData';

// #region cringe result of @vercel/ncc.
export const Icons = {
    LiaUserSlashSolid: `<path d="M 3.6992188 2.3007812 L 2.3007812 3.6992188 L 9.1210938 10.519531 C 9.1148472 10.54659 9.1055539 10.572434 9.0996094 10.599609 L 11 12.5 L 11 12.398438 L 15.601562 17 L 15.5 17 L 17.699219 19.199219 C 17.749353 19.210917 17.795909 19.231553 17.845703 19.244141 L 23.660156 25.058594 C 23.670754 25.106568 23.68955 25.150877 23.699219 25.199219 L 25.5 27 L 25.601562 27 L 28.300781 29.699219 L 29.699219 28.300781 L 25.59375 24.195312 C 24.75029 21.314801 22.648326 18.945754 19.900391 17.800781 C 21.800391 16.500781 23 14.4 23 12 C 23 8.1 19.9 5 16 5 C 13.390973 5 11.146509 6.4199607 9.921875 8.5234375 L 3.6992188 2.3007812 z M 16 7 C 18.8 7 21 9.2 21 12 C 21 14.086994 19.776043 15.83791 17.994141 16.595703 L 11.404297 10.005859 C 12.16209 8.2239568 13.913006 7 16 7 z M 9.0996094 13.300781 C 9.4996094 15.200781 10.499609 16.800781 12.099609 17.800781 C 8.4996094 19.300781 6 22.9 6 27 L 8 27 C 8 22.9 11.000391 19.599609 14.900391 19.099609 L 9.0996094 13.300781 z"></path>`,
    GaUserAdd: `<path fill-rule="evenodd" clip-rule="evenodd" d="M8 11C10.2091 11 12 9.20914 12 7C12 4.79086 10.2091 3 8 3C5.79086 3 4 4.79086 4 7C4 9.20914 5.79086 11 8 11ZM8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z" fill="currentColor"/><path d="M11 14C11.5523 14 12 14.4477 12 15V21H14V15C14 13.3431 12.6569 12 11 12H5C3.34315 12 2 13.3431 2 15V21H4V15C4 14.4477 4.44772 14 5 14H11Z" fill="currentColor"/><path d="M18 7H20V9H22V11H20V13H18V11H16V9H18V7Z" fill="currentColor" />`,
    GaUser: `<path fill-rule="evenodd" clip-rule="evenodd" d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z" fill="currentColor"/><path d="M16 15C16 14.4477 15.5523 14 15 14H9C8.44772 14 8 14.4477 8 15V21H6V15C6 13.3431 7.34315 12 9 12H15C16.6569 12 18 13.3431 18 15V21H16V15Z" fill="currentColor"/>`,
    GoPeople: `<path d="M3.5 8a5.5 5.5 0 1 1 8.596 4.547 9.005 9.005 0 0 1 5.9 8.18.751.751 0 0 1-1.5.045 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.499-.044 9.005 9.005 0 0 1 5.9-8.181A5.496 5.496 0 0 1 3.5 8ZM9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm8.29 4c-.148 0-.292.01-.434.03a.75.75 0 1 1-.212-1.484 4.53 4.53 0 0 1 3.38 8.097 6.69 6.69 0 0 1 3.956 6.107.75.75 0 0 1-1.5 0 5.193 5.193 0 0 0-3.696-4.972l-.534-.16v-1.676l.41-.209A3.03 3.03 0 0 0 17.29 8Z"/>`,
    RxCross2: `<path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor"/>`
};
// #endregion end of cringe
export const DefaultSettings = {
    voiceChatFollowing: {
        clickVoiceChatButtonClears: true
    },
    userPopout: false,
    vcLogging: {
        enabled: false,
        // list of user ids
        whitelisted: [] as string[],
        // megabytes
        maxSize: 1000,
        logFriends: true,
        logCorrelatedPeople: false,
        filePath: '%plugins%/AVCStalker_VSLogs.json'
    },
    contextMenu: {
        individual: true,
        showLogButton: false,
        showWhitelistButton: false,
        name: 'Voice Utilities'
    }
};

export const logger = new Logger(config);

export default class AVCStalker implements Plugin {
    static settings: typeof DefaultSettings = DefaultSettings;
    public cancelUserContextPatch: Cancel | null = null;

    start(): void {
        const loadedSettings = BdApi.Data.load(config.name, 'settings');
        AVCStalker.settings = {
            ...DefaultSettings,
            ...loadedSettings
        };

        Dispatcher.subscribe('VOICE_STATE_UPDATES', onVoiceChange);

        logger.info('Patching UserCallHeader');
        PatchUserCallHeader();
        logger.info('Patching UserContext');
        this.cancelUserContextPatch = PatchUserContext();
        logger.info('Patching UserPopout');
        PatchUserPopout();
        logger.info('Dom-Patching UserAccountPanel');
        PatchUserAccountMenu();
    }

    stop(): void {
        logger.info('Unpatching everything under the name of ', config.name);
        BdApi.Patcher.unpatchAll(config.name);

        this.cancelUserContextPatch!();

        logger.info('Unsubscribed from VOICE_STATE_UPDATES (vc monitoring');
        Dispatcher.unsubscribe('VOICE_STATE_UPDATES', onVoiceChange);

        logger.info('Saving settings', AVCStalker.settings);
        BdApi.Data.save(config.name, 'settings', AVCStalker.settings);

        logger.info('Saving VC logs');
        save();

        const elm = document.getElementById('ClearFollowing');
        if(elm) elm.remove();
    }

    getSettingsPanel(): () => JSX.Element {
        return Settings;
    }

    onSwitch(): void {
        logger.info('Dom-Patching UserAccountPanel');
        PatchUserAccountMenu();
    }
}