// // this is actually the raw classes of
// // the dispatcher, store, and some store utils
// // but those are already exported

// import type { FluxDispatcher } from '../modules/Dispatcher';
// import type { Store } from './Store';

// interface StoreUtils {
//     Dispatcher: new (...args: any[]) => FluxDispatcher,
//     Store: new (...args: any[]) => Store;
//     BatchedStoreListener: new (...args: any[]) => unknown; // class
//     default: unknown; // idk and cba to find out
//     useSyncExternalStore<T>(stores: unknown[], callback: () => T | T[]): T[];
//     useStateFromStoresArray<T>(stores: unknown[], callback: () => unknown): T[];
//     useStateFromStoresObject<T>(stores: unknown[], callback: () => unknown): T[];
// }

// export default /** @__PURE__ */ BdApi.Webpack.getByKeys('Store', 'useStateFromStores') as StoreUtils;

export default /** @__PURE__ */ BdApi.Webpack.getByStrings('useStateFromStores', { searchExports: true }) as <T>(stores: unknown[], callback: () => T | T[]) => T[];