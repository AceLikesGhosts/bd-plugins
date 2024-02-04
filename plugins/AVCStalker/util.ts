import VoiceStateStore from '@lib/stores/VoiceStateStore';
import UserStore from '@lib/stores/UserStore';
import { followingPeople, logger } from '.';
import { type Channel } from '@lib/stores/ChannelStore';
import type { UserVoiceState } from '@lib/stores/VoiceStateStore';

export const ConnectionBit = 0x100000n;

export type TimestampedVoiceState = UserVoiceState & { timestamp: number; };
export type MultipleUserAssociatedVoiceStateThatsTimestamped = {
    /** Map of userIDs who are also within the call, making this a relationship */
    with: string[] | null;
} & TimestampedVoiceState;

const voiceChannelUtils = BdApi.Webpack.getByKeys('selectVoiceChannel', 'disconnect') as {
    selectVoiceChannel: (channelId: string) => void;
    disconnect(): void;
};

// I don't care!
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export function joinCall(voiceState: UserVoiceState, channel: Channel): NodeJS.Timeout | void {
    if(!followingPeople.has(voiceState.userId)) return;
    if(VoiceStateStore.isInChannel(channel.id)) return;

    const VSs = VoiceStateStore.getVoiceStatesForChannel(voiceState.channelId!) as Record<string, UserVoiceState>;
    if(!VSs) return;

    if(
        channel.permissionOverwrites_
        && channel.permissionOverwrites_[UserStore.getCurrentUser().id]
        && channel.permissionOverwrites_[UserStore.getCurrentUser().id]?.deny & ConnectionBit
    ) {
        logger.info(`attempted to join vc but we are denied from joining, setting 250ms timeout before attempting to rejoin`);
        return setTimeout(() => joinCall(voiceState, channel), 250);
    }

    const people = Object.keys(VSs).length;

    if(channel.userLimit_ !== 0 && people >= channel.userLimit_) {
        logger.info(`attempted to join ${ channel.name } but it was full (${ people } >= ${ channel.userLimit_ }). setting 250ms timeout before attempting to rejoin`);
        return setTimeout(() => joinCall(voiceState, channel), 250);
    }

    logger.info('joining voice channel');
    voiceChannelUtils.selectVoiceChannel(voiceState.channelId!);
}