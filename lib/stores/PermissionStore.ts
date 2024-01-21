import type { Store } from './Store';

export interface PermissionStore extends Store {
    can: (...args: any[]) => any;
    canAccessGuildSettings: (...args: any[]) => any;
    canBasicChannel: (...args: any[]) => any;
    canImpersonateRole: (...args: any[]) => any;
    canManageUser: (...args: any[]) => any;
    canWithPartialContext: (...args: any[]) => any;
    computePermissions: (...args: any[]) => any;
    getChannelPermissions: (...args: any[]) => any;
    getChannelsVersion: (...args: any[]) => any;
    getGuildPermissionProps: (...args: any[]) => any;
    getPermissionUtils: (...args: any[]) => any;
    getGuildVersion: (...args: any[]) => any;
    getHighestRole: (...args: any[]) => any;
    initialize: (...args: any[]) => any;
    isRoleHigher: (...args: any[]) => any;
    clearVars: (...args: any[]) => any;
}

export default /** @__PURE__ */ BdApi.Webpack.getStore('PermissionStore') as PermissionStore;