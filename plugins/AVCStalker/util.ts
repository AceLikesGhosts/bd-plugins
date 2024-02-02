import VoiceStateStore from '@lib/stores/VoiceStateStore';
import UserStore from '@lib/stores/UserStore';
import RelationshipStore from '@lib/stores/RelationshipStore';
import UserProfileStore from '@lib/stores/UserProfileStore';
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

/**
 * Simple extension of a map allowing for quick appending to a key
 */
export class AppendableMap<T, V> extends Map<T, V> {
    public append(key: T, value: V): AppendableMap<T, V> {
        this.set(key, {
            ...this.get(key),
            ...value
        });

        return this;
    }
}

export function shouldLogVoiceState(voiceState: UserVoiceState): boolean {
    if(!voiceState.channelId) return false;
    if(isFriendOrMutual(voiceState.userId)) return true;

    // ew.
    const channelState = VoiceStateStore.getVoiceStatesForChannel(voiceState.channelId);
    if(!channelState) return false;

    const usersIdsWithinVC = Object.keys(channelState);

    for(let i: number = 0; i < usersIdsWithinVC.length; i++) {
        const userId = usersIdsWithinVC[i];
        if(isFriendOrMutual(userId)) return true;
    }

    return false;
}

function isFriendOrMutual(userId: string): boolean {
    if(RelationshipStore.isFriend(userId)) return true;

    const mutualFriends = UserProfileStore.getMutualFriends(userId);
    if(mutualFriends !== null && mutualFriends.length > 0) return true;

    return false;
}


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