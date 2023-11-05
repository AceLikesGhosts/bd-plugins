import DiscordConstants from '@lib/modules/DiscordConstants';
import type ADiscordBypasses from '..';
import PermissionStore from '@lib/modules/PermissionStore';

export default (main: ADiscordBypasses): void => {
    BdApi.Patcher.after('ADiscordBypasses', PermissionStore, 'can', (_, args, res) => {
        if(
            args[0] === DiscordConstants.Permissions.USE_VAD &&
            main.settings?.PTT
        ) {
            return true;
        }

        return res;
    });
};