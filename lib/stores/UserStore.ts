import type { Store } from './Store';

export interface User {
    avatar: string;
    avatarDecorationData: unknown;
    bot: boolean;
    desktop: boolean;
    email: string;
    flags: number;
    globalName: string | null;
    guildMeeberAvatars: Record<string, unknown>;
    hasAnyStaffLevel: () => boolean;
    hasBouncedEmail: boolean;
    hasFlag: (flag: number) => boolean;
    id: string;
    isStaff: () => boolean;
    isStaffPersonal: () => boolean;
    mfaEnabled: boolean;
    mobile: boolean;
    nsfwAllowed: boolean;
    personalConnectionId: unknown;
    phone?: string;
    premiumType: number;
    premiumUsageFlags: number;
    pubilcFlags: number;
    purchasedFlags: number;
    system: boolean;
    username: string;
    verified: boolean;
    avatarDecoration: unknown;
    createdAt: string;
    tag: string;
    accentColor: string;
    banner: string;
}

export interface UserStore extends Store {
    getCurrentUser(): User;
    getUser(id: string): User;
    getUsers(): User[];
    getUserStoreVersion(): number;
}

export default /** @__PURE__ */ BdApi.Webpack.getStore('UserStore') as UserStore;