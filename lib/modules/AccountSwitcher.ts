/**
 * TODO: GO BACK AND FIX
 */
// export default /** @__PURE__ */ BdApi.Webpack.getByKeys('MAX_ACCOUNTS') as { MAX_ACCOUNTS: number; };

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export default BdApi.Webpack.getModule(m => Object.values(m)?.includes('multiaccount_cta_tooltip_seen'));