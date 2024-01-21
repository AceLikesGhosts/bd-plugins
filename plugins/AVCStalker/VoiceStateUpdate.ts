import type { UserVoiceState } from '@lib/modules/VoiceStateStore';
import { followingPeople, logger } from '.';
import UserStore from '@lib/modules/UserStore';

const voiceChannelUtils = BdApi.Webpack.getByKeys('selectVoiceChannel', 'disconnect') as {
    selectVoiceChannel: (channelId: string) => void;
    disconnect(): void;
};

const ChannelStore = BdApi.Webpack.getStore('ChannelStore') as {
    getChannel(id: string): {
        name: string;
        guild_id: string;
    };
};

// function joinCall(channelId: string): void {
//     voiceChannelUtils.selectVoiceChannel(channelId);
// }

export default function onVoiceChange(voiceState: { type: 'VOICE_STATE_UPDATES'; voiceStates: UserVoiceState[]; }): void {
    if(voiceState.type !== 'VOICE_STATE_UPDATES') return;

    for(let i = 0; i < voiceState.voiceStates.length; i++) {
        const vs = voiceState.voiceStates[i];

        if(followingPeople.has(vs.userId)) {
            const channel = ChannelStore.getChannel(vs.channelId);
            const msg = `Joining ${ UserStore.getUser(vs.userId).globalName } in #${ channel.name }`;

            logger.info(msg);
            BdApi.UI.showToast(msg);

            voiceChannelUtils.selectVoiceChannel(vs.channelId);
        }
    }
}