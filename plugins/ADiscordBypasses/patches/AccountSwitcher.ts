import type ADiscordBypasses from '..';
import AccountSwitcherStrings from '@lib/modules/AccountSwitcher';

export default (main: ADiscordBypasses): void => {
    Object.defineProperty(AccountSwitcherStrings, 'MAX_ACCOUNTS', {
        get: () => {
            return main.settings?.MaxAccounts ? Infinity : 5;
        },
        configurable: true,
        enumerable: true,
    });
};