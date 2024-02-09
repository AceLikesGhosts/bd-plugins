import type { Plugin } from 'betterdiscord';
import type { UserVoiceState } from '@lib/stores/VoiceStateStore';
import config from './config.json';
import Dispatcher from '@lib/modules/Dispatcher';
import Settings from './components/Settings';
import UserStore from '@lib/stores/UserStore';
import RelationshipStore from '@lib/stores/RelationshipStore';
import UserProfileStore from '@lib/stores/UserProfileStore';
import Logger from '@lib/logger';

interface MediaUserHelper {
    toggleLocalMute(id: string): void;
    toggleLocalSoundboardMute(id: string): void;
}

interface MediaEngineStore {
    isLocalMute(id: string): boolean;
}

interface SoundboardStore {
    isLocalSoundboardMuted(id: string): boolean;
}

export default class VCMuteUnknown implements Plugin {
    private readonly logger = new Logger(config);

    private mediaUserHelpers: MediaUserHelper | null = null;
    private mediaEngineStore: MediaEngineStore | null = null;
    private soundboardStore: SoundboardStore | null = null;

    private ourId: string | null = null;
    private ourChannelId: string | null = null;

    static DefaultSettings = {
        mute: true,
        muteSoundboard: true,
        ignoreMutuals: false,
        ignoreFriends: true
    };

    static settings: typeof VCMuteUnknown.DefaultSettings = VCMuteUnknown.DefaultSettings;

    private handleUserJoin(voiceState: { type: 'VOICE_STATE_UPDATES'; voiceStates: UserVoiceState[]; }): void {
        if(voiceState.type !== 'VOICE_STATE_UPDATES') return;

        for(let i: number = 0; i < voiceState.voiceStates.length; i++) {
            const vs = voiceState.voiceStates[i];

            if(vs.userId === (this?.ourId || UserStore.getCurrentUser().id)) {
                this.ourChannelId = vs.channelId;
                this.logger.log('updated ourChannelId to: ', vs.channelId);
                return;
            }

            if(vs.channelId !== this?.ourChannelId) return;
            // they updated say personal mute, or deafen/screenshare/etc, therefore we dont care
            if(vs.channelId === vs.oldChannelId) return;

            if(VCMuteUnknown.settings.ignoreFriends && RelationshipStore.isFriend(vs.userId)) return;
            if(VCMuteUnknown.settings.ignoreMutuals && UserProfileStore.getMutualFriends(vs.userId) !== undefined) return;

            if(VCMuteUnknown.settings.mute) {
                if(!this.mediaEngineStore?.isLocalMute(vs.userId)) {
                    this.logger.log('local muting user due to them joining voice channel: ', vs.userId);
                    this.mediaUserHelpers?.toggleLocalMute(vs.userId);
                }
                else this.logger.log('user was already muted so we are not doing anything', vs.userId);
            }

            if(VCMuteUnknown.settings.muteSoundboard) {
                if(!this.soundboardStore?.isLocalSoundboardMuted(vs.userId)) {
                    this.logger.log('local diasble soundboard due to them joining voice channel: ', vs.userId);
                    this.mediaUserHelpers?.toggleLocalSoundboardMute(vs.userId);
                }
                else this.logger.info('user was already soundboard muted so we are not doing anything', vs.userId);
            }
        }
    }

    public start(): void {
        this.logger.log('started');
        this.mediaUserHelpers = BdApi.Webpack.getByKeys('toggleLocalMute', 'toggleSelfDeaf', 'toggleSelfMute');
        this.mediaEngineStore = BdApi.Webpack.getStore('MediaEngineStore');
        this.soundboardStore = BdApi.Webpack.getStore('SoundboardStore');
        this.ourId = UserStore.getCurrentUser().id;
        Dispatcher.subscribe('VOICE_STATE_UPDATES', this.handleUserJoin.bind(this));
    }

    public stop(): void {
        this.logger.log('stopped');
        Dispatcher.unsubscribe('VOICE_STATE_UPDATES', this.handleUserJoin.bind(this));
        this.mediaUserHelpers = null;
    }

    public getSettingsPanel(): () => JSX.Element {
        return Settings.bind(this);
    }
}