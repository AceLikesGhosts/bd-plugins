interface AssetManager {
    fetchAssetIds: (e: unknown, t: unknown) => Promise<unknown[]>;
    getAssetFromImage: (e: unknown, t: unknown) => unknown;
    getAssetIds: (e: unknown, t: unknown) => unknown;
    getAssetImage: (e: unknown, t: unknown, n: unknown) => unknown;
    getAssets: (e: unknown) => Promise<unknown>;
}

export default /** @__PURE__ */ BdApi.Webpack.getByKeys('fetchAssetIds', 'getAssetImage') as AssetManager;