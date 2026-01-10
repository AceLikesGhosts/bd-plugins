import ChannelStore from '@lib/stores/ChannelStore';
import { Component, Message, MessageComponent } from '@lib/stores/MessageStore';
import { logger } from '.';
import { pendingBanSelects } from './events/messageCreate';

const DADSCORD_BOT_APPLICATION_ID = '1246440874955771904';

const sendButtonReply = BdApi.Webpack.getByStrings(
    'INTERACTIONS',
    'unarchiveThreadIfNecessary',
    { searchExports: true }
) as (e: ButtonClickEvent) => Promise<any>;

export interface ButtonClickEvent {
    applicationId: string;
    channelId: string;
    componentId: string;
    componentType: number;
    customId: string;
    guildId: string;
    localState?: {
        type: number;
        values: string[];
    };
    messageFlags: number;
    messageId: string;
}

const voiceControllers = new Map<string, VoiceController>();
export const getVoiceController = (channelId: string) => voiceControllers.get(channelId);
export const newVoiceController = (m: Message) => {
    logger.log('new voice controller for message', m);
    const v = new VoiceController(m);
    voiceControllers.set(m.channel_id, v);
    return v;
};

export class VoiceController {
    private buttonsById = new Map<string, Component & { parent: MessageComponent; }>();
    private message: Message;


    public constructor(message: Message) {
        this.message = message;

        for(const outterComponent of message.components) {
            // button group
            if(outterComponent.type !== 1) {
                continue;
            }

            for(const button of outterComponent.components) {
                // thank you dadscord!
                // all customIds are in the format of:
                // vc:CHANNEL_ID:TYPE
                // i.e.: vc:12345:ban
                const buttonIdSplit = button.custom_id.split(':');
                this.buttonsById.set(
                    buttonIdSplit[2],
                    {
                        ...button,
                        parent: outterComponent
                    }
                );
            }
        }
    }

    private getComponentId(comp: Component & { parent: MessageComponent; }) {
        return `${ comp.parent.id },${ comp.id }`;
    }

    public async hide() {
        const btn = this.buttonsById.get('hide');
        const id = this.getComponentId(btn as any);

        sendButtonReply({
            applicationId: DADSCORD_BOT_APPLICATION_ID,
            channelId: this.message.channel_id,
            messageId: this.message.id,
            messageFlags: this.message.flags,
            componentType: 2,
            componentId: id,
            customId: btn!.custom_id,
            guildId: ChannelStore.getChannel(this.message.channel_id).guild_id,
            localState: undefined,
        });
    }

    public async unhide() {
        const btn = this.buttonsById.get('reveal');
        const id = this.getComponentId(btn as any);

        sendButtonReply({
            applicationId: DADSCORD_BOT_APPLICATION_ID,
            channelId: this.message.channel_id,
            messageId: this.message.id,
            messageFlags: this.message.flags,
            componentType: 2,
            componentId: id,
            customId: btn!.custom_id,
            guildId: ChannelStore.getChannel(this.message.channel_id).guild_id,
            localState: undefined,
        });
    }

    public async lock() {
        const btn = this.buttonsById.get('lock');
        const id = this.getComponentId(btn as any);

        sendButtonReply({
            applicationId: DADSCORD_BOT_APPLICATION_ID,
            channelId: this.message.channel_id,
            messageId: this.message.id,
            messageFlags: this.message.flags,
            componentType: 2,
            componentId: id,
            customId: btn!.custom_id,
            guildId: ChannelStore.getChannel(this.message.channel_id).guild_id,
            localState: undefined,
        });
    }

    public async unlock() {
        const btn = this.buttonsById.get('unlock');
        const id = this.getComponentId(btn as any);

        sendButtonReply({
            applicationId: DADSCORD_BOT_APPLICATION_ID,
            channelId: this.message.channel_id,
            messageId: this.message.id,
            messageFlags: this.message.flags,
            componentType: 2,
            componentId: id,
            customId: btn!.custom_id,
            guildId: ChannelStore.getChannel(this.message.channel_id).guild_id,
            localState: undefined,
        });
    }

    private async userSelectMenuBullshit(action: 'ban' | 'kick' | 'unban', mention: string) {
        logger.log(action, mention);

        const match = mention.match(/(?:<@!?(\d+)>|(\d+))/);
        logger.log(`${ action } match`, match);
        if(!match) return logger.warn('Invalid user mention');
        const targetUserId = match[0];
        logger.log(`${ action } target user id`, targetUserId);

        const btn = this.buttonsById.get(action);
        logger.log(`${ action } btn`, btn);
        if(!btn) return;

        const componentId = this.getComponentId(btn as any);
        const gid = ChannelStore.getChannel(this.message.channel_id).guild_id;

        const selectMenuPromise = new Promise<any>((resolve) => {
            const timeoutId = setTimeout(() => {
                logger.log(`${ action } select timeout`);
                pendingBanSelects.delete(this.message.channel_id);
                resolve(null);
            }, 10000); // 10s timeout

            // @ts-expect-error bun
            pendingBanSelects.set(this.message.channel_id, { resolve, timeoutId });
        });

        // 4️⃣ Click the respective action button (ban/kick/unban)
        sendButtonReply({
            applicationId: DADSCORD_BOT_APPLICATION_ID,
            channelId: this.message.channel_id,
            messageId: this.message.id,
            messageFlags: this.message.flags,
            componentType: 2, // button
            componentId: componentId,
            customId: btn.custom_id,
            guildId: gid,
            localState: undefined,
        });

        logger.log(`${ action } select menu message waiting`);

        const selectMenuMessage = await selectMenuPromise;
        logger.log('continuing', selectMenuMessage);
        if(!selectMenuMessage) {
            BdApi.UI.showToast(`Failed to get ${ action } select menu`, { type: 'error' });
            logger.error(`${ action } select menu message not found`);
            return;
        }

        const selectMenu = selectMenuMessage.components?.[0]?.components?.[0];
        if(!selectMenu) {
            BdApi.UI.showToast(`No select menu component found for ${ action }`, { type: 'error' });
            logger.error(`No select menu component found for ${ action }`);
            return;
        }

        logger.log(`${ action } select menu`, selectMenu);

        let userFound = false;
        for(const opt of selectMenu.options as { value: string; }[]) {
            if(opt.value === targetUserId) {
                userFound = true;
                break;
            }
        }

        if(!userFound) {
            logger.log(`${ action } not a valid user id for menu`, selectMenu);
            return;
        }

        sendButtonReply({
            applicationId: DADSCORD_BOT_APPLICATION_ID,
            channelId: selectMenuMessage.channel_id,
            messageId: selectMenuMessage.id,
            messageFlags: selectMenuMessage.flags,
            componentType: 3,
            componentId: selectMenu.id,
            customId: selectMenu.custom_id,
            guildId: gid,
            localState: {
                type: 3,
                values: [
                    targetUserId
                ]
            },
        });

        logger.log(`${ action } submitted for`, targetUserId);
    }



    public async ban(mention: string) {
        return this.userSelectMenuBullshit('ban', mention);
    }

    public async unban(mention: string) {
        return this.userSelectMenuBullshit('unban', mention);
    }

    public async kick(mention: string) {
        return this.userSelectMenuBullshit('kick', mention);
    }
}