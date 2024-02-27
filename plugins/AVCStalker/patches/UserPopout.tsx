import { React } from '@lib/components';
import PopoutPatch from '../components/popout';
import config from '../config.json';
import type { User } from '@lib/stores/UserStore';
import AVCStalker from '..';

export interface ReactElementJSONRepresentation {
    props: {
        lastSection: boolean;
        children: {
            props: unknown | unknown[];
        }[];
    };
}

export default function PatchUserPopout(): void {
    const [mod, key] = BdApi.Webpack.getWithKey(BdApi.Webpack.Filters.byStrings('showCopiableUsername', 'canDM', 'displayProfile'));

    BdApi.Patcher.after(
        config.name,
        (mod as Record<string, (({ user }: { user: User; }) => ReactElementJSONRepresentation)>),
        key,
        (_, [{ user }], res): any => {
            if(!AVCStalker.settings.userPopout) return res;
            res.props.children.splice(1, 0, <PopoutPatch userId={user.id} />);
        });
}