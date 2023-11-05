export interface DiscordConstants {
    Permissions: Permissions;
    VerificationCriteria: { ACCOUNT_AGE: number; MEMBER_AGE: number; };
}

export default /** @pure */ BdApi.Webpack.getByKeys('VerificationCriteria') as DiscordConstants;