import type { UserVoiceState } from '@lib/stores/VoiceStateStore';
import { followFromVoiceState, followingPeople } from './Following';
import { shouldLog } from './Logging';
import { append } from '../data';
import AVCStalker, { logger } from '..';
import ChannelStore from '@lib/stores/ChannelStore';
import GuildStore from '@lib/stores/GuildStore';

export function getVoiceStateDifferenceMessage(newest: UserVoiceState, old: UserVoiceState): React.ReactNode {
    if(newest.channelId !== old.channelId || newest.channelId === null) {
        if(!newest.channelId && !newest.oldChannelId) {
            logger.critical('Newest had no past nor current, wtf?', newest);
            return 'left channel (unknown)';
        }
        const channel = ChannelStore.getChannel(newest.channelId ?? newest.oldChannelId!);
        const guild = GuildStore.getGuild(channel.guild_id);
        if(newest.channelId === null) return `left ${ channel.name } in ${ guild?.name ?? 'unknown' }`;
        return `moved to ${ channel.name } in ${ guild?.name ?? 'unknown' }`;
    }

    if(newest.selfMute !== old.selfMute) return newest.selfMute ? 'muted' : 'unmuted';
    if(newest.selfDeaf !== old.selfDeaf) return newest.selfDeaf ? 'deafened' : 'undeafened';
    if(newest.selfStream !== old.selfStream) return newest.selfStream ? 'started streaming' : 'stopped streaming';
    if(newest.selfVideo !== old.selfVideo) return newest.selfVideo ? 'started video' : 'stopped video';
    if(newest.deaf !== old.deaf) return newest.deaf ? 'got server deafened' : 'got unserver deafened';
    if(newest.mute !== old.mute) return newest.mute ? 'got server muted' : 'got unserver muted';

    return 'unknown? (most likely platform swap)';
}

export default function onVoiceChange(voiceState: { type: 'VOICE_STATE_UPDATES'; voiceStates: UserVoiceState[]; }): void {
    if(voiceState.type !== 'VOICE_STATE_UPDATES') return;

    for(let i = 0; i < voiceState.voiceStates.length; i++) {
        const vs = voiceState.voiceStates[i];

        if(followingPeople.has(vs.userId)) followFromVoiceState(vs);

        if(AVCStalker.settings.vcLogging.enabled) {
            const [userId, ok] = shouldLog(vs);
            logger.debug(`checking if its ok to log for vs`, vs, userId, ok);
            logger.debug(`ok?: `, ok);
            if(ok)
                append({
                    ...vs,
                    when: Date.now()
                }, userId);
        }
    }
}