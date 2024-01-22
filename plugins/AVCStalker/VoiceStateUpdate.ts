import { followingPeople, logger } from '.';
import UserStore from '@lib/stores/UserStore';
import ChannelStore, { type Channel } from '@lib/stores/ChannelStore';
import VoiceStateStore from '@lib/stores/VoiceStateStore';
import { ConnectionBit } from './util';
import type { UserVoiceState } from '@lib/stores/VoiceStateStore';

const voiceChannelUtils = BdApi.Webpack.getByKeys('selectVoiceChannel', 'disconnect') as {
    selectVoiceChannel: (channelId: string) => void;
    disconnect(): void;
};


// I don't care!
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
function joinCall(voiceState: UserVoiceState, channel: Channel): NodeJS.Timeout | void {
    if(!followingPeople.has(voiceState.userId)) return;
    if(VoiceStateStore.isInChannel(channel.id)) return;

    const VSs = VoiceStateStore.getVoiceStatesForChannel(voiceState.channelId) as Record<string, UserVoiceState>;
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
    voiceChannelUtils.selectVoiceChannel(voiceState.channelId);
}

export default function onVoiceChange(voiceState: { type: 'VOICE_STATE_UPDATES'; voiceStates: UserVoiceState[]; }): void {
    if(voiceState.type !== 'VOICE_STATE_UPDATES') return;

    for(let i = 0; i < voiceState.voiceStates.length; i++) {
        const vs = voiceState.voiceStates[i];

        if(followingPeople.has(vs.userId)) {
            const channel = ChannelStore.getChannel(vs.channelId);
            const msg = `Joining ${ UserStore.getUser(vs.userId).globalName } in #${ channel.name }`;

            logger.info(msg);
            BdApi.UI.showToast(msg);

            joinCall(vs, channel);
        }
    }
}