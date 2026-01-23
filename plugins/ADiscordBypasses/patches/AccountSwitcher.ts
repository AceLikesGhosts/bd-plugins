import ADiscordBypasses from '..';
import config from '../config.json';
// import AccountSwitcherModule from '@lib/modules/AccountSwitcher';

// const AccountSwitcherPanelThing = BdApi.Webpack.getByStrings('HAuRSM', { searchExports: true });
const [mod, key] = BdApi.Webpack.getWithKey(BdApi.Webpack.Filters.byStrings('HAuRSM'));

export default (main: ADiscordBypasses): void => {
    main.logger.warn('Patching AccountSwitcher || UNIMPLEMENTED.');

    BdApi.Patcher.instead('test', mod, key, (_, args, res) => {
        if(!args[0].toString().includes('HAuRSM')) {
            return;
        }

        console.log('useState from HAuRSM');
    });

    // BdApi.Patcher.instead(config.name, mod, key, (_, args, res) =>
    //     ADiscordBypasses.settings?.Idle ? false : res(...args)
    // );


    // let maxAccountsKey: string | undefined;
    // for(const key in AccountSwitcherModule) {
    //     const v = AccountSwitcherModule[key];
    //     if(typeof v === 'number') maxAccountsKey = key;
    // }

    // if(!maxAccountsKey) {
    //     main.logger.critical(`Failed to locate maxAccountsKey`, maxAccountsKey, AccountSwitcherModule);
    //     return;
    // }

    // Object.defineProperty(AccountSwitcherModule, maxAccountsKey, {
    //     get: () => {
    //         return ADiscordBypasses.settings?.MaxAccounts ? Infinity : 5;
    //     },
    //     configurable: true,
    //     enumerable: true,
    // });
};