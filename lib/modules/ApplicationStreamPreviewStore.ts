import type { Store } from './Store';

export interface ApplicationStreamPreviewStore extends Store {
    getIsPreviewLoading: (...args: any[]) => any;
    getPreviewURL: (...args: any[]) => any;
    getPreviewURLForStreamKey: (...args: any[]) => any;
}

export default /** @__PURE__ */ BdApi.Webpack.getStore('ApplicationStreamPreviewStore') as ApplicationStreamPreviewStore;