interface FriendshipStore {
    isFriend(userId: string): boolean;
}

export default BdApi.Webpack.getByKeys('getRelationships') as FriendshipStore;