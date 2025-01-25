import type ADiscordBypasses from '..';

import TimeoutManager from '@lib/modules/TimeoutManager';


export default (main: ADiscordBypasses): void => {
    main.logger.info('Patching Timeout (Idle kick/Spotify pause).');
    BdApi.Patcher.instead(
        'ADiscordBypasses',
        TimeoutManager.prototype as { start(args: string[]): void; },
        'start',
        (instance, args, res) => {
            // @ts-expect-error idc
            const name = args[1]?.toString();
            if(
                (name?.includes('BOT_CALL_IDLE_DISCONNECT') && main.settings?.CallTimeout) ||
                (name?.includes('SPOTIFY_AUTO_PAUSED') && main.settings?.SpotifyPause)
            ) {
                // @ts-expect-error idc
                instance.start = () => null;
                // @ts-expect-error idc
                instance.stop();
                return null;
            }

            return res.call(instance, ...args);
        }
    );
};