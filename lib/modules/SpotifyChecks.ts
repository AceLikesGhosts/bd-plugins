export interface SpotifyChecks {
    ensureSpotifyPlayable: (...args: any[]) => any;
    ensureSpotifyPremium: (...args: any[]) => any;
    isSpotifyPlayable: (...args: any[]) => any;
    isSpotifyPremium: (...args: any[]) => any;
}

export default /** @pure */ BdApi.Webpack.getByKeys('isSpotifyPremium', 'ensureSpotifyPremium') as SpotifyChecks;