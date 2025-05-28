import ADiscordBypasses from '..';
import ElectronModule from '@lib/modules/ElectronModule';
import ApplicationStreamPreviewStore from '@lib/stores/ApplicationStreamPreviewStore';
import UserStore from '@lib/stores/UserStore';

export default (main: ADiscordBypasses): void => {
    main.logger.info('Patching StreamPreview');
    
    BdApi.Patcher.instead('ADiscordBypasses', ElectronModule, 'makeChunkedRequest', (_, args, res) => {
        if(!ADiscordBypasses.settings?.StreamPreview) return;
        const replaceWith = ADiscordBypasses.settings.CustomPreviewImage !== '' ?
            ADiscordBypasses.settings.CustomPreviewImage
            : null;
        
        if((args[2].method !== 'POST' && !args[0].includes('preview')) || !ADiscordBypasses.settings?.StreamPreview) {
            return res(...args as unknown[]);
        }

        if(!replaceWith) return;
        return res(args[0], { thumbnail: replaceWith }, args[2]);
    });

    BdApi.Patcher.after('ADiscordBypasses', ApplicationStreamPreviewStore, 'getPreviewURL', (_, args, res: string) => {
        if(!ADiscordBypasses.settings?.StreamPreview) return;
        const replaceWith = ADiscordBypasses.settings.CustomPreviewImage !== '' ?
            ADiscordBypasses.settings.CustomPreviewImage
            : null;
        
        if(
            args[2] === UserStore.getCurrentUser()?.id &&
            ADiscordBypasses.settings?.StreamPreview &&
            !res?.startsWith('https://')
        ) {
            return replaceWith;
        }

        return res;
    });
};