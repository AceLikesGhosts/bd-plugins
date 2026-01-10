import ChannelStore, { Channel } from '@lib/stores/ChannelStore';
import type { Message } from '@lib/stores/MessageStore';
import UserStore from '@lib/stores/UserStore';
import VoiceStateStore from '@lib/stores/VoiceStateStore';
import DadscordAutoBans, { AllowedCommands, DADSCORD_GUILD_ID, logger, ownsVoiceChat } from '..';
import { getVoiceController, newVoiceController } from '../voiceController';

const DADSCORD_VC_BOT_ID = '1246440874955771904';

export const pendingBanSelects = new Map<
    string,
    { resolve: (msg: any) => void; timeoutId: NodeJS.Timeout; }
>();

type MessageCreateEvent = {
    type: 'MESSAGE_CREATE',
    guildId: string;
    channelId: string;
    message: Message;
    optimistic: boolean;
    isPushNotification: boolean;
};

export const onMessageCreate = (e: MessageCreateEvent) => {
    if(e.guildId !== DADSCORD_GUILD_ID && e.guildId !== undefined) return;
    if(!VoiceStateStore.isInChannel(e.channelId)) return;

    const channel = ChannelStore.getChannel(e.channelId);
    const authorId = e.message.author.id;

    const weOwnVC = ownsVoiceChat(
        UserStore.getCurrentUser().id,
        channel.permissionOverwrites_
    );

    if(!weOwnVC) return;

    logger.log(`got message with contents`, e.message.content);
    if(e.message.content.includes('Select a member')) {
        logger.log(`Recieved select menu`, e.message);

        const pending = pendingBanSelects.get(e.channelId);
        clearTimeout(pending?.timeoutId);
        pendingBanSelects.delete(e.channelId);
        pending?.resolve(e.message);

        return;
    }

    // bot controller messages
    if(e.message.author.bot) {
        if(authorId !== DADSCORD_VC_BOT_ID) return;
        if(!e.message.content.includes('Controller for')) return;
        handleSettingBotControllerMessage(e, channel);
        return;
    }

    // const isSharedOwner =
    //     DadscordAutoBans.settings.persistantSharedCallOwnership.has(authorId);

    // if(!isSharedOwner) return;

    handleSharedOwnershipMessage(e, channel);
};


function handleSettingBotControllerMessage(
    e: MessageCreateEvent,
    _channel: Channel,
) {
    // TODO: notification thing
    BdApi.UI.showToast('New Voice Controller', { type: 'success' });

    newVoiceController(e.message);
    return;
}

function handleSharedOwnershipMessage(
    e: MessageCreateEvent,
    _channel: Channel,
) {
    const voiceController = getVoiceController(e.message.channel_id);
    if(!voiceController) {
        BdApi.UI.showToast('No voice controller found', { type: 'error' });
        return;
    }

    const splitCommand = e.message.content.split(' ');
    const commandBase = splitCommand[0];
    const commandArgs = splitCommand.splice(1, splitCommand.length);

    const userPermissions = DadscordAutoBans
        .settings
        .persistantSharedCallOwnership
        .get(e.message.author.id);

    switch(commandBase) {
        case '.ban': case '.b': case '!voice-ban': {
            if(!userPermissions?.includes(AllowedCommands.BAN)) return;
            void voiceController.ban(commandArgs[0]);
            break;
        }

        case '.kick': case '!voice-kick': {
            if(!userPermissions?.includes(AllowedCommands.KICK)) return;
            void voiceController.kick(commandArgs[0]);
            break;
        }

        case '.unban': case '.unb': case '!voice-unban': {
            if(!userPermissions?.includes(AllowedCommands.UNBAN)) return;
            void voiceController.unban(commandArgs[0]);
            break;
        }

        case '.lock': case '.l': case '!voice-lock': {
            if(!userPermissions?.includes(AllowedCommands.LOCK)) return;
            void voiceController.lock();
            break;
        }

        case '.unlock': case '.ul': case '!voice-unlock': {
            if(!userPermissions?.includes(AllowedCommands.UNLOCK)) return;
            void voiceController.unlock();
            break;
        }

        case '.hide': case '.h': case '!voice-hide': {
            if(!userPermissions?.includes(AllowedCommands.HIDE)) return;
            void voiceController.hide();
            break;
        }

        case '.unhide': case '.unh': case '!voice-unhide': case '!voice-show': {
            if(!userPermissions?.includes(AllowedCommands.HIDE)) return;
            void voiceController.unhide();
            break;
        }
    }

    return;
}