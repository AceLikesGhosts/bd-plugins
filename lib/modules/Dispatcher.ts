export interface FluxDispatcher {
    dispatch(args: { type: string;[x: string]: unknown; }): void;
    subscribe(event: string, fn: (...args: any[]) => any): void;
    unsubscribe(event: string, fn: (...args: any[]) => any): void;
}

export default /** @__PURE__ */ BdApi.Webpack.getByKeys('dispatch', 'subscribe', 'register', { searchExports: true }) as FluxDispatcher;