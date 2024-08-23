import type { Cancel } from 'betterdiscord';
import type { User } from '@lib/stores/UserStore';
import { React } from '@lib/components';
import UserStore from '@lib/stores/UserStore';
import { activelyStealActivitiesFrom, logger } from '.';
import useStateFromStore from '@lib/stores/StoreUtils';
import PresenceStore from '@lib/stores/PresenceStore';
const { Item } = BdApi.ContextMenu;
import { ActivityType, type Activity } from '@lib/modules/UserActivity';
import Lodash from '@lib/common/Lodash';
import { applyActivity, removeActivity } from './util';
// import CopyItems from './CopyItems';

export default function PatchUserContext(): Cancel {
    logger.log('Patched UserContext');

    return BdApi.ContextMenu.patch('user-context', (res: React.ReactElement, props: { user: User; }) => {
        const activities = useStateFromStore<Activity>([PresenceStore], () => PresenceStore.getActivities(props.user.id));

        if(props.user.id === UserStore.getCurrentUser().id) {
            res.props.children.push(
                <Item label='Activity Utilities' id={`local-copy-activity-${ props.user.id }`}>
                    <Item
                        label='Presences'
                        id={`select-presence-${ props.user.id }`}
                        disabled={Boolean(activities.length === 0)}
                    >
                        {!!activities.length &&
                            <>
                                <Item label='Click to remove...' id={`second-very-cool-label-name-${ props.user.id }`} />
                                <BdApi.ContextMenu.Separator />
                                {activities.map((activity, i) => (
                                    activity.name !== 'Custom Status' && <Item
                                        key={String(i)}
                                        id={`activity-stealing-${ String(i) }`}
                                        label={`${ Lodash.findKey(ActivityType, v => v === activity.type) } ${ activity.name }`}
                                        action={(() => {
                                            logger.log(`Removing activity ${ activity.name }`, i, activity);
                                            void removeActivity(activity);
                                        })}
                                    />
                                ))}
                            </>
                        }
                    </Item>

                    <Item
                        label='Monitor Stealing'
                        id={`monitor-stealing-presences-${ props.user.id }`}
                        disabled={Boolean(activelyStealActivitiesFrom.size === 0)}
                    >
                        {!!activelyStealActivitiesFrom.size && <>
                            <Item label='Click to remove...' id={`very-cool-label-name-${ props.user.id }`} />
                            <BdApi.ContextMenu.Separator />
                            {[...activelyStealActivitiesFrom].map((id) => <Item
                                label={`${ UserStore.getUser(id).username } (${ id })`}
                                id={`stop-stealing-actiivties-${id}`}
                                action={(() => {
                                    logger.log(`Stopping monitor stealing of ${ props.user.id }'s activities (context click)`);
                                    activelyStealActivitiesFrom.delete(id);
                                })}
                            />)}
                        </>}
                    </Item>
                </Item>
            );
            return;
        }


        res.props.children.push(
            <Item label='Activity Utilities' id={`copy-activity-${ props.user.id }`}>
                <Item
                    label='Presences'
                    id={`select-presence-${ props.user.id }`}
                >
                    {activities.map((activity, i) => (
                        activity.name !== 'Custom Status' && <Item
                            key={String(i)}
                            id={`activity-stealing-${ String(i) }`}
                            disabled={activity.type === ActivityType.Listening && activity.name === 'Spotify'}
                            label={`${ Lodash.findKey(ActivityType, v => v === activity.type) } ${ activity.name }`}
                            action={(() => {
                                logger.log(`Applying activity ${ activity.name }`, i, activity);
                                void applyActivity(activity);
                            })}
                        />
                    ))}
                </Item>

                <Item
                    label='Take All Activities' id={`take-activities-${ props.user.id }`}
                    action={(() => {
                        logger.log(`Taking ${ props.user.id }'s activities (context click)`);
                        const activities = PresenceStore.getActivities(props.user.id);

                        if(activities === null) {
                            logger.log(`No activities to steal from ${ props.user.id }`);
                            return;
                        }

                        for(let i: number = 0; i < activities.length; i++) {
                            const activity = activities[i];
                            if(activity.type === ActivityType.Listening && activity.name === 'Spotify') continue;
                            void applyActivity(activity);
                        }
                    })}
                />

                {activelyStealActivitiesFrom.has(props.user.id) ?
                    <Item
                        label='Stop Stealing Activities (monitoring)'
                        id={`stop-stealing-activities-${ props.user.id }`}
                        action={(() => {
                            logger.log(`Stopping monitor stealing of ${ props.user.id }'s activities (context click)`);
                            activelyStealActivitiesFrom.delete(props.user.id);
                        })}
                    />
                    : <Item
                        label='Steal Activities (monitoring)' id={`steal-activities-${ props.user.id }`}
                        action={(() => {
                            logger.log(`Monitor stealing ${ props.user.id }'s activities (context click)`);
                            activelyStealActivitiesFrom.add(props.user.id);
                        })}
                    />}
            </Item>
        );
    });
}