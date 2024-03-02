import AVCStalker from '..';
import RelationshipStore from '@lib/stores/RelationshipStore';
import UserStore from '@lib/stores/UserStore';
import type { UserVoiceState } from '@lib/stores/VoiceStateStore';
import VoiceStateStore from '@lib/stores/VoiceStateStore';

const ourId = UserStore.getCurrentUser().id;

export function isFriendOrWhitelisted(voiceState: UserVoiceState): boolean {
    if(voiceState.userId === ourId) return false;
    if(AVCStalker.settings.vcLogging.whitelisted.includes(voiceState.userId)) return true;
    if(AVCStalker.settings.vcLogging.logFriends) return RelationshipStore.isFriend(voiceState.userId);
    return false;
}

export function getCorrelatedPeople(voiceState: UserVoiceState): string[] | undefined {
    // VOICE_STATE_UPDATE -> 
    //     isFriend() || isWhitelisted() -> append to log file;
    // then if logCorrelated:
    //     loop over each person in VC:
    //          if one of our friends is in that vc, return the friend's id
    //          so that we can correlate the VoiceState to our Friend's ID


    // not in a VC, cant check correlated people, gtfo!
    if(voiceState.channelId === null) return undefined;

    const inVC = VoiceStateStore.getVoiceStatesForChannel(voiceState.channelId);
    const outputIds: string[] = [];

    for(const userId in inVC) {
        const state = inVC[userId];
        
        if(isFriendOrWhitelisted(state)) outputIds.push(state.userId);
    }

    return outputIds;
}