import { React } from '@lib/components';
import AVCStalker, { Icons } from '..';
import UserStore from '@lib/stores/UserStore';
import { avoidingPeople, followingPeople } from '../voiceState/Following';
import type { ContextMenuSetup } from 'betterdiscord';

// they keep adding and removing thins from this module.
const PanelButton = BdApi.Webpack.getBySource('PANEL_BUTTON').A as React.FC<{
    icon: () => JSX.Element;
    tooltipText?: string;
    onClick: (e: unknown) => unknown;
    onContextMenu: (e: unknown) => unknown;
}>;

export default function ClearFollowing(): JSX.Element {
    function clearFollowingPeople() {
        console.log("clearFollowingPeople triggered");
        if(!AVCStalker.settings.voiceChatFollowing.clickVoiceChatButtonClears) {
            console.log("clickVoiceChatButtonClears is disabled");
            return;
        }

        BdApi.UI.showToast('Cleared following list', { type: 'success' });
        followingPeople.clear();
    }

    function clearAvoidingPeople() {
        console.log("clearAvoidingPeople triggered");
        BdApi.UI.showToast('Cleared avoiding list', { type: 'success' });
        avoidingPeople.clear();
    }

    function removeFromFollowing(id: string, username: string): void {
        console.log(`removeFromFollowing triggered for id: ${ id }, username: ${ username }`);
        followingPeople.delete(id);
        BdApi.UI.showToast(`Removed ${ username } from following queue`);
    }

    function removeFromAvoid(id: string, username: string): void {
        console.log(`removeFromAvoid triggered for id: ${ id }, username: ${ username }`);
        avoidingPeople.delete(id);
        BdApi.UI.showToast(`Removed ${ username } from avoiding`);
    }

    return <PanelButton
        icon={(() => {
            return <svg viewBox='0 0 24 24' height={20} width={20} dangerouslySetInnerHTML={{ __html: Icons.GoPeople }}></svg>;
        })}
        tooltipText={'Clear Following'}
        onClick={(() => {
            clearFollowingPeople();
        })}
        onContextMenu={(e: any) => {

            const followingPeopleMenu: { type: 'text', label: string, action: (e: any) => void; }[] = [];
            const avoidingPeopleMenu: { type: 'text', label: string, action: (e: any) => void; }[] = [];

            if(followingPeople.size > 0) {
                followingPeople.forEach((userId) => {
                    console.log(`Processing userId from following: ${ userId }`);
                    const user = UserStore.getUser(userId);
                    if(user) {
                        console.log(`Found user: ${ user.globalName } (${ user.username })`);
                        followingPeopleMenu.push({
                            type: 'text',
                            label: `${ user.globalName } (${ user.username })`,
                            action: () => {
                                console.log(`Removing from following: ${ user.username }`);
                                removeFromFollowing(user.id, user.username);
                            }
                        });
                    } else {
                        console.log(`User not found for userId: ${ userId }`);
                    }
                });
            } else {
                console.log("No users in followingPeople");
            }

            console.log("avoidingPeople.size:", avoidingPeople.size);
            if(avoidingPeople.size > 0) {
                avoidingPeople.forEach((userId) => {
                    const user = UserStore.getUser(userId);
                    if(user) {
                        console.log(`Found user: ${ user.globalName } (${ user.username })`);
                        avoidingPeopleMenu.push({
                            type: 'text',
                            label: `${ user.globalName } (${ user.username })`,
                            action() {
                                console.log(`Removing from avoiding: ${ user.username }`);
                                removeFromAvoid(user.id, user.username);
                            },
                        });
                    }
                });
            }

            const buildableMenu: ContextMenuSetup = [];

            if(followingPeopleMenu.length > 0) {
                console.log("Building menu for following people");
                buildableMenu.push(
                    {
                        label: 'Click to remove from following'
                    },
                    {
                        type: 'group',
                        items: followingPeopleMenu
                    }
                );
            }

            if(avoidingPeopleMenu.length > 0) {
                console.log("Building menu for avoiding people");
                buildableMenu.push(
                    {
                        label: 'Click to remove from avoiding'
                    },
                    {
                        type: 'group',
                        items: avoidingPeopleMenu
                    }
                );
            }

            const menu = BdApi.ContextMenu.buildMenu([
                ...buildableMenu,
                {
                    type: 'separator'
                },
                {
                    type: 'text',
                    label: 'Clear Following',
                    action: () => {
                        console.log("Clearing following list from context menu");
                        clearFollowingPeople();
                    }
                },
                {
                    type: 'text',
                    label: 'Clear Avoiding',
                    action: () => {
                        console.log("Clearing avoiding list from context menu");
                        clearAvoidingPeople();
                    }
                }
            ]);

            BdApi.ContextMenu.open((e as any), menu, {
                align: 'top'
            });
        }}
    />;

}
