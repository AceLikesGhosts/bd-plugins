import UserStore, { User } from '@lib/stores/UserStore';
import VoiceStateStore from '@lib/stores/VoiceStateStore';
import UserUpdates from '@lib/stores/UserUpdates';
import { forceMuteCache, logger } from '..';
import { React } from '@lib/components';
import { Channel, ChannelType } from '@lib/stores/ChannelStore';
import PermissionStore, { Permissions } from '@lib/stores/PermissionStore';
const { CheckboxItem } = BdApi.ContextMenu;

// setServerMute

/**
 * 
 * channel on user-context is reflective of the channel
 * they are currently in, or the current selected channel
 * if they are not within a voice channel
 * 
 */


function insertIntoTree(children: React.ReactElement[], search: (node?: any) => boolean, insert: React.ReactElement) {
    for(let i: number = 0; i < children.length; i++) {
        const child = children[i];

        if(search(child)) {
            children.splice(i + 1, 0, insert);
            return true;
        }

        if(child === null || typeof child !== 'object') {
            continue;
        }

        if('props' in child) {
            if(insertIntoTree([child.props], search, insert)) {
                return true;
            }
        }

        if('children' in child && child.children) {
            if(insertIntoTree((child as { children: React.ReactElement[]; }).children, search, insert)) {
                return true;
            }
        }
    }

    return false;
}

export default function PatchUserContext() {
    return BdApi.ContextMenu.patch(
        'user-context',
        (
            res: { props: { children: React.ReactElement[]; }; },
            props: { user: User; channel: Channel; }
        ) => {
            const us = UserStore.getCurrentUser().id;
            const id = props.user.id;

            if(us === id) return;
            if(props.channel.type !== ChannelType.VOICE) return;

            if(
                !PermissionStore.canWithPartialContext(Permissions.VIEW_CHANNEL, { channelId: props.channel.id }) ||
                !PermissionStore.canWithPartialContext(Permissions.MUTE_MEMBERS, { channelId: props.channel.id })
            ) {
                logger.debug('missing VIEW_CHANNEL or MUTE_MEMBERS permissions not displaying');
                return;
            }

            const [active, setActive] = React.useState(forceMuteCache[id] || false);
            const forceMuteButton = <CheckboxItem
                label={'Force Server Mute'}
                id='user-context-force-server-mute'
                color='danger'
                checked={active}
                action={(() => {
                    const newState = !active;
                    setActive(newState);
                    forceMuteCache[id] = newState;
                    logger.log(`Force mute ${ newState ? 'enabled' : 'disabled' } for ${ id }`);

                    if(!VoiceStateStore.getVoiceStateForUser(id)?.mute) {
                        logger.log(`Force muting ${ id } (toggle pressed)`);
                        UserUpdates.setServerMute(props.channel.guild_id, id, true);
                    }
                })}
            />;

            const insertWasSuccessful = insertIntoTree(
                res.props.children,
                (node) => node?.key === 'voice-mute',
                forceMuteButton
            );

            if(!insertWasSuccessful) {
                logger.error('Failed to insert in tree, inserting at last element');
                res.props.children.push(forceMuteButton);
                return;
            }
        }
    );
}