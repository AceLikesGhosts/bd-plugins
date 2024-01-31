import { followingPeople, logger } from '.';
import UserStore from '@lib/stores/UserStore';
import ChannelStore from '@lib/stores/ChannelStore';
import type { UserVoiceState } from '@lib/stores/VoiceStateStore';
import { joinCall } from './util';

function followFromVoiceState(vs: UserVoiceState): void {
    if(!followingPeople.has(vs.userId)) return;

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

export default function onVoiceChange(voiceState: { type: 'VOICE_STATE_UPDATES'; voiceStates: UserVoiceState[]; }): void {
    if(voiceState.type !== 'VOICE_STATE_UPDATES') return;

    for(let i = 0; i < voiceState.voiceStates.length; i++) {
        const vs = voiceState.voiceStates[i];

        followFromVoiceState(vs);
    }
}