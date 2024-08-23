interface IdleStore {
    getIdleSince(...args: unknown[]): unknown;
    isIdle(...args: unknown[]): boolean;
    isAFK(...args: unknown[]): boolean;
}

export default BdApi.Webpack.getStore('IdleStore') as IdleStore;