import { React } from '@lib/components';
import type { Cancel } from 'betterdiscord';
import AUserVoiceLocation, { followingPeople, logger } from '..';
import VoiceStateStore from '@lib/stores/VoiceStateStore';
import { joinCall } from '../VoiceStateUpdate';
import ChannelStore from '@lib/stores/ChannelStore';
const { Item } = BdApi.ContextMenu;

export default function PatchUserContext(): Cancel {
    logger.info('Patched UserContext');

    function findVCAndJoin(id: string): void {
        const vs = VoiceStateStore.getVoiceStateForUser(id);
        if(!vs || !vs.channelId) return;
        const channel = ChannelStore.getChannel(vs.channelId);

        logger.info(`${ id } was already in a vc when we said to start following so joining their call (${ vs.channelId })`);
        joinCall(vs, channel);
    }

    return BdApi.ContextMenu.patch('user-context', (res, props) => {
        if(!AUserVoiceLocation.settings.voiceChatFollowing.enabled) return;

        const id = props.user.id as string;
        const isFollowing = followingPeople.has(id);

        res.props.children.push(<Item
            label={isFollowing ? 'Unfollow' : 'Follow'}
            id='follow-call'
            action={(() => {
                if(isFollowing) followingPeople.delete(id);
                else {
                    logger.info(`now following ${ id }`);
                    followingPeople.add(id);

                    findVCAndJoin(id);
                };
            })}
        />);
    });
}