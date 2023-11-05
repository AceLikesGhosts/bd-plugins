import type ADiscordBypasses from '..';
import DiscordConstants from '@lib/modules/DiscordConstants';

export default (main: ADiscordBypasses): void => {
    Object.defineProperty(DiscordConstants, 'VerificationCriteria', {
        get: () => {
            return main.settings?.Verification
                ? { ACCOUNT_AGE: 0, MEMBER_AGE: 0 }
                : { ACCOUNT_AGE: 5, MEMBER_AGE: 10 };
        },
        configurable: true,
        enumerable: true,
    });
};