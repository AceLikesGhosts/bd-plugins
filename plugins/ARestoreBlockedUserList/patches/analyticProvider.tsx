// renders the actual section 163417
//
// BdApi.Webpack.getByKeys('Pages', 'Sections', 'Objects', 'ObjectTypes', 'defaultProps', {searchExports:true})
// 410575 analytic provider

import FriendsStore from '@lib/stores/FriendsStore';
import RelationshipStore from '@lib/stores/RelationshipStore';
import { meta } from '..';

//             let {rows: t, renderRow: n, renderSection: o, isVirtualizedList: a, 
// hasSearchQuery: s, sectionFilter: c, footer: u} = e;
type FCSectionComponent = React.FC<
    {
        rows: unknown;
        renderRow: () => unknown;
        renderSection: () => unknown;
        isVirtualizedList: boolean;
        hasSearchQuery: unknown;
        sectionFilter: unknown;
        footer: unknown;
    }
>;
type SectionComponentProps = {
    props: React.ComponentProps<FCSectionComponent>;
};

type AnalyticsContextThisContext = {
    props: {
        children: SectionComponentProps[];
    };
};

export const patchAnalyticsContext = async () => {
    const analyticsContext = BdApi.Webpack.getByKeys('Pages', 'Sections', 'Objects', 'ObjectTypes', 'defaultProps', { searchExports: true });
    // const SectionComponent = BdApi.Webpack.getByRegex(/renderRow:\w,renderSection:\w/) as FCSectionComponent;

    // NOTE: this currently does not change the drop down context menu resulting in the menu there
    // saying "Remove Friend", not bothered to fix it right now!

    // ot2tSp
    const discordI18nMod = await BdApi.Webpack.waitForModule<{
        intl: {
            string: (key: string) => string;
        };
        t: Record<string, string>;
    }>(BdApi.Webpack.Filters.byKeys('intl'));
    const blockedTextI18ned = discordI18nMod.intl.string(discordI18nMod.t['ot2tSp']);
    const ignoredTextI18ned = discordI18nMod.intl.string(discordI18nMod.t['nDdxOG']);

    BdApi.Patcher.before(
        meta.name,
        (analyticsContext as any).prototype as Record<PropertyKey, (this: AnalyticsContextThisContext) => unknown>,
        'render',
        (ctx: AnalyticsContextThisContext) => {
            if(!ctx || !ctx.props) return;
            if(!Array.isArray(ctx.props.children)) return;

            const foundSection = ctx.props.children.find(
                (child) => {
                    const sectFilter = (child as any as SectionComponentProps).props?.sectionFilter;
                    return sectFilter === 'BLOCKED' || sectFilter === 'IGNORED';
                }
            );

            if(!foundSection) return;

            switch(foundSection.props.sectionFilter) {
                case 'BLOCKED': {
                    const blockedUsersIds = RelationshipStore.getBlockedIDs();
                    BdApi.Patcher.after(
                        meta.name,
                        foundSection.props as { renderSection: () => { key: string; props: { children: { props: { title: string; }; }; }; }; },
                        'renderSection',
                        (_, __, ret) => {
                            // TODO: use discord i18n
                            const blockedUserStr = `${ blockedTextI18ned } — ${ blockedUsersIds.length }`;
                            ret.key = blockedUserStr;
                            ret.props.children.props.title = blockedUserStr;
                        }
                    );

                    // TODO: useMemo or something to prevent doing this every time
                    foundSection.props.rows = [
                        FriendsStore.getState().rows._rows.filter(
                            (user) => blockedUsersIds.includes(user.userId)
                        )
                    ];

                    return;
                }
                case 'IGNORED': {
                    const ignoredUserIds = RelationshipStore.getIgnoredIDs();
                    BdApi.Patcher.after(
                        meta.name,
                        foundSection.props as { renderSection: () => { key: string; props: { children: { props: { title: string; }; }; }; }; },
                        'renderSection',
                        (_, __, ret) => {
                            // TODO: use discord i18n
                            const ignoredUserStr = `${ ignoredTextI18ned } — ${ ignoredUserIds.length }`;
                            ret.key = ignoredUserStr;
                            ret.props.children.props.title = ignoredUserStr;
                        }
                    );

                    // TODO: useMemo or something to prevent doing this every time
                    foundSection.props.rows = [
                        FriendsStore.getState().rows._rows.filter(
                            (user) => ignoredUserIds.includes(user.userId)
                        )
                    ];

                    return;
                }
                default: {
                    throw new Error("invalid section id")
                }
            }


        }
    );
};