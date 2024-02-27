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


// this elm doesnt have enough to fucking patch it, are you fucking serious??
// WHY COULD THEY HAVE NOT PASSED DOWN THE USER!


// export default function PatchUserPopout(): void {
//     // user about me from popout
//     const [mod, key] = BdApi.Webpack.getWithKey(BdApi.Webpack.Filters.byStrings('bio', 'isUsingGuildBio', 'animateOnHover'));

//     BdApi.Patcher.after(config.name, mod, key, (_, __, ret: ReactElementJSONRepresentation) => {
//         // render out component that loops over a user's voice states / active calls from `VoiceStateStore`
//         // for each vc/voice state we show the VC they're in, allow it to be pressed to navigate to the call

//         ret.props.children.splice(0, 0, <PopoutPatch />);
//     });
// }

// take 2:

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