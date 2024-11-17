import type { Store } from './Store';

export interface PermissionStore extends Store {
    can: (...args: any[]) => any;
    canAccessGuildSettings: (...args: any[]) => any;
    canBasicChannel: (...args: any[]) => any;
    canImpersonateRole: (...args: any[]) => any;
    canManageUser: (...args: any[]) => any;
    canWithPartialContext: (permission: bigint, context: Record<PropertyKey, any>) => boolean;
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

type TPermissions = {
    MUTE_MEMBERS: bigint;
    VIEW_CHANNEL: bigint;
};

export const Permissions = BdApi.Webpack.getByKeys('MUTE_MEMBERS', 'VIEW_CHANNEL', { searchExports: true }) as TPermissions;

export default /** @__PURE__ */ BdApi.Webpack.getStore('PermissionStore') as PermissionStore;