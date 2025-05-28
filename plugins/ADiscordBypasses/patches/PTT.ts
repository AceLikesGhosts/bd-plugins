import ADiscordBypasses from '..';
import PermissionStore from '@lib/stores/PermissionStore';

export default (main: ADiscordBypasses): void => {
    main.logger.info('Patching PerimssionStore (PTT)');

    const [PermissionsModule, PermissionKey] = BdApi.Webpack.getWithKey(BdApi.Webpack.Filters.byKeys('USE_VAD', 'ADMINISTRATOR'));
    BdApi.Patcher.after('ADiscordBypasses', PermissionStore, 'can', (_, args, res) => {
        if(args[0] === (
            PermissionsModule[PermissionKey] as Record<PropertyKey, unknown>
        ).USE_VAD && ADiscordBypasses.settings?.PTT)
            return true;

        return res;
    });
};