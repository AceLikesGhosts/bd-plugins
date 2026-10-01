import type { UserVoiceState } from '@lib/stores/VoiceStateStore';
import type { Channel } from '@lib/stores/ChannelStore';
import UserStore from '@lib/stores/UserStore';
import ChannelStore from '@lib/stores/ChannelStore';
import GuildChannelStore from '@lib/stores/GuildChannelStore';
import { joinCall, voiceChannelUtils, canJoinCall } from '../util';
import AVCStalker, { logger } from '..';
import VoiceStateStore from '@lib/stores/VoiceStateStore';

/**
 * Set of userIDs to follow, aka who we care about
 * to follow
 */
export const followingPeople = new Set<string>();
/**
 * Set of userIDs to avoid
 */
export const avoidingPeople = new Set<string>();

export function followFromVoiceState(vs: UserVoiceState): void {
    if(vs.channelId === vs.oldChannelId) return;
    if(vs.channelId === null || !vs.channelId) {
        BdApi.UI.showToast(`${ UserStore.getUser(vs.userId).globalName } left voice chat!`, { type: 'warn' });
        return;
    }

    joinCall(vs);
}

export function avoidFromVoiceState(vs: UserVoiceState): void {
    if(vs.channelId !== VoiceStateStore.getVoiceStateForUser(UserStore.getCurrentUser().id)?.channelId)
        return;

    if(vs.channelId === null || !vs.channelId) {
        logger.log(`AVOIDING: ${ UserStore.getUser(vs.userId).globalName } left voice chat!`);
        return;
    }

    const currentChannel = ChannelStore.getChannel(vs.channelId);
    if(!currentChannel || !currentChannel.guild_id) {
        logger.error(`AVOIDING: Failed to find current channel or the guild_id`, currentChannel);
        return;
    }

    const guildId = currentChannel.guild_id;
    const voiceChannels = GuildChannelStore.getVocalChannelIds(guildId);
    const currentVC = voiceChannels.indexOf(vs.channelId);

    if(currentVC === -1) {
        logger.error(`AVOIDING: Failed to find the call we are currently in within the Guild's voice channels`);
        return;
    }

    const channel = findAvailableAvoidCall(voiceChannels, currentVC);

    if(!channel) {
        logger.error(`AVOIDING: Failed to find call to avoid a user in,,,?`, channel, currentVC, voiceChannels);
        BdApi.UI.showToast('Failed to find an empty channel.', { type: 'error' });
        return;
    }

    voiceChannelUtils.selectVoiceChannel(channel.id);
}

// holy shit this entire plugin is fucking spaghetti. burn it.
function respectPreference(channel?: Channel): boolean {
    if(!channel) return false;

    if(AVCStalker.settings.avoidPreferEmpty) {
        const VSs = VoiceStateStore.getVoiceStatesForChannel(channel.id) as Record<string, UserVoiceState>;
        const amount = Object.keys(VSs).length;
        if(amount !== 0) return false;
    }

    return canJoinCall(channel);
}

function findAvailableAvoidCall(channels: string[], currentVC: number): Channel | null {
    let upIndex = currentVC + 1;
    let downIndex = channels.slice(currentVC).length;

    while(upIndex < channels.length || downIndex >= 0) {
        if(upIndex !== currentVC && upIndex < channels.length && respectPreference(ChannelStore.getChannel(channels[upIndex]))) return ChannelStore.getChannel(channels[upIndex]);
        if(downIndex !== currentVC && downIndex >= 0 && respectPreference(ChannelStore.getChannel(channels[downIndex]))) return ChannelStore.getChannel(channels[downIndex]);

        upIndex++;
        downIndex--;
    }

    return null;
}