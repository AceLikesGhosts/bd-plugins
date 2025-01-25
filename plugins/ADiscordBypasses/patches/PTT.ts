import type ADiscordBypasses from '..';
import PermissionStore from '@lib/stores/PermissionStore';

export default (main: ADiscordBypasses): void => {
    main.logger.info('Patching PerimssionStore (PTT)');

    const [PermissionsModule, PermissionKey] = BdApi.Webpack.getWithKey(BdApi.Webpack.Filters.byKeys('USE_VAD', 'ADMINISTRATOR'));
    BdApi.Patcher.after('ADiscordBypasses', PermissionStore, 'can', (_, args, res) => {
        if(args[0] === PermissionsModule[PermissionKey].USE_VAD && main.settings?.PTT)
            return true;

        return res;
    });
};