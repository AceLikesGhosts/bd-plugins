import { meta } from 'plugins/ADifferentSearch';
import ADiscordBypasses from '..';

export default async (main: ADiscordBypasses): Promise<void> => {
    main.logger.warn('Patching AccountSwitcher || UNIMPLEMENTED.');

    const modalMod = await BdApi.Webpack.waitForModule<{
        Modal: React.ComponentType<{
            subtitle: string;
        }>;
    }>(BdApi.Webpack.Filters.byKeys('Modal'));
    if(!modalMod.Modal) {
        main.logger.critical('Failed to find Modal module for AccountSwitcher patch', modalMod);
        return;
    }

    main.logger.log('Found Modal module for AccountSwitcher patch', modalMod);
    const discordI18nMod = await BdApi.Webpack.waitForModule<{
        intl: {
            string: (key: string) => string;
        };
        t: Record<string, string>;
    }>(BdApi.Webpack.Filters.byKeys('intl'));
    main.logger.log('Found i18n module for AccountSwitcher patch', discordI18nMod);

    const lazyAddAccountModal = await BdApi.Webpack.waitForModule<Record<string, Function>>(BdApi.Webpack.Filters.bySource('type:"LOGIN_RESET",isMultiAccount:!0'));
    main.logger.debug('Found add account lazy modal object', lazyAddAccountModal);

    let openAddAccountModalLazy: Function | null = null;
    for(const key in lazyAddAccountModal) {
        if(typeof lazyAddAccountModal[key] !== 'function') continue;
        const funcStr = lazyAddAccountModal[key].toString();

        if(!funcStr.includes('Promise.all')) continue;
        // jank way to find it but outside the amount of `n.e` calls both
        // of these functions in this module are identical
        if(funcStr.split('n.e').length !== 4) continue;

        main.logger.debug('Found add account lazy modal function', { key, funcStr });
        openAddAccountModalLazy = lazyAddAccountModal[key];
        break;
    }

    BdApi.Patcher.before(meta.name, modalMod, 'Modal', (_, args) => {
        main.logger.log('Modal props', args[0]);

        type Action = {
            text: string;
            variant: string;
            onClick: () => void;
        };

        const props = args[0] as { subtitle?: string; actions?: Action[]; };
        if(
            !props ||
            typeof props !== 'object' ||
            !props.subtitle ||
            typeof props.subtitle !== 'string' ||
            !props.subtitle.includes(discordI18nMod.intl.string(discordI18nMod.t['+1Uk3c']))
        ) {
            return;
        }

        main.logger.log('Found AccountSwitcher Modal', props);

        if(!('actions' in props)) {
            main.logger.warn('AccountSwitcher Modal does not have actions prop, cannot patch', props);
            return;
        }

        const lookingForActionString = discordI18nMod.intl.string(discordI18nMod.t['9g2mqT']);
        for(const action of props.actions!) {
            if(action.text !== lookingForActionString) {
                continue;
            }

            const cancel = BdApi.Patcher.instead(meta.name, action, 'onClick', (ctx, args, orig) => {
                if(!openAddAccountModalLazy) {
                    main.logger.error('Add Account modal function not found, reverting to original');
                    return orig.apply(ctx, args);
                }

                main.logger.log('Opening add account modal');
                openAddAccountModalLazy();
                cancel();
            });
        }
    });
};