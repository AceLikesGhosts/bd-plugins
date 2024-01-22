export interface UserVoiceState {
    userId: string;
    channelId: string;
    sessionId: string;
    mute: boolean;
    deaf: boolean;
    selfMute: boolean;
    selfDeaf: boolean;
    selfVideo: boolean;
    selfStream: boolean;
    suppress: boolean;
    requestToSpeakTimestamp: null;
}

interface VoiceStateStore {
    getVoiceStateForUser(id: string): UserVoiceState | undefined;
    getVoiceStatesForChannel(id: string): Record<string, UserVoiceState> | undefined;
    isInChannel(id: string): boolean;
}

export default BdApi.Webpack.getByKeys('getVoiceStateForUser') as VoiceStateStore;