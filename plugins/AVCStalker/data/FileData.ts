import fs from 'fs';
import type { TimestampedUserVoiceState } from '.';
import AVCStalker from '..';

/**
 * Reads data from the disc, and returns it, then discards anything nonrelevant for the GC to manage. 
 * This will be expensive if there is a lot of data.
 * @warning EXPENSIVE OPERATION!
 */
export function get(relevantId: string): TimestampedUserVoiceState[] | undefined {
    return JSON.parse(
        fs.readFileSync(AVCStalker.settings.vcLogging.filePath.replace('%plugins%', BdApi.Plugins.folder), { encoding: 'utf-8' })
    )[relevantId] ?? undefined;
}