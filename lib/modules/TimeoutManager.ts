export interface TimeoutManager {
    new(): unknown;

    start(): void;
    stop(): void;
    isPaused(): void;
}
export default /** @__PURE__ */ BdApi.Webpack.getByPrototypeKeys('start', 'stop', 'isStarted', { searchExports: true }) as TimeoutManager;