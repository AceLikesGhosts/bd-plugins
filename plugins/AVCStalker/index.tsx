import type { Plugin } from 'betterdiscord';
import config from './config.json';
import PatchUserCallHeader from './patches/UserCallHeader';
import Logger from '@lib/logger';

// import Dispatcher from '@lib/modules/Dispatcher';
// import { onVoiceChange } from './voiceActivity';
// import { saveToFile } from './VoiceLogFile';
import Settings from './components/Settings';

// #region cringe result of @vercel/ncc.
export const Icons = {
    LiaUserSlashSolid: `<path d="M 3.6992188 2.3007812 L 2.3007812 3.6992188 L 9.1210938 10.519531 C 9.1148472 10.54659 9.1055539 10.572434 9.0996094 10.599609 L 11 12.5 L 11 12.398438 L 15.601562 17 L 15.5 17 L 17.699219 19.199219 C 17.749353 19.210917 17.795909 19.231553 17.845703 19.244141 L 23.660156 25.058594 C 23.670754 25.106568 23.68955 25.150877 23.699219 25.199219 L 25.5 27 L 25.601562 27 L 28.300781 29.699219 L 29.699219 28.300781 L 25.59375 24.195312 C 24.75029 21.314801 22.648326 18.945754 19.900391 17.800781 C 21.800391 16.500781 23 14.4 23 12 C 23 8.1 19.9 5 16 5 C 13.390973 5 11.146509 6.4199607 9.921875 8.5234375 L 3.6992188 2.3007812 z M 16 7 C 18.8 7 21 9.2 21 12 C 21 14.086994 19.776043 15.83791 17.994141 16.595703 L 11.404297 10.005859 C 12.16209 8.2239568 13.913006 7 16 7 z M 9.0996094 13.300781 C 9.4996094 15.200781 10.499609 16.800781 12.099609 17.800781 C 8.4996094 19.300781 6 22.9 6 27 L 8 27 C 8 22.9 11.000391 19.599609 14.900391 19.099609 L 9.0996094 13.300781 z"></path>`,
    GaUserAdd: `<path fill-rule="evenodd" clip-rule="evenodd" d="M8 11C10.2091 11 12 9.20914 12 7C12 4.79086 10.2091 3 8 3C5.79086 3 4 4.79086 4 7C4 9.20914 5.79086 11 8 11ZM8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z" fill="currentColor"/><path d="M11 14C11.5523 14 12 14.4477 12 15V21H14V15C14 13.3431 12.6569 12 11 12H5C3.34315 12 2 13.3431 2 15V21H4V15C4 14.4477 4.44772 14 5 14H11Z" fill="currentColor"/><path d="M18 7H20V9H22V11H20V13H18V11H16V9H18V7Z" fill="currentColor" />`,
    GaUser: `<path fill-rule="evenodd" clip-rule="evenodd" d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z" fill="currentColor"/><path d="M16 15C16 14.4477 15.5523 14 15 14H9C8.44772 14 8 14.4477 8 15V21H6V15C6 13.3431 7.34315 12 9 12H15C16.6569 12 18 13.3431 18 15V21H16V15Z" fill="currentColor"/>`
};
// #endregion end of cringe
const DefaultSettings = {
    //              👇 MB, aka 1gb
    maxLogFileSize: 1024,
    whoToLog: {
        friends: true,
        randoms: false
    },
    shouldPurge: false,
    // days
    purgeWhen: 7
};

// export let settings: typeof DefaultSettings = DefaultSettings;
export const logger = new Logger(config);

export default class AUserVoiceLocation implements Plugin {
    static settings: typeof DefaultSettings = DefaultSettings;

    start(): void {
        const loadedSettings = BdApi.Data.load(config.name, 'settings');
        AUserVoiceLocation.settings = {
            ...DefaultSettings,
            ...loadedSettings
        };

        // Dispatcher.subscribe('VOICE_STATE_UPDATES', onVoiceChange);

        logger.info('Patching UserCallHeader');
        PatchUserCallHeader();
    }

    stop(): void {
        logger.info('Unpatching everything under the name of ', config.name);
        BdApi.Patcher.unpatchAll(config.name);

        logger.info('Unsubscribed from VOICE_STATE_UPDATES (vc monitoring');
        // Dispatcher.unsubscribe('VOICE_STATE_UPDATES', onVoiceChange);

        logger.info('Saving settings', AUserVoiceLocation.settings);
        BdApi.Data.save(config.name, 'settings', AUserVoiceLocation.settings);

        logger.info('Saving creepy stalker data to json file');
        // saveToFile();
    }

    getSettingsPanel(): () => JSX.Element {
        return Settings;
    }
}