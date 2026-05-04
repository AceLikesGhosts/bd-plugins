interface RelationshioStore {
    isFriend(id: string): boolean;
    getBlockedIDs(): string[];
    getIgnoredIDs(): string[];
}

export default BdApi.Webpack.getStore('RelationshipStore') as RelationshioStore;