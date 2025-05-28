import ElectronModule from '@lib/modules/ElectronModule';
import ADiscordBypasses from '..';
import config from '../config.json';

export default function setBadge(): void {
    if(!ADiscordBypasses.settings?.electronBadge) return;
    ElectronModule.setBadge(0);
    ElectronModule.setSystemTrayIcon('DEFAULT');

    BdApi.Patcher.before(config.name, ElectronModule, 'setBadge', (_, args) => {
        if(ADiscordBypasses.settings?.electronBadge) args[0] = 0;
        return args;
    });
    
    BdApi.Patcher.before(config.name, ElectronModule, 'setSystemTrayIcon', (_, args) => {
        if(ADiscordBypasses.settings?.electronBadge && args[0] === 'UNREAD') args[0] = 'DEFAULT';
        return args;
    });
}