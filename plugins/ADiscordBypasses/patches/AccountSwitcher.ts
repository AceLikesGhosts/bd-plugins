import ADiscordBypasses from '..';
import AccountSwitcherModule from '@lib/modules/AccountSwitcher';

export default (main: ADiscordBypasses): void => {
    main.logger.warn('Patching AccountSwitcher || UNIMPLEMENTED.');

    let maxAccountsKey: string | undefined;
    for(const key in AccountSwitcherModule) {
        const v = AccountSwitcherModule[key];
        if(typeof v === 'number') maxAccountsKey = key;
    }

    if(!maxAccountsKey) {
        main.logger.critical(`Failed to locate maxAccountsKey`, maxAccountsKey, AccountSwitcherModule);
        return;
    }

    Object.defineProperty(AccountSwitcherModule, maxAccountsKey, {
        get: () => {
            return ADiscordBypasses.settings?.MaxAccounts ? Infinity : 5;
        },
        configurable: true,
        enumerable: true,
    });
};