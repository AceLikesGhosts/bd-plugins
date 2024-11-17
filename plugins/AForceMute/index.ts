import type { Cancel, Plugin } from 'betterdiscord';
import Logger from '@lib/logger';
import config from './config.json';
import PatchUserContext from './patches/userContext';
import Dispatcher from '@lib/modules/Dispatcher';
import onVoiceStateUpdate from './listeners/onVoiceUpdate';

export const logger = new Logger(config);
export const forceMuteCache = {} as Record<string, boolean>;

export default class AForceMute implements Plugin {
    public userContextCancel: Cancel | null = null;

    public start(): void {
        logger.info('Patching User-Context');
        this.userContextCancel = PatchUserContext();

        logger.info('Subscribing to VOICE_STATE_UPDATES');
        Dispatcher.subscribe('VOICE_STATE_UPDATES', onVoiceStateUpdate);
    }

    public stop(): void {
        logger.info('Cancelling User-Context patch');
        this.userContextCancel?.();

        logger.info('Unsubscribing to VOICE_STATE_UPDATES');
        Dispatcher.unsubscribe('VOICE_STATE_UPDATES', onVoiceStateUpdate);
    }
}