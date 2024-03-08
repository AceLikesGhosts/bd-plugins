import VoiceStateStore from '@lib/stores/VoiceStateStore';
import UserStore from '@lib/stores/UserStore';
import { logger } from '.';
import { type Channel } from '@lib/stores/ChannelStore';
import type { UserVoiceState } from '@lib/stores/VoiceStateStore';
import { followingPeople } from './voiceState/Following';

// TODO: de-hardcode this bitfield and pull it from Webpack, but for now
// this isn't going to change, and if it does they are going to notify on their
// proper documentation page as this is a supported bitfield from
// https://discord.dev/
export const ConnectionBit = 0x100000n;

const voiceChannelUtils = BdApi.Webpack.getByKeys('selectVoiceChannel', 'disconnect') as {
    selectVoiceChannel: (channelId: string) => void;
    disconnect(): void;
};

// I don't care!
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export function joinCall(voiceState: UserVoiceState, channel: Channel, hasSaidWaiting: boolean = false): NodeJS.Timeout | void {
    if(!followingPeople.has(voiceState.userId)) return;
    if(VoiceStateStore.isInChannel(channel.id)) return;

    const VSs = VoiceStateStore.getVoiceStatesForChannel(voiceState.channelId!) as Record<string, UserVoiceState>;
    if(!VSs) return;

    if(
        channel.permissionOverwrites_
        && channel.permissionOverwrites_[UserStore.getCurrentUser().id]
        && channel.permissionOverwrites_[UserStore.getCurrentUser().id]?.deny & ConnectionBit
    ) {
        logger.info(`attempted to join vc but we are denied from joining, setting 250ms timeout before attempting to rejoin`);
        if(!hasSaidWaiting) BdApi.UI.showToast(`Waiting to join ${ UserStore.getUser(voiceState.userId).globalName } in ${ channel.name }`, { type: 'info' });
        return setTimeout(() => joinCall(voiceState, channel, true), 250);
    }

    const people = Object.keys(VSs).length;

    if(channel.userLimit_ !== 0 && people >= channel.userLimit_) {
        logger.info(`attempted to join ${ channel.name } but it was full (${ people } >= ${ channel.userLimit_ }). setting 250ms timeout before attempting to rejoin`);
        if(!hasSaidWaiting) BdApi.UI.showToast(`Waiting to join ${ UserStore.getUser(voiceState.userId).globalName } in ${ channel.name }`, { type: 'info' });
        return setTimeout(() => joinCall(voiceState, channel, true), 250);
    }

    const msg = `Joining ${ UserStore.getUser(voiceState.userId).globalName } in #${ channel.name }`;

    logger.info(msg);
    BdApi.UI.showToast(msg);

    voiceChannelUtils.selectVoiceChannel(voiceState.channelId!);
}