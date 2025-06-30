export interface UserUpdates {
    setServerMute(channelId: string, userId: string, mute: boolean): Promise<unknown>;
    setServerDeaf(channelId: string, userId: string, deaf: boolean): Promise<unknown>;
    setChannel(guildId: string, userId: string, channelId: string | null): Promise<unknown>;
}

export default BdApi.Webpack.getByKeys('setServerMute') as UserUpdates;
