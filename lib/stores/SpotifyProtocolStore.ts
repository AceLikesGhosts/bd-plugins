export interface SpotifyProtocolStore {
    SpotifyAPI: {
        get: (...args: any[]) => any;
        put: (...args: any[]) => any;
    };
    fetchIsSpotifyProtocolRegistered: (...args: any[]) => any;
    getAccessToken: (...args: any[]) => any;
    getDevices: (...args: any[]) => any;
    getProfile: (...args: any[]) => any;
    pause: (...args: any[]) => any;
    play: (...args: any[]) => any;
    setActiveDevice: (...args: any[]) => any;
    subscribePlayerStateNotifications: (...args: any[]) => any;
}

export default /** @__PURE__ */ BdApi.Webpack.getByKeys('getProfile', 'SpotifyAPI');