import { logger } from '..';
import { get as fileDataGet } from './FileData';
import type { UserVoiceState } from '@lib/stores/VoiceStateStore';

/**
 * Cache in memory of relevant user id to voice states.
 */
const memoryCache = new Map<string, TimestampedUserVoiceState[]>();

export interface TimestampedUserVoiceState extends UserVoiceState {
    /**
     * UTC timestamp.
     * @example
     * append({
     *  // voice state
     *  ...vs,
     *  when: Date.now() // the timestamp
     * })
     */
    when: number;
}

/**
 * Appends data to our log file.
 * @param tsVoiceState - The voice state we are appending to our logs
 * @param relevantId - The user who is relevant/who this log relates to.
 */
export function append(tsVoiceState: TimestampedUserVoiceState, relevantId?: string): void {
    if(!relevantId) {
        // TODO: remove this expansion
        relevantId = tsVoiceState.userId;
        logger.info(`changed relevantId to tsVoiceState`, tsVoiceState.userId);
    }

    logger.info(`updated voice state cache`);
    memoryCache.set(relevantId, [
        ...memoryCache.get(relevantId) ?? [],
        tsVoiceState
    ]);
}

/**
 * @warning Invokes `fileDataGet` which will read the log file.
 */
export function get(relevantId: string): TimestampedUserVoiceState[] {
    return [
        ...memoryCache.get(relevantId) ?? [],
        ...fileDataGet(relevantId) ?? []
    ];
}