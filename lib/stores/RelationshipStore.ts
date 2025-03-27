interface RelationshioStore {
    isFriend(id: string): boolean;
    getBlockedIDs(): string[];
}

export default BdApi.Webpack.getStore('RelationshipStore') as RelationshioStore;