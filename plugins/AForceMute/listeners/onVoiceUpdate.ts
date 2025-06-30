import { UserVoiceState } from '@lib/stores/VoiceStateStore';
import { forceDeafenCache, forceDisconnectCache, forceMuteCache, forceUndeafenCache, forceUnmuteCache, logger } from '..';
import PermissionStore, { Permissions } from '@lib/stores/PermissionStore';
import UserUpdates from '@lib/stores/UserUpdates';
import ChannelStore from '@lib/stores/ChannelStore';

export default function onVoiceStateUpdate(event: { type: 'VOICE_STATE_UPDATES'; voiceStates: UserVoiceState[]; }) {
    if(event.type !== 'VOICE_STATE_UPDATES') return;

    for(const voiceState of event.voiceStates) {
        if(
            !PermissionStore.canWithPartialContext(Permissions.VIEW_CHANNEL, { channelId: voiceState.channelId }) ||
            !PermissionStore.canWithPartialContext(Permissions.MUTE_MEMBERS, { channelId: voiceState.channelId })
        ) {
            logger.log('missing permissions, not automatically remuting - missing VIEW_CHANNEL or MUTE_MEMBERS');
            return;
        }

        if(!voiceState.channelId && !voiceState.oldChannelId) {
            logger.log('failed to find channel id in channelId and oldChannelId');
            return;
        }

        const channel = ChannelStore.getChannel(voiceState.channelId ?? voiceState.oldChannelId!);
        const isForceUnmuted = forceUnmuteCache[voiceState.userId];
        const isForceMuted = forceMuteCache[voiceState.userId];

        if(isForceMuted && isForceUnmuted) {
            logger.log(`${voiceState.userId} is force muted and unmuted`)
            return;
        }

        if(isForceMuted && !voiceState.mute) {
            UserUpdates.setServerMute(channel.guild_id, voiceState.userId, true);
        }

        if(isForceUnmuted && voiceState.mute) {
            UserUpdates.setServerMute(channel.guild_id, voiceState.userId, false);
        }

        const isForceDeafened = forceDeafenCache[voiceState.userId];
        const isForceUndeafened = forceUndeafenCache[voiceState.userId];

        if(isForceDeafened && isForceUndeafened) {
            logger.log(`${ voiceState.userId } is force deafened and undeafened`);
            return;
        }

        if(isForceDeafened && !voiceState.deaf) {
            UserUpdates.setServerDeaf(channel.guild_id, voiceState.userId, true);
        }

        if(isForceUndeafened && voiceState.deaf) {
            UserUpdates.setServerDeaf(channel.guild_id, voiceState.userId, false);
        }

        if(forceDisconnectCache[voiceState.userId] && voiceState.channelId) {
            logger.log(`disconnecting ${ voiceState.userId }`);
            UserUpdates.setChannel(channel.guild_id, voiceState.userId, null);
        }
    }
}