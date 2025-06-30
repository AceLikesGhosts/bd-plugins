import UserStore, { User } from '@lib/stores/UserStore';
import VoiceStateStore from '@lib/stores/VoiceStateStore';
import UserUpdates from '@lib/stores/UserUpdates';
import { forceDeafenCache, forceDisconnectCache, forceMuteCache, forceUndeafenCache, forceUnmuteCache, logger } from '..';
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

            const isUs = id === us;
            if(props.channel.type !== ChannelType.VOICE) return;

            if(
                !PermissionStore.canWithPartialContext(Permissions.VIEW_CHANNEL, { channelId: props.channel.id }) ||
                !PermissionStore.canWithPartialContext(Permissions.MUTE_MEMBERS, { channelId: props.channel.id })
            ) {
                logger.debug('missing VIEW_CHANNEL or MUTE_MEMBERS permissions not displaying');
                return;
            }

            const [forceMuteActive, setForceMuteActive] = React.useState(forceMuteCache[id] || false);
            const forceMuteButton = <CheckboxItem
                label={'Force Server Mute'}
                id='user-context-force-server-mute'
                key='user-context-force-server-mute'
                color='danger'
                checked={forceMuteActive}
                action={(() => {
                    const newState = !forceMuteActive;
                    setForceMuteActive(newState);
                    forceMuteCache[id] = newState;
                    logger.log(`Force mute ${ newState ? 'enabled' : 'disabled' } for ${ id }`);

                    if(!VoiceStateStore.getVoiceStateForUser(id)?.mute) {
                        logger.log(`Force muting ${ id } (toggle pressed)`);
                        UserUpdates.setServerMute(props.channel.guild_id, id, true);
                    }
                })}
            />;

            const [forceUnmuteActive, setForceUnmuteActive] = React.useState(forceUnmuteCache[id] || false);
            const forceUnmuteButton = <CheckboxItem
                label={'Force Server Unmute'}
                id='user-context-force-server-unmute'
                key='user-context-force-server-unmute'
                color='danger'
                checked={forceUnmuteActive}
                action={(() => {
                    const newState = !forceUnmuteActive;
                    setForceUnmuteActive(newState);
                    forceUnmuteCache[id] = newState;
                    logger.log(`Force unmute ${ newState ? 'enabled' : 'disabled' } for ${ id }`);

                    if(VoiceStateStore.getVoiceStateForUser(id)?.mute) {
                        logger.log(`Force unmuting ${ id } (toggle pressed)`);
                        UserUpdates.setServerMute(props.channel.guild_id, id, false);
                    }
                })}
            />;

            const [forceDeafenActive, setForceDeafenActive] = React.useState(forceDeafenCache[id] || false);
            const forceDeafenButton = <CheckboxItem
                label={'Force Server Deaf'}
                id='user-context-force-server-deaf'
                key='user-context-force-server-deaf'
                color='danger'
                checked={forceDeafenActive}
                action={(() => {
                    const newState = !forceDeafenActive;
                    setForceDeafenActive(newState);
                    forceDeafenCache[id] = newState;
                    logger.log(`Force unmute ${ newState ? 'enabled' : 'disabled' } for ${ id }`);

                    if(!VoiceStateStore.getVoiceStateForUser(id)?.deaf) {
                        logger.log(`Force deafening ${ id } (toggle pressed)`);
                        UserUpdates.setServerDeaf(props.channel.guild_id, id, true);
                    }
                })}
            />;

            const [forceUndeafenActive, setForceUndeafenActive] = React.useState(forceUndeafenCache[id] || false);
            const forceUndeafenButton = <CheckboxItem
                label={'Force Undeafen'}
                id='user-context-force-undeafen'
                key='user-context-force-undeafen'
                color='danger'
                checked={forceUndeafenActive}
                action={(() => {
                    const newState = !forceUndeafenActive;
                    setForceUndeafenActive(newState);
                    forceUndeafenCache[id] = newState;
                    logger.log(`Force undeafen ${ newState ? 'enabled' : 'disabled' } for ${ id }`);

                    if(VoiceStateStore.getVoiceStateForUser(id)?.deaf) {
                        logger.log(`Force undeafening ${ id } (toggle pressed)`);
                        UserUpdates.setServerDeaf(props.channel.guild_id, id, false);
                    }
                })}
            />;

            const [forceDisconnectActive, setForceDisconnectActive] = React.useState(forceDisconnectCache[id] || false);
            const forceDisconnect = <CheckboxItem
                label={'Force Disconnect'}
                id='user-context-force-disconnect'
                key='user-context-force-disconnect'
                color='danger'
                checked={forceDisconnectActive}
                action={(() => {
                    const newState = !forceDisconnectActive;
                    setForceDisconnectActive(newState);
                    forceDisconnectCache[id] = newState;
                    logger.log(`Force disconnect ${ newState ? 'enabled' : 'disabled' } for ${ id }`);

                    if(VoiceStateStore.isInChannel(id)) {
                        UserUpdates.setChannel(props.channel.guild_id, id, null);
                    }
                })}
            />;

            if(!isUs) {
                const insertWasSuccessful = insertIntoTree(
                    res.props.children,
                    (node) => node?.key === 'voice-mute',
                    forceMuteButton
                );

                if(!insertWasSuccessful) {
                    logger.error('Failed to insert in tree, inserting at last element');
                    res.props.children.push(forceMuteButton);
                }

                const insertForceDefeanWasSuccessful = insertIntoTree(
                    res.props.children,
                    (node) => node?.key === 'voice-deafen',
                    forceDeafenButton
                );

                if(!insertForceDefeanWasSuccessful) {
                    logger.error('Failed to insert force deafen in tree, inserting at last element');
                    res.props.children.push(forceDeafenButton);
                }

                const insertForceDisconnectWasSuccessful = insertIntoTree(
                    res.props.children,
                    (node) => node?.key === 'voice-disconnect',
                    forceDisconnect
                );

                if(!insertForceDisconnectWasSuccessful) {
                    logger.error('Failed to insert force disconnect in tree, inserting at last element');
                    res.props.children.push(forceDisconnect);
                }
            }

            const insertForceUnmuteWasSuccessful = insertIntoTree(
                res.props.children,
                (node) => node?.key === 'user-context-force-server-mute',
                forceUnmuteButton
            );

            if(!insertForceUnmuteWasSuccessful) {
                logger.error('Failed to insert force deafen in tree, inserting at last element');
                res.props.children.push(forceUnmuteButton);
            }

            const insertForceUndefeanWasSuccessful = insertIntoTree(
                res.props.children,
                (node) => node?.key === 'user-context-force-server-deaf',
                forceUndeafenButton
            );

            if(!insertForceUndefeanWasSuccessful) {
                logger.error('Failed to insert force undeafen in tree, inserting at last element');
                res.props.children.push(forceUndeafenButton);
            }
        }
    );
}