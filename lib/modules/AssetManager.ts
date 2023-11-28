const filter = BdApi.Webpack.Filters.byStrings('getAssetImage: size must === [number, number] for Twitch');

interface AssetManager {
    fetchAssetIds: (e: unknown, t: unknown) => Promise<unknown[]>;
    getAssetFromImage: (e: unknown, t: unknown) => unknown;
    getAssetIds: (e: unknown, t: unknown) => unknown;
    getAssetImage: (e: unknown, t: unknown, n: unknown) => unknown;
    getAssets: (e: unknown) => Promise<unknown>;
}

export default /** @__PURE__ */ BdApi.Webpack.getModule(m =>
    typeof m === 'object' &&
    Object.values(m as object /** this was asserted above */).some(filter as unknown as (value: unknown, index: number, array: unknown[]) => boolean)
) as AssetManager;