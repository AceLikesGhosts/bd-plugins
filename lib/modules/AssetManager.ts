const filter = BdApi.Webpack.Filters.byStrings('getAssetImage: size must === [number, number] for Twitch');

interface AssetManager {
    
}

export default /** @__PURE__ */ BdApi.Webpack.getModule(m =>
    typeof m === 'object' &&
    Object.values(m as object /** this was asserted above */).some(filter as unknown as (value: unknown, index: number, array: unknown[]) => boolean)
) as AssetManager;