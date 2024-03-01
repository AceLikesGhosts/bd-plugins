import AVCStalker from '..';
import RelationshipStore from '@lib/stores/RelationshipStore';
import type { UserVoiceState } from '@lib/stores/VoiceStateStore';
import VoiceStateStore from '@lib/stores/VoiceStateStore';

export function shouldLog(voiceState: UserVoiceState): [string | undefined, boolean] {
    // If we have them in our whitelisted users to log out, just ignore the rest and say OK!
    if(AVCStalker.settings.vcLogging.whitelisted.includes(voiceState.userId)) return [voiceState.userId, true];
    // We have them added, the rest of their state doesn't matter.
    if(RelationshipStore.isFriend(voiceState.userId)) return [voiceState.userId, true];
    // Disconnected from call.
    if(!voiceState.channelId) return [voiceState.userId, true];

    // simple checks are gone, now we need to check if any of our friends
    // are in that VC
    const inVC = VoiceStateStore.getVoiceStatesForChannel(voiceState.channelId);
    for(const userId in inVC) {
        // find if user is whitelisted or a friend (failed first check of user emitting the
        // voice state update, so attempt to find someone else within the call.)
        const state = inVC[userId];
        if(AVCStalker.settings.vcLogging.whitelisted.includes(state.userId)) return [state.userId, true];
        if(RelationshipStore.isFriend(state.userId)) return [state.userId, true];
    }

    return [undefined, false];
}