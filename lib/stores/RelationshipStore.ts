interface RelationshioStore {
    isFriend(id: string): boolean;
}

export default BdApi.Webpack.getStore('RelationshipStore') as RelationshioStore;