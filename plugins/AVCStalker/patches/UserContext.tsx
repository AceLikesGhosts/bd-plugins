import { React } from '@lib/components';
import type { Cancel } from 'betterdiscord';
import type { User } from '@lib/stores/UserStore';
import AVCStalker, { logger } from '..';
import VoiceStateStore from '@lib/stores/VoiceStateStore';
import ChannelStore from '@lib/stores/ChannelStore';
import { joinCall } from '../util';
import { followingPeople } from '../voiceState/Following';
import openModalFor from '../components/modal';
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

    return BdApi.ContextMenu.patch('user-context', (res: { props: { children: React.ReactElement[]; }; }, props: { user: User; }) => {
        const id = props.user.id;
        const isFollowing = followingPeople.has(id);

        const followButton = <Item
            label={isFollowing ? 'Unfollow' : 'Follow'}
            id='follow-call'
            action={(() => {
                if(isFollowing) followingPeople.delete(id);
                else {
                    logger.info(`now following ${ id }`);
                    followingPeople.add(id);

                    findVCAndJoin(id);
                }
            })}
        />;

        // TODO: stop wasting resources by creating this even if we don't render it!
        const logButton = <Item
            label={'Open Voice Logs'}
            id='voice-logs'
            action={(() => {
                logger.info(`opened voice state logs for: `, id);
                openModalFor(id);
            })}
        />;

        const isWhitelisted = AVCStalker.settings.vcLogging.whitelisted.includes(id);
        // TODO: stop wasting resources by creating this even if we don't render it!
        const whitelistButton = <Item
            label={isWhitelisted ? 'Remove From Whitelist' : 'Add To Whitelist'}
            id='whitelist-button'
            action={(() => {
                logger.info(`${ isWhitelisted ? 'removed' : 'added'} ${ id } to whitelisted (vclogs)`);
                if(isWhitelisted) AVCStalker.settings.vcLogging.whitelisted.splice(AVCStalker.settings.vcLogging.whitelisted.indexOf(id), 1);
                else AVCStalker.settings.vcLogging.whitelisted.push(id);
            })}
        />;

        if(AVCStalker.settings.contextMenu.individual) {
            res.props.children.push(followButton);
            if(AVCStalker.settings.contextMenu.showLogButton) res.props.children.push(logButton);
            if(AVCStalker.settings.contextMenu.showWhitelistButton) res.props.children.push(whitelistButton);
        }
        else res.props.children.push(
            <Item
                label={AVCStalker.settings.contextMenu.name}
                id='vcstalker-group'
            >
                {followButton}
                {AVCStalker.settings.contextMenu.showLogButton ? logButton : void 0}
                {AVCStalker.settings.contextMenu.showWhitelistButton ? whitelistButton : void 0}
            </Item>
        );
    });
}