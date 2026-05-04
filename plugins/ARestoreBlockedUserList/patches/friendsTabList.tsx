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

export const patchFriendsTabList = async () => {
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
    // ot2tSp
    const discordI18nMod = await BdApi.Webpack.waitForModule<{
        intl: {
            string: (key: string) => string;
        };
        t: Record<string, string>;
    }>(BdApi.Webpack.Filters.byKeys('intl'));
    const blockedTextI18ned = discordI18nMod.intl.string(discordI18nMod.t['ot2tSp']);
    const ignoredTextI18ned = discordI18nMod.intl.string(discordI18nMod.t['nDdxOG']);
    const friendsAriaLabelI18ned = discordI18nMod.intl.string(discordI18nMod.t['FsbKOz']);

    BdApi.Patcher.after(
        meta.name,
        (friendsTablistItem as any).prototype,
        'render',
        (_, __, ret: FriendsListTabListReturnType) => {
            if(!ret || !ret.props) return;
            if(ret.props['aria-label'] !== friendsAriaLabelI18ned) return;
            if(!Array.isArray(ret.props.children)) return;

            const pendingPos = ret.props.children.findIndex((value) => value.props && value.props.id === 'PENDING');

            ret.props.children.splice(
                pendingPos + 1,
                0,
                <TablistItem
                    {...ret.props.children[0].props}
                    aria-label={blockedTextI18ned}
                    key={'.$BLOCKED'}
                    id='BLOCKED'
                    onItemSelect={((e) => {
                        Dispatcher.dispatch({
                            type: 'FRIENDS_SET_SECTION',
                            section: e
                        });
                    })}
                >
                    {blockedTextI18ned}
                </TablistItem>,
                <TablistItem
                    {...ret.props.children[0].props}
                    aria-label={ignoredTextI18ned}
                    key={'.$IGNORED'}
                    id='IGNORED'
                    onItemSelect={(e) => {
                        Dispatcher.dispatch({
                            type: 'FRIENDS_SET_SECTION',
                            section: e
                        });
                    }}
                >
                    {ignoredTextI18ned}
                </TablistItem>
            );
        }
    );
};