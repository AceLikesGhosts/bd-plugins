import { User } from './UserStore';

interface FriendsStore {
    getState(): {
        fetching: boolean;
        rows: FriendsStoreRows;
    };
}

export type Relationship = {
    key: string;
    userId: string;
    type: number;
    status: string;
    isMobile: boolean;
    activities: any[];
    applicationStream: null;
    user: User;
    usernameLower: string;
    mutualGuildsLength: number;
    mutualGuilds: any[];
    spam: boolean;
    ignoredUser: boolean;
    isGameRelationship: boolean;
};

interface FriendsStoreRows {
    _rows: Relationship[];

    // filter(e: RelationshipTypes, t): Relationship[];
    // getRelationshipCounts(): any;
    // reset(): any;
    // update(e: unknown): any;
}

export default BdApi.Webpack.getStore('FriendsStore') as FriendsStore;