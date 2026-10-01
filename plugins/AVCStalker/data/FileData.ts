import fs from 'fs';
import { memoryCache, type TimestampedUserVoiceState } from '.';
import AVCStalker, { logger } from '..';
import path from 'path';

function readLogFile(): Record<string, TimestampedUserVoiceState[] | undefined> {
    const filePath = AVCStalker.settings.vcLogging.filePath.replace('%plugins%', BdApi.Plugins.folder).replace('/', path.sep);

    try {
        const fileExists = fs.existsSync(filePath);
        if(!fileExists) return {};

        return JSON.parse(
            fs.readFileSync(filePath, { encoding: 'utf-8' })
        );
    }
    catch(err) {
        logger.critical(`Failed to read the file cache for VoiceStateLogs: `, err);
        return {};
    }
}

/**
 * Reads data from the disc, and returns it, then discards anything nonrelevant for the GC to manage. 
 * This will be expensive if there is a lot of data.
 * @warning EXPENSIVE OPERATION!
 */
export function get(relevantId: string): TimestampedUserVoiceState[] | undefined {
    try {
        return readLogFile()[relevantId];
    }
    catch(err) {
        logger.critical(`Failed to read file cache for VoiceStateLogs: `, err);
        return undefined;
    }
}

export function del(relevantId: string): void {
    const filePath = AVCStalker.settings.vcLogging.filePath.replace('%plugins%', BdApi.Plugins.folder);

    try {
        const data = readLogFile();
        data[relevantId] = [];
        fs.writeFileSync(filePath, JSON.stringify(data), { encoding: 'utf-8' });
    }
    catch(err) {
        logger.critical(`Failed to delete log data (VoiceStateLogs) `, err, relevantId);
        return undefined;
    }
}

export function save(): void {
    try {
        const filePath = AVCStalker.settings.vcLogging.filePath.replace('%plugins%', BdApi.Plugins.folder).replace('/', path.sep);
        const data = readLogFile();

        memoryCache.forEach((value) => {
            const userId = value[0].userId;
            if(!userId) throw new Error(`Failed to save VCStalker log data, unable to find userId on first element of memory cache ${ value[0] } ${ value }`);

            data[userId] = [
                ...data[userId] ?? [],
                ...value
            ];
        });

        memoryCache.clear();

        fs.writeFileSync(filePath, JSON.stringify(data), { encoding: 'utf-8' });
        logger.info(`wrote out VCStalker log data`, data, filePath);
    }
    catch(err) {
        logger.critical(`FAILED TO SAVE DATA??`, err);
        return;
    }
}