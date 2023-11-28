// this is actually the raw classes of
// the dispatcher, store, and some store utils
// but those are already exported

import type { FluxDispatcher } from './Dispatcher';
import type { Store } from './Store';

interface StoreUtils {
    Dispatcher: new (...args: any[]) => FluxDispatcher,
    Store: new (...args: any[]) => Store;
    BatchedStoreListener: new (...args: any[]) => unknown; // class
    default: unknown; // idk and cba to find out
    useStateFromStores(stores: unknown[], callback: () => unknown): unknown[];
    useStateFromStoresArray(stores: unknown[], callback: () => unknown): unknown[];
    useStateFromStoresObject(stores: unknown[], callback: () => unknown): unknown[];
}

export default /** @__PURE__ */ BdApi.Webpack.getByKeys('Store', 'useStateFromStores') as StoreUtils;