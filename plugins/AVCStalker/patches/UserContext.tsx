import { React } from '@lib/components';
import type { Cancel } from 'betterdiscord';
import AUserVoiceLocation, { followingPeople, logger } from '..';
import VoiceStateStore from '@lib/modules/VoiceStateStore';
const { Item } = BdApi.ContextMenu;

const voiceChannelUtils = BdApi.Webpack.getByKeys('selectVoiceChannel', 'disconnect') as {
    selectVoiceChannel: (channelId: string) => void;
};

export default function PatchUserContext(): Cancel {
    logger.info('Patched UserContext');

    function findVCAndJoin(id: string): void {
        const vs = VoiceStateStore.getVoiceStateForUser(id);
        if(!vs) return;
        logger.info(`${ id } was already in a vc when we said to start following so joining their call (${ vs.channelId })`);
        voiceChannelUtils.selectVoiceChannel(vs.channelId);
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