interface Transitions {
    transitionToGuild(guildId: string, channelId: string): void;
}

export default BdApi.Webpack.getByKeys('transitionTo') as Transitions;