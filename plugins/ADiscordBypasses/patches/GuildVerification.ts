import type ADiscordBypasses from '..';
// import { VerificationModule,VerificationCriteriaKey } from '@lib/modules/VerificationCritera';
// import Verification from '@lib/modules/VerificationCritera';

export default (main: ADiscordBypasses): void => {
    main.logger.info('Patching DiscordConstants (Verification).');
    // main.logger.info(Verification[0], Verification[1]);
    // main.logger.info([...]);
    const [test, key] = BdApi.Webpack.getWithKey(BdApi.Webpack.Filters.byKeys('ACCOUNT_AGE', 'MEMBER_AGE'));
    Object.defineProperty(test, key, {
        get: () => {
            return main.settings?.Verification
                ? { ACCOUNT_AGE: 0, MEMBER_AGE: 0 }
                : { ACCOUNT_AGE: 5, MEMBER_AGE: 10 };
        },
        configurable: true,
        enumerable: true,
    });
};