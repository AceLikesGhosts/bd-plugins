import VoiceStateStore from '@lib/stores/VoiceStateStore';
import UserStore from '@lib/stores/UserStore';
import AVCStalker, { logger } from '.';
import type { Channel } from '@lib/stores/ChannelStore';
import ChannelStore from '@lib/stores/ChannelStore';
import type { UserVoiceState } from '@lib/stores/VoiceStateStore';
import { followingPeople } from './voiceState/Following';
import GuildStore from '@lib/stores/GuildStore';

// TODO: de-hardcode this bitfield and pull it from Webpack, but for now
// this isn't going to change, and if it does they are going to notify on their
// proper documentation page as this is a supported bitfield from
// https://discord.dev/
export const ConnectionMask = BigInt(1 << 20);

export const voiceChannelUtils = BdApi.Webpack.getByKeys('selectVoiceChannel', 'disconnect', { searchExports: true }) as {
    selectVoiceChannel: (channelId: string) => void;
    disconnect(): void;
};

const PermissionStore = BdApi.Webpack.getStore('PermissionStore') as {
    getChannelPermissions(channel: Channel): bigint;
};

export function canJoinCall(channel: Channel | null): boolean {
    if(!channel) return false;
    const VSs = VoiceStateStore.getVoiceStatesForChannel(channel.id) as Record<string, UserVoiceState>;
    if(!VSs) return false;

    if((PermissionStore.getChannelPermissions(channel) & ConnectionMask) !== ConnectionMask) {
        logger.info(`attempted to join vc but we are denied from joining (general channel perms), setting 250ms timeout before attempting to rejoin`);
        return false;
    }

    if(
        channel.permissionOverwrites_
        && channel.permissionOverwrites_[UserStore.getCurrentUser().id]
        // && (channel.permissionOverwrites_[UserStore.getCurrentUser().id]?.deny & ConnectionMask) !== 0n
        && (channel.permissionOverwrites_[UserStore.getCurrentUser().id]?.deny & ConnectionMask) !== ConnectionMask
    ) {
        logger.info(`attempted to join vc but we are denied from joining (channel overwrite), setting 250ms timeout before attempting to rejoin`);
        return false;
    }

    const amount = Object.keys(VSs).length;
    if(channel.userLimit_ !== 0 && amount >= channel.userLimit_) {
        logger.info(`attempted to join vc but it was full (${ amount } >= ${ channel.userLimit_ })`);
        return false;
    }

    return true;
}

// I don't care!
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export function joinCall(voiceState: UserVoiceState | undefined, hasSaidWaiting: boolean = false): NodeJS.Timer | void {
    // if no voice state, then userId is forced
    if(!voiceState) {
        return;
    }

    if(!followingPeople.has(voiceState.userId)) return;
    if(VoiceStateStore.isInChannel(voiceState.channelId!)) return;

    const channel = ChannelStore.getChannel(voiceState.channelId!);
    if(AVCStalker.settings.voiceChatFollowing.ignoreAFKChannels) {
        const afkChannelId = GuildStore.getGuild(channel.guild_id)?.afkChannelId;
        if(afkChannelId === voiceState.channelId) return;
    }

    if(!canJoinCall(channel)) {
        if(!hasSaidWaiting) BdApi.UI.showToast(`Waiting to join ${ UserStore.getUser(voiceState.userId).globalName } in ${ channel.name }`, { type: 'info' });
        return setTimeout(() => joinCall(VoiceStateStore.getVoiceStateForUser(voiceState.userId), true));
    }

    const msg = `Joining ${ UserStore.getUser(voiceState.userId).globalName } in #${ channel.name }`;

    logger.info(msg);
    BdApi.UI.showToast(msg);

    voiceChannelUtils.selectVoiceChannel(voiceState.channelId!);
}