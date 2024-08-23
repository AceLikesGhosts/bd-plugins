export interface SpotifyStore {
    getActiveSocketAndDevice(...args: any[]): Record<PropertyKey, unknown> & { socket: Record<PropertyKey, unknown> & { isPremium: boolean; } };
}

export default /** @__PURE__ */ BdApi.Webpack.getStore('SpotifyStore') as SpotifyStore;