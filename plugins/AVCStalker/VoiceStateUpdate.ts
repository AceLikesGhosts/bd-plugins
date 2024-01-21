import type { UserVoiceState } from '@lib/modules/VoiceStateStore';
import { followingPeople, logger } from '.';
import UserStore from '@lib/modules/UserStore';
import VoiceStateStore from '@lib/modules/VoiceStateStore';

const voiceChannelUtils = BdApi.Webpack.getByKeys('selectVoiceChannel', 'disconnect') as {
    selectVoiceChannel: (channelId: string) => void;
    disconnect(): void;
};

type Channel = {
    name: string;
    guild_id: string;
    userLimit_: number;
};
const ChannelStore = BdApi.Webpack.getStore('ChannelStore') as {
    getChannel(id: string): Channel;
};

// I don't care!
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
function joinCall(voiceState: UserVoiceState, channel: Channel): NodeJS.Timeout | void {
    if(!followingPeople.has(voiceState.userId)) return;

    const VSs = VoiceStateStore.getVoiceStatesForChannel(voiceState.channelId) as Record<string, UserVoiceState>;
    if(!VSs) return;
    
    const people = Object.keys(VSs).length;

    if(people >= channel.userLimit_) {
        logger.info(`UserLimit (${channel.userLimit_}) >= people (${people}) retrying in 250ms`);
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