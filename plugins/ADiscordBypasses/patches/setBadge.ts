import ElectronModule from '@lib/modules/ElectronModule';
import type ADiscordBypasses from '..';
import config from '../config.json';

export default function setBadge(main: ADiscordBypasses): void {
    if(!main.settings?.electronBadge) return;
    ElectronModule.setBadge(0);
    ElectronModule.setSystemTrayIcon('DEFAULT');

    BdApi.Patcher.before(config.name, ElectronModule, 'setBadge', (_, args) => {
        if(main.settings?.electronBadge) args[0] = 0;
        return args;
    });
    
    BdApi.Patcher.before(config.name, ElectronModule, 'setSystemTrayIcon', (_, args) => {
        if(main.settings?.electronBadge && args[0] === 'UNREAD') args[0] = 'DEFAULT';
        return args;
    });
}