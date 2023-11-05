export interface DiscordConstants {
    Permissions: Record<string, bigint>;
    VerificationCriteria: { ACCOUNT_AGE: number; MEMBER_AGE: number; };
}

export default /** @pure */ BdApi.Webpack.getByKeys('VerificationCriteria') as DiscordConstants;