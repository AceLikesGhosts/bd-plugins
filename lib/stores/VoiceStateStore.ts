export interface UserVoiceState {
    userId: string;
    channelId: string | null;
    sessionId: string;
    mute: boolean;
    deaf: boolean;
    selfMute: boolean;
    selfDeaf: boolean;
    selfVideo: boolean;
    selfStream: boolean;
    suppress: boolean;
    requestToSpeakTimestamp: null;
    oldChannelId: string | null;
}

interface VoiceStateStore {
    getVoiceStateForUser(id: string): UserVoiceState | undefined;
    getVoiceStatesForChannel(id: string): Record<string, UserVoiceState> | undefined;
    isInChannel(id: string): boolean;
    /**
     * Map of GuildId -> UserId -> User Voice States
     */
    getAllVoiceStates(): Record<string, Record<string, UserVoiceState>>;
}

export default BdApi.Webpack.getByKeys('getVoiceStateForUser') as VoiceStateStore;