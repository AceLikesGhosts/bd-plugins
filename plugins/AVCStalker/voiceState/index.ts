import type { UserVoiceState } from '@lib/stores/VoiceStateStore';
import { followFromVoiceState, followingPeople } from './Following';
import { shouldLog } from './Logging';
import { append } from '../data';
import AVCStalker, { logger } from '..';

export default function onVoiceChange(voiceState: { type: 'VOICE_STATE_UPDATES'; voiceStates: UserVoiceState[]; }): void {
    if(voiceState.type !== 'VOICE_STATE_UPDATES') return;

    for(let i = 0; i < voiceState.voiceStates.length; i++) {
        const vs = voiceState.voiceStates[i];

        if(followingPeople.has(vs.userId)) followFromVoiceState(vs);

        if(AVCStalker.settings.vcLogging.enabled) {
            const [userId, ok] = shouldLog(vs);
            logger.info(`checking if its ok to log for vs`, vs, userId, ok);
            logger.info(`ok?: `, ok);
            if(ok)
                append({
                    ...vs,
                    when: Date.now()
                }, userId);
        }
    }
}