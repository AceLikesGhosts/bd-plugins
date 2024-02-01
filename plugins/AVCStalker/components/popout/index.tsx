import { React } from '@lib/components';
import StoreUtils from '@lib/stores/StoreUtils';
import VoiceStateStore from '@lib/stores/VoiceStateStore';
import PopoutChnanelButton from './PopoutChannelButton';

interface PopoutProps {
    userId: string;
}

export default function Popout({ userId }: PopoutProps): JSX.Element {
    const voiceStates = StoreUtils.useStateFromStores([VoiceStateStore], () => {
        const guilds = VoiceStateStore.getAllVoiceStates();
        const guildIds = Object.keys(guilds);
        const voiceStates: ({ channelId: string | null; guildId: string; } | undefined)[] = [];

        for(let i: number = 0; i < guildIds.length; i++) {
            const state = guilds[guildIds[i]][userId];
            if(!state) continue;

            voiceStates.push({
                channelId: state.channelId,
                guildId: guildIds[i]!
            });
        }

        return voiceStates;
    });

    return (
        <div>
            {voiceStates.map((state: any) => {
                return <PopoutChnanelButton channelId={state.channelId} guildId={state.guildId} />;
            })}
        </div>
    );
}