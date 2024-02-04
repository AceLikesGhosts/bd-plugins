import type { MultipleUserAssociatedVoiceStateThatsTimestamped } from '../util';
import { userVoiceStateLog } from '.';
import { VOICE_LOG_FILE } from '..';
import { readFileSync } from 'fs';

/**
 * Gets all possible data from the local cache and the disk.
 */
export function get(id: string): MultipleUserAssociatedVoiceStateThatsTimestamped[] | null {
    return [
        ...getFromCache(id) ?? [],
        ...getFromDisk(id) ?? []
    ];
}

export function getFromCache(id: string): MultipleUserAssociatedVoiceStateThatsTimestamped[] | null {
    return userVoiceStateLog.get(id) ?? null;
}

/**
 * @warn THIS IS EXPENSIVE!!
 * 
 * Reads the VOICE_LOG_FILE, parses it to JSON, and returns the user's voice states from within it.
 * @returns null or an array of `MultipleUserAssociatedVoiceStateThatsTimestamped`
 * @see {MultipleUserAssociatedVoiceStateThatsTimestamped}
 */
export function getFromDisk(id: string): MultipleUserAssociatedVoiceStateThatsTimestamped[] | null {
    return (
        JSON.parse(
            readFileSync(VOICE_LOG_FILE, { encoding: 'utf-8' })
        ) as Record<string, MultipleUserAssociatedVoiceStateThatsTimestamped[]>)[id] ?? null;
}