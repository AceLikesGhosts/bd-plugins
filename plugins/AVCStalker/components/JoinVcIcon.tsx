import { React } from '@lib/components/index';
import { Icons } from '..';
import type { UserVoiceState } from '@lib/stores/VoiceStateStore';
import VoiceStateStore from '@lib/stores/VoiceStateStore';
import ChannelStore from '@lib/stores/ChannelStore';
import Transitions from '@lib/modules/Transitions';
import StoreUtils from '@lib/stores/StoreUtils';

const DiscordTooltip = BdApi.Components.Tooltip;

type Props = {
    userId: string;
};

type Channel = { guild_id: string; };

export default function JoinVcIcon({ userId }: Props): JSX.Element {
    const voiceData = StoreUtils.useStateFromStores([VoiceStateStore], () => [VoiceStateStore.getVoiceStateForUser(userId)] ?? [undefined]) as [UserVoiceState];

    const [channel, setChannel] = React.useState<Channel>(ChannelStore.getChannel(voiceData[0]?.channelId ?? '0') as Channel);
    const [peopleInVC, setGuildChannelLength] = React.useState<number>(1);

    React.useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        setGuildChannelLength(Object.keys(VoiceStateStore.getVoiceStatesForChannel(voiceData[0]?.channelId!) ?? { hi: 'u-shouldnt-see-this' }).length);
        setChannel(ChannelStore.getChannel(voiceData[0]?.channelId ?? '0') as Channel);
    }, [voiceData]);

    return (
        <>
            {voiceData[0]?.channelId ? <DiscordTooltip text='Voice Channel'>
                {(props: any) =>
                    <div {...props}>
                        <svg
                            width={24}
                            height={24}
                            role='img'
                            // this is only able to be set to a set string from `icons` so this is fine
                            dangerouslySetInnerHTML={{
                                __html:
                                    peopleInVC === 1 ?
                                        Icons.GaUser :
                                        Icons.GaUserAdd
                            }}
                            onClick={(() => {
                                if(voiceData[0]?.channelId) {
                                    Transitions.transitionToGuild(channel.guild_id, voiceData[0]!.channelId);
                                }
                                else BdApi.UI.showToast('Failed to locate the voice channel they are in', { type: 'error' });
                            })}
                        />
                    </div>}
            </DiscordTooltip> : <div id='hi-you-shouldnt-ever-see-this-div-lol'></div>}
        </>
    );
}