import type { User } from './UserStore';

interface UserProfileStore {
    getMutualFriends(id: string): {
        key: string;
        status: string;
        user: User;
    }[] | undefined;
}

export default BdApi.Webpack.getStore('UserProfileStore') as UserProfileStore;