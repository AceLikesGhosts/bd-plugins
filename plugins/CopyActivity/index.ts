import type { Cancel, Plugin } from 'betterdiscord';
import { ActivityType, type Activity } from '@lib/modules/UserActivity';
import type { User } from '@lib/stores/UserStore';
import Logger from '@lib/logger';
import config from './config.json';
import PatchUserContext from './PatchContext';
import Dispatcher from '@lib/modules/Dispatcher';
import { applyActivity } from './util';
import VeryImportantStuff from '@lib/index';

export const logger = new Logger(config);
export const activelyStealActivitiesFrom = new Set<string>();

function handlePresenceUpdate(e: { type: 'PRESENCE_UPDATES', updates: { activities: Activity[]; user: User; }[]; }) {
    if(e.type !== 'PRESENCE_UPDATES') return;

    for(let i: number = 0; i < e.updates.length; i++) {
        const update = e.updates[i];

        if(!activelyStealActivitiesFrom.has(update.user.id)) continue;
        update.activities.forEach((activity) => {
            if( (activity.type === ActivityType.Listening && activity.name === 'Spotify') || activity.name === 'Custom Status') return;
            logger.log(`Stealing activity from ${ update.user.username } (${ update.user.id })`, activity);
            void applyActivity(activity);
        });
    }
}

export default class CopyActivity implements Plugin {
    private cancel: Cancel | null = null;

    start(): void {
        new VeryImportantStuff(config);
        logger.log('started');

        logger.log('patched user context');
        this.cancel = PatchUserContext();

        Dispatcher.subscribe('PRESENCE_UPDATES', handlePresenceUpdate);
    }

    stop(): void {
        logger.log('stopped');

        logger.log('unsubscribed from PRESENCE_UPDATES');
        Dispatcher.unsubscribe('PRESENCE_UPDATES', handlePresenceUpdate);

        logger.log('cleared constant stealing ids');
        activelyStealActivitiesFrom.clear();

        logger.log('unpatched user context');
        this.cancel!();
    }
}