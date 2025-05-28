import ADiscordBypasses from '..';
import UserStore from '@lib/stores/UserStore';

export default (main: ADiscordBypasses): void => {
    main.logger.info('Patching NSFW state.');
    BdApi.Patcher.after('ADiscordBypasses', UserStore, 'getCurrentUser', (_, __, res) => {
        if(res?.nsfwAllowed === false)
            res.nsfwAllowed = ADiscordBypasses.settings!.NSFW ?? res?.nsfwAllowed;

        return res;
    });
};