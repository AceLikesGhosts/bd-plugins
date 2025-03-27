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

export const patchAnalyticsContext = () => {
    const analyticsContext = BdApi.Webpack.getByKeys('Pages', 'Sections', 'Objects', 'ObjectTypes', 'defaultProps', { searchExports: true });
    // const SectionComponent = BdApi.Webpack.getByRegex(/renderRow:\w,renderSection:\w/) as FCSectionComponent;

    // NOTE: this currently does not change the drop down context menu resulting in the menu there
    // saying "Remove Friend", not bothered to fix it right now!
    BdApi.Patcher.before(
        meta.name,
        (analyticsContext as any).prototype as Record<PropertyKey, (this: AnalyticsContextThisContext) => unknown>,
        'render',
        (ctx: AnalyticsContextThisContext) => {
            if(!ctx || !ctx.props) return;
            if(!Array.isArray(ctx.props.children)) return;

            const blockedSection = ctx.props.children.find(
                (child) => (child as any as SectionComponentProps).props?.sectionFilter === 'BLOCKED'
            );

            if(!blockedSection) return;

            const blockedUsersIds = RelationshipStore.getBlockedIDs();
            BdApi.Patcher.after(
                meta.name,
                blockedSection.props as { renderSection: () => { key: string; props: { children: { props: { title: string; }; }; }; }; },
                'renderSection',
                (_, __, ret) => {
                    // TODO: use discord i18n
                    const blockedUserStr = `Blocked users — ${ blockedUsersIds.length }`;
                    ret.key = blockedUserStr;
                    ret.props.children.props.title = blockedUserStr;
                }
            );

            // TODO: useMemo or something to prevent doing this every time
            blockedSection.props.rows = [
                FriendsStore.getState().rows._rows.filter(
                    (user) => blockedUsersIds.includes(user.userId)
                )
            ];
        }
    );
};