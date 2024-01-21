import { React } from '@lib/components';
import { Icons, followingPeople } from '..';
import UserStore from '@lib/modules/UserStore';

const PanelButton = BdApi.Webpack.getByStrings('Masks.PANEL_BUTTON');

export default function ClearFollowing(): JSX.Element {
    function clearFollowingPeople() {
        BdApi.UI.showToast('Cleared following list', { type: 'success' });
        followingPeople.clear();
    }

    function removeFromFollowing(id: string, username: string): void {
        followingPeople.delete(id);
        BdApi.UI.showToast(`Removed ${ username } from following queue`);
    }

    return <PanelButton
        icon={(() => <svg viewBox='0 0 24 24' height={20} width={20} dangerouslySetInnerHTML={{ __html: Icons.GoPeople }}></svg>)}
        tooltipText={'Clear Following'}
        onClick={(() => clearFollowingPeople())}
        onContextMenu={(e: any) => {
            const menuItems: { type: 'text', label: string, action: (e: any) => void; }[] = [];

            if(followingPeople.size === 0)
                menuItems.push({
                    type: 'text',
                    label: 'You are not following anybody',
                    action: () => void 0
                });
            else followingPeople.forEach((userId) => {
                const user = UserStore.getUser(userId);
                menuItems.push({
                    type: 'text',
                    label: `${ user.globalName } (${ user.username })`,
                    action: () => {
                        removeFromFollowing(user.id, user.username);
                    }
                });
            });

            const menu = BdApi.ContextMenu.buildMenu([
                {
                    label: 'Click to remove from following'
                },
                {
                    type: 'group',
                    items: menuItems
                },
                {
                    type: 'separator'
                },
                {
                    type: 'text',
                    label: 'Clear Following',
                    action: () => clearFollowingPeople()
                }
            ]);

            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            BdApi.ContextMenu.open((e as any), menu, {
                align: 'top'
            });
        }}
    />;
}