import { React } from '@lib/components';
import type { Cancel } from 'betterdiscord';
import DadscordAutoBans, { AllAllowedCommands, logger, NotificationEvents } from '..';
import { User } from '@lib/stores/UserStore';
import { openManagementModal } from '../modal';
const { Item } = BdApi.ContextMenu;


export default function PatchUserContext(): Cancel {
    logger.log('Patched UserContext');

    return BdApi.ContextMenu.patch('user-context', (res: React.ReactElement, props: { user: User; }) => {
        const isAutobanned = DadscordAutoBans.settings.autoBanUserIds.has(props.user.id);
        const isSharedOwnership = DadscordAutoBans.settings.persistantSharedCallOwnership.has(props.user.id);

        res.props.children.push(
            <Item label='Custom VC Utils' id={`dadscord-vc-${ props.user.id }`}>
                <Item
                    label={isAutobanned ? 'Stop Autobanning' : 'Autoban'}
                    id={`dadscord-vc-autoban-${ props.user.id }`}
                    action={(() => {
                        logger.log(`${ isAutobanned ? 'Un autobanning' : 'Autobanning' }`, props.user.id);

                        if(isAutobanned) {
                            if(DadscordAutoBans.settings.showNotificationsFor.includes(NotificationEvents.CONTEXT_MENU_REMOVED_FROM_AUTOBANS)) {
                                BdApi.UI.showToast('Removed ' + props.user.username + ' from autobans.');
                            }

                            DadscordAutoBans.settings.autoBanUserIds.delete(props.user.id);
                        } else {
                            if(DadscordAutoBans.settings.showNotificationsFor.includes(NotificationEvents.CONTEXT_MENU_ADDED_TO_AUTOBANS)) {
                                BdApi.UI.showToast('Added ' + props.user.username + ' to autobans.');
                            }

                            DadscordAutoBans.settings.autoBanUserIds.set(props.user.id, {
                                timestamp: new Date(),
                                reason: null,
                            });
                        }
                    })}
                >
                </Item>
                <Item
                    label={isSharedOwnership ? "Remove shared ownership" : "Add shared ownership"}
                    id={`dadscord-vc-sharedownership-${ props.user.id }`}
                    action={(() => {
                        logger.log(`${ isSharedOwnership ? 'Removing' : 'Giving' } shared call ownership to`, props.user.id);

                        if(isAutobanned) {
                            if(DadscordAutoBans.settings.showNotificationsFor.includes(NotificationEvents.CONTEXT_MENU_REMOVE_FULL_SHARED_OWNERSHIP)) {
                                BdApi.UI.showToast('REmoved ' + props.user.username + '\'s shared call ownership.');
                            }

                            DadscordAutoBans.settings.persistantSharedCallOwnership.delete(props.user.id);
                        } else {
                            if(DadscordAutoBans.settings.showNotificationsFor.includes(NotificationEvents.CONTEXT_MENU_GIVE_FULL_SHARED_OWNERSHIP)) {
                                BdApi.UI.showToast('Gave ' + props.user.username + ' full shared call ownership.');
                            }

                            DadscordAutoBans.settings.persistantSharedCallOwnership.set(props.user.id, AllAllowedCommands);
                        }
                    })}
                >
                </Item>
                <Item
                    label='Open Detailed Management Modal'
                    id={`dadscord-vc-management-${ props.user.id }`}
                    action={(() => {
                        openManagementModal()
                    })}
                ></Item>
            </Item>
        );
    });
}