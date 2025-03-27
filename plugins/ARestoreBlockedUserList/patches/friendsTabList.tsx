import { React } from '@lib/components/index';
import Dispatcher from '@lib/modules/Dispatcher';
import meta from '../config.json';

type FriendsListTabListReturnType = {
    props: {
        'aria-label': 'Friends';
        children: FriendsListTabChild[];
    };
};

// this is a different component, FUCK YOU!
type FriendsListTabChild = {
    type: FriendsListButtonThing;
    props: {
        id: string;
        itemType: string;
        look: string;
        onItemSelect: (e: unknown) => unknown;
        children: unknown;
    };
};

type FriendsListButtonThing = React.ComponentClass<
    {
        id: string;
        itemType: string;
        look: string;
        onItemSelect: (e: string) => unknown;
        children: unknown;
    }
>;

export const patchFriendsTabList = () => {
    // const friendsTabList = BdApi.Webpack.getByPrototypeKeys('renderChildren', 'render', { searchExports: true });
    // const [module, key] = BdApi.Webpack.getWithKey(
    //     BdApi.Webpack.Filters.byPrototypeKeys('renderChildren', 'render')
    // )

    // this is a bad selector
    const friendsTablistItem = BdApi.Webpack.getModule(
        m => Object.keys(m).includes('Item')
            && !m.SearchBar, { searchExports: true }
    );

    const TablistItem = (friendsTablistItem as any).Item as FriendsListButtonThing;

    BdApi.Patcher.after(
        meta.name,
        (friendsTablistItem as any).prototype,
        'render',
        (_, __, ret: FriendsListTabListReturnType) => {
            if(!ret || !ret.props) return;
            if(ret.props['aria-label'] !== 'Friends') return;
            if(!Array.isArray(ret.props.children)) return;

            const pendingPos = ret.props.children.findIndex((value) => value.props && value.props.id === 'PENDING');

            ret.props.children.splice(
                pendingPos + 1,
                0,
                <TablistItem
                    {...ret.props.children[0].props}
                    aria-label="Blocked"
                    key={'.$BLOCKED'}
                    id='BLOCKED'
                    onItemSelect={((e) => {
                        Dispatcher.dispatch({
                            type: 'FRIENDS_SET_SECTION',
                            section: e
                        });
                    })}
                >
                    Blocked
                </TablistItem>
            );
        }
    );
};