import type ADiscordBypasses from '..';
import UserStore from '@lib/modules/UserStore';

export default (main: ADiscordBypasses): void => {
    BdApi.Patcher.after('ADiscordBypasses', UserStore, 'getCurrentUser', (_, __, res) => {
        if(res?.nsfwAllowed === false)
            res.nsfwAllowed = main.settings!.NSFW ?? res?.nsfwAllowed;

        return res;
    });
};