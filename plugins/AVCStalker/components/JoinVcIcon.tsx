import { React } from '@lib/components/index';
import { Icons } from '..';
import type { UserVoiceState } from '@lib/modules/VoiceStateStore';
import VoiceStateStore from '@lib/modules/VoiceStateStore';

const DiscordTooltip = BdApi.Components.Tooltip;

type Props = {
    userId: string;
};

// type Channel = { guild_id: string; };

const useStateFromStores = BdApi.Webpack.getByKeys('useStateFromStores')?.useStateFromStores as <T>(stores: unknown[], cb: () => T) => T;
const transitionTo = BdApi.Webpack.getByKeys('transitionTo').transitionTo as (channelId: string) => void;
// const ChannelStore = BdApi.Webpack.getStore('ChannelStore') as { getChannel(id: string): Channel; };


export default function JoinVcIcon({ userId }: Props): JSX.Element {
    const voiceData = useStateFromStores([VoiceStateStore], () => [VoiceStateStore.getVoiceStateForUser(userId)] ?? [undefined]) as [UserVoiceState];

    // const [channel, setChannel] = React.useState<Channel>(ChannelStore.getChannel(voiceData[0]?.channelId ?? '0') as Channel);
    const [peopleInVC, setGuildChannelLength] = React.useState<number>(1);

    React.useEffect(() => {
        setGuildChannelLength(Object.keys(VoiceStateStore.getVoiceStatesForChannel(voiceData[0]?.channelId) ?? { hi: 'u-shouldnt-see-this' }).length);
        // setChannel(ChannelStore.getChannel(voiceData[0]?.channelId ?? '0') as Channel);
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
                                if(voiceData[0]?.channelId) transitionTo(voiceData[0]!.channelId);
                                else BdApi.UI.showToast('Failed to locate the voice channel they are in', { type: 'error' });
                            })}
                        />
                    </div>}
            </DiscordTooltip> : <div id='hi-you-shouldnt-ever-see-this-div-lol'></div>}
        </>
    );
}