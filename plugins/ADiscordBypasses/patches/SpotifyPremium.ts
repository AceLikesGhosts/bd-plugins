import type ADiscordBypasses from '..';
import SpotifyProtocolStore from '@lib/modules/SpotifyProtocolStore';
import SpotifyChecks from '@lib/modules/SpotifyChecks';
import Dispatcher from '@lib/modules/Dispatcher';

export default (main: ADiscordBypasses): void => {
    main.logger.info('Patching Spotify Premium');
    BdApi.Patcher.instead('ADiscordBypasses', SpotifyProtocolStore, 'getProfile', (_, args, res) => {
        main.settings?.SpotifyPremium ?
            Dispatcher.dispatch({
                type: 'SPOTIY_PROFILE_UPDATE',
                accountId: args[0],
                isPremium: true
            })
            : res(...args);
    });

    BdApi.Patcher.instead(
        'ADiscordBypasses',
        SpotifyChecks,
        'isSpotifyPremium',
        (_, __, res) => main.settings?.SpotifyPremium || res
    );

    BdApi.Patcher.instead(
        'ADiscordBypasses',
        SpotifyChecks,
        'ensureSpotifyPremium',
        // eslint-disable-next-line @typescript-eslint/promise-function-async
        (_, args, res) => main.settings?.SpotifyPremium
            ? new Promise((res) => res(true))
            : res(...args as unknown[])
    );
};