export interface FluxDispatcher {
    dispatch(args: { type: string; [x: string]: unknown }): void;
}

export default /** @__PURE__ */ BdApi.Webpack.getByKeys('_currentDispatchActionType', '_processingWaitQueue') as FluxDispatcher;