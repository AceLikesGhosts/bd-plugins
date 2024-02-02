import { followingPeople, logger, userVoiceStateLog } from '.';
import UserStore from '@lib/stores/UserStore';
import ChannelStore from '@lib/stores/ChannelStore';
import type { UserVoiceState } from '@lib/stores/VoiceStateStore';
import type { MultipleUserAssociatedVoiceStateThatsTimestamped } from './util';
import { shouldLogVoiceState, joinCall } from './util';
import VoiceStateStore from '@lib/stores/VoiceStateStore';

function followFromVoiceState(vs: UserVoiceState): void {
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

function appendToVoiceStateLog(vs: UserVoiceState): void {
    const output = {
        ...vs,
        timestamp: Date.now(),
        with: null as string[] | null
    } satisfies MultipleUserAssociatedVoiceStateThatsTimestamped;

    if(!vs.channelId) return void userVoiceStateLog.append(vs.userId, output);

    const withinChannel = VoiceStateStore.getVoiceStatesForChannel(vs.channelId);
    if(!withinChannel) return void userVoiceStateLog.append(vs.userId, output);

    const userIds = Object.keys(withinChannel);
    output.with = userIds.filter((id) => id !== vs.userId);

    userVoiceStateLog.append(vs.userId, output);
}

export default function onVoiceChange(voiceState: { type: 'VOICE_STATE_UPDATES'; voiceStates: UserVoiceState[]; }): void {
    if(voiceState.type !== 'VOICE_STATE_UPDATES') return;

    for(let i = 0; i < voiceState.voiceStates.length; i++) {
        const vs = voiceState.voiceStates[i];

        if(followingPeople.has(vs.userId)) followFromVoiceState(vs);
        if(shouldLogVoiceState(vs)) appendToVoiceStateLog(vs);
    }
}