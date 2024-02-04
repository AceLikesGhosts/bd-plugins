import type { MultipleUserAssociatedVoiceStateThatsTimestamped } from '../util';
import type { UserVoiceState } from '@lib/stores/VoiceStateStore';
import VoiceStateStore from '@lib/stores/VoiceStateStore';
import UserProfileStore from '@lib/stores/UserProfileStore';
import RelationshipStore from '@lib/stores/RelationshipStore';

/**
 * Simple extension of a map allowing for quick appending to a key
 */
class AppendableMap<T, V extends any[]> extends Map<T, V> {
    public append(key: T, value: V): AppendableMap<T, V> {
        this.set(key, [...this.get(key)! as any, ...value as any] as V);
        return this;
    }
}

/**
 * Map of userIDs to Timestamped Voice States 
 * (during plugin's active duration, if state is not from current instance; 
 * if state was from out of current session it can be located within the log file)
 */
export const userVoiceStateLog = new AppendableMap<string, MultipleUserAssociatedVoiceStateThatsTimestamped[]>();

function isFriendOrMutual(userId: string): boolean {
    if(RelationshipStore.isFriend(userId)) return true;

    const mutualFriends = UserProfileStore.getMutualFriends(userId);
    if(mutualFriends !== null && mutualFriends.length > 0) return true;

    return false;
}

export function appendToVoiceStateLog(vs: UserVoiceState): void {
    const output = {
        ...vs,
        timestamp: Date.now(),
        with: null as string[] | null
    } satisfies MultipleUserAssociatedVoiceStateThatsTimestamped;

    if(!vs.channelId) return void userVoiceStateLog.append(vs.userId, [output]);

    const withinChannel = VoiceStateStore.getVoiceStatesForChannel(vs.channelId);
    if(!withinChannel) return void userVoiceStateLog.append(vs.userId, [output]);

    const userIds = Object.keys(withinChannel);
    output.with = userIds.filter((id) => id !== vs.userId);

    userVoiceStateLog.append(vs.userId, [output]);
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