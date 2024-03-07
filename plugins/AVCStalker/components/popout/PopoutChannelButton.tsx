import { React } from '@lib/components';
import Transitions from '@lib/modules/Transitions';
import ChannelStore from '@lib/stores/ChannelStore';
import GuildStore from '@lib/stores/GuildStore';

interface VoiceChatButtonProps {
    channelId: string | null;
    guildId: string;
}

const FLEX_CENTER = {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
};

export default function PopoutChnanelButton({ channelId, guildId }: VoiceChatButtonProps): JSX.Element | null {
    if(!channelId) return null;

    return <button style={{ ...FLEX_CENTER, width: '100%', height: '28px', background: 'transparent', marginTop: '4px', border: '2px solid white', borderRadius: '25px' }} onClick={(() => Transitions.transitionToGuild(guildId, channelId))}>
        <div style={{ ...FLEX_CENTER, width: '200px', height: '100%' }}>
            <img style={{ height: '24px', width: '24px', marginRight: '5px', borderRadius: '10px' }} src={GuildStore.getGuild(guildId)?.getIconURL()} alt={'Bad Image'} />
            <span style={{ color: 'white' }}>{ChannelStore.getChannel(channelId)!.name}</span>
        </div>
    </button>;
}