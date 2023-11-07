export interface DiscordConstants {
    Permissions: Record<string, bigint>;
    VerificationCriteria: { ACCOUNT_AGE: number; MEMBER_AGE: number; };
}

export default /** @__PURE__ */ BdApi.Webpack.getByKeys('VerificationCriteria') as DiscordConstants;