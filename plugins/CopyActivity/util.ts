import Dispatcher from '@lib/modules/Dispatcher';
import type { Activity } from '@lib/modules/UserActivity';

export function applyActivity(activity: Activity): void {
    void Dispatcher.dispatch({
        type: 'LOCAL_ACTIVITY_UPDATE',
        activity: {
            ...activity
        },
        socketId: 'crpc'.concat(btoa(JSON.stringify(activity)).substr(0, 20))
    });
}

export function removeActivity(activity: Activity): void {
    void Dispatcher.dispatch({
        type: 'LOCAL_ACTIVITY_UPDATE',
        activity: {},
        socketId: 'crpc'.concat(btoa(JSON.stringify(activity)).substr(0, 20))
    });
}