export interface UserUpdates {
    setServerMute(channelId: string, userId: string, mute: boolean): Promise<unknown>;
}

export default BdApi.Webpack.getByKeys('setServerMute') as UserUpdates;
