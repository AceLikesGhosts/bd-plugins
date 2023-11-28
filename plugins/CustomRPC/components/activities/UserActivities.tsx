// https://github.com/E-boi/replugged-plugins/blob/main/plugins/customrpc/components/UserActivities.tsx
// Totally legally taken code
import { React } from '@lib/components';
// import StoreUtil from '@lib/modules/StoreUtils';
// import ActivityStore from '@lib/modules/ActivityStore';
import type { Activity } from '@lib/modules/UserActivity';
import UserActivity from '@lib/modules/UserActivity';
import UserStore from '@lib/modules/UserStore';
// const { useStateFromStores } = StoreUtil;
import Button from '@lib/components/Button';
import Flex from '@lib/components/Flex';

const classes = BdApi.Webpack.getByKeys('profileColors') as { profileColors?: string; };
export default function UserActivities({
    setEditingRpc,
    activityList: activities
}: {
    setEditingRpc: (id: number) => void;
    activityList: Activity[];
}): JSX.Element | null {
    // if(!useStateFromStores || !ActivityStore)
    // return <h1>Failed to find useStateFromStores or ActivityStore</h1>;

    // let activities = useStateFromStores([ActivityStore], () => ActivityStore.getActivities()) as Activity[];
    // activities = activities.filter((a) => activityList.includes(a));

    return (
        <div className={`${ classes?.profileColors } bd-rpc-activities`}>
            {activities?.map((a, i) => UserActivity && (a.type as number) !== 4 && (
                <Flex style={{ width: '100%' }} >
                    <UserActivity
                        activity={a}
                        className='bd-rpc-activity'
                        source='Profile Modal'
                        type='ProfileV2'
                        useStoreStream={false}
                        user={UserStore?.getCurrentUser()}
                    />
                    <Flex style={{ marginRight: 5 }} justify={Flex.Justify.END} align={Flex.Align.CENTER}>
                        <Button
                            onClick={() => {
                                setEditingRpc(i);
                            }}
                        >
                            Edit
                        </Button>
                    </Flex>
                </Flex>
            ))}
        </div>
    );
}