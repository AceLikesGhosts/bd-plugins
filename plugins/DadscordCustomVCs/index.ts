import Logger from '@lib/logger';
import type { Cancel, Plugin } from 'betterdiscord';
import meta from './config.json';
import Settings from './Settings';
import { Channel } from '@lib/stores/ChannelStore';
import Dispatcher from '@lib/modules/Dispatcher';
import { onMessageCreate } from './events/messageCreate';
import { onVoiceStateUpdate } from './events/voiceStateUpdate';
import PatchUserContext from './patches/patchUserContext';
export { meta };

export const DADSCORD_GUILD_ID = '319560327719026709';

const DADSCORD_OWNERSHIP_PERMISSION_BITFIELD = 3146752n;
export const ownsVoiceChat = (userId: string, permissionOverwrites: Channel['permissionOverwrites_']) => permissionOverwrites?.[userId]?.allow === DADSCORD_OWNERSHIP_PERMISSION_BITFIELD;

export type AutoBanContext = {
    timestamp: Date;
    reason: string | null;
};

export enum NotificationEvents {
    VOICE_AUTOCLAIM,
    NEW_VOICE_CONTROLLER,
    FAILED_TO_FIND_VOICE_CONTROLLER,
    AUTOBAN_NAME_FILTERING_SUCCESS,
    AUTOBAN_ID_BLACKLIST_SUCCESS,
    CONTEXT_MENU_ADDED_TO_AUTOBANS,
    CONTEXT_MENU_REMOVED_FROM_AUTOBANS,
    CONTEXT_MENU_GIVE_FULL_SHARED_OWNERSHIP,
    CONTEXT_MENU_REMOVE_FULL_SHARED_OWNERSHIP,
}


export enum AllowedCommands {
    BAN,
    UNBAN,
    KICK,
    LOCK,
    UNLOCK,
    HIDE,
    REVEAL,
}

export const AllAllowedCommands = [
    AllowedCommands.BAN,
    AllowedCommands.UNBAN,
    AllowedCommands.KICK,
    AllowedCommands.LOCK,
    AllowedCommands.UNLOCK,
    AllowedCommands.HIDE,
    AllowedCommands.REVEAL,
];


export const DefaultSettings = {
    showVoiceOwnerIcon: true,

    autoClaimVoiceChat: true,
    persistantSharedCallOwnership: new Map<string, AllowedCommands[]>(),

    autoBanUserIds: new Map<string, AutoBanContext>(),
    // regex based name filtering
    // /thing/ = regex
    // thing = string contains
    nameFiltering: new Set<string>(),

    // list of places to show notifications for
    showNotificationsFor: [] as NotificationEvents[]
};

export const logger = new Logger(meta);
export default class DadscordAutoBans implements Plugin {
    static settings: typeof DefaultSettings = DefaultSettings;
    static userContextCancel: Cancel;

    public start(): void {
        logger.log('loading settings');

        const loadedSettings = BdApi.Data.load(meta.name, 'settings') ?? {};
        DadscordAutoBans.settings = {
            ...DefaultSettings,
            ...loadedSettings,
            autoBanUserIds: new Map(
                Object.entries(loadedSettings.autoBanUserIds ?? {}).map(
                    ([id, ctx]: [string, any]) => [
                        id,
                        { ...ctx, timestamp: new Date(ctx.timestamp) }
                    ]
                )
            ),
            persistantSharedCallOwnership: new Map(
                Object.entries(loadedSettings.persistantSharedCallOwnership ?? {})
            ),
            nameFiltering: new Set(loadedSettings.nameFiltering ?? []),
        };

        DadscordAutoBans.userContextCancel = PatchUserContext();
        Dispatcher.subscribe('MESSAGE_CREATE', onMessageCreate);
        Dispatcher.subscribe('VOICE_STATE_UPDATES', onVoiceStateUpdate);
    }


    public stop(): void {
        logger.log('saving settings');

        BdApi.Data.save(meta.name, 'settings', {
            ...DadscordAutoBans.settings,
            autoBanUserIds: Object.fromEntries(DadscordAutoBans.settings.autoBanUserIds),
            persistantSharedCallOwnership: Object.fromEntries(DadscordAutoBans.settings.persistantSharedCallOwnership),
            nameFiltering: [...DadscordAutoBans.settings.nameFiltering]
        });

        DadscordAutoBans.userContextCancel();
        Dispatcher.unsubscribe('MESSAGE_CREATE', onMessageCreate);
        Dispatcher.unsubscribe('VOICE_STATE_UPDATES', onVoiceStateUpdate);
    }


    public getSettingsPanel() {
        return Settings;
    }
}