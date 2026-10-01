import { config } from '..';


export default function PatchCallOptionsMenu(): void {
    // @ts-expect-error
    const voiceCallMenuThing = BdApi.Webpack.getBySource('avatarContainerClass', 'voiceUser', { searchExports: true });

    BdApi.Patcher.after(
        config.name,
        voiceCallMenuThing,
        'render',
        (ctx, args, ret) => {
            if(!ret.props) {
                return;
            }

            if(!ret.props.children) {
                return;
            }

            if(
                !ret.props.children?.props ||
                ret.props.children.props?.children ||
                Array.isArray(ret.props.children.props.children)
            ) {
                return;
            }

            // const idxOf = (ret.props.children.props.children as number[]).indexOf(
            // );

            const elm = BdApi.Utils.findInTree(
                ret.props.children.props.children,
                (node) => node?.props?.className?.startsWith('optionsButtonContainer')
            );

            if(!elm || !elm.props || !elm.props.children) {
                return;
            }

            elm.props.children = [
                
                elm.props.children,
            ]
        }
    );
}