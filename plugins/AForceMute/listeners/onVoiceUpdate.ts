import { UserVoiceState } from '@lib/stores/VoiceStateStore';
import { forceMuteCache, logger } from '..';
import PermissionStore, { Permissions } from '@lib/stores/PermissionStore';
import UserUpdates from '@lib/stores/UserUpdates';
import ChannelStore from '@lib/stores/ChannelStore';

export default function onVoiceStateUpdate(event: { type: 'VOICE_STATE_UPDATES'; voiceStates: UserVoiceState[]; }) {
    if(event.type !== 'VOICE_STATE_UPDATES') return;

    for(const voiceState of event.voiceStates) {
        if(!forceMuteCache[voiceState.userId]) return;

        if(voiceState.mute) {
            logger.log(`${voiceState.userId} was already muted`)
            return;
        }

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

        logger.log(`remuting ${voiceState.userId}`)
        const channel = ChannelStore.getChannel(voiceState.channelId ?? voiceState.oldChannelId!);
        UserUpdates.setServerMute(channel.guild_id, voiceState.userId, true);
    }
}