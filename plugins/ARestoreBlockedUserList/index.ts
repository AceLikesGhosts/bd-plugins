import Logger from '@lib/logger';
import type { Plugin } from 'betterdiscord';
import meta from './config.json';
import { patchFriendsTabList } from './patches/friendsTabList';
import { patchAnalyticsContext } from './patches/analyticProvider';

const logger: Logger = new Logger(meta);
export { meta };

export default class ARestoreBlockedUserList implements Plugin {
    public start(): void {
        logger.info('started');

        patchFriendsTabList();
        patchAnalyticsContext()
    }

    public stop(): void {
        logger.info('unpatching');
        BdApi.Patcher.unpatchAll(meta.name);

        logger.info('stopped');
    }
}