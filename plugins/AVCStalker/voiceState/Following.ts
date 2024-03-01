import ChannelStore from '@lib/stores/ChannelStore';
import UserStore from '@lib/stores/UserStore';
import { logger } from '..';
import { joinCall } from '../util';
import type { UserVoiceState } from '@lib/stores/VoiceStateStore';

/**
 * Set of userIDs to follow, aka who we care about
 * to follow
 */
export const followingPeople = new Set<string>();

export function followFromVoiceState(vs: UserVoiceState): void {
    if(vs.channelId === null || !vs.channelId) {
        BdApi.UI.showToast(`${ UserStore.getUser(vs.userId).globalName } left voice chat!`, { type: 'warn' });
        return;
    }

    const channel = ChannelStore.getChannel(vs.channelId);
    const msg = `Joining ${ UserStore.getUser(vs.userId).globalName } in #${ channel.name }`;

    logger.info(msg);
    BdApi.UI.showToast(msg);

    joinCall(vs, channel);
}
