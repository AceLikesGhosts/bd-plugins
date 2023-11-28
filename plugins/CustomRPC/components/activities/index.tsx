import { React } from '@lib/components';

import type { Activity } from '@lib/modules/UserActivity';
import UserActivities from './UserActivities';
import Flex from '@lib/components/Flex';
import Button from '@lib/components/Button';
import Select, { selectControl } from '@lib/components/Select';
import Scroller from '@lib/components/Scroller';
import CustomRPC, { RPC_DEFAULT } from '../../index';

import LoDash from '@lib/common/Lodash';
import Dispatcher from '@lib/modules/Dispatcher';
import ActivityStore from '@lib/modules/ActivityStore';
import StoreUtils from '@lib/modules/StoreUtils';
const { useStateFromStores } = StoreUtils;

interface ActivityProps {
    setEditingRpc: (id: number) => void;
    rpcs: Activity[];
    setRPCs: React.Dispatch<React.SetStateAction<Activity[]>>;
}

export default function ({ rpcs, setEditingRpc, setRPCs }: ActivityProps): JSX.Element {
    const [selectedRPC, setSelectedRPC] = React.useState<number>(CustomRPC.selRPC);

    React.useEffect(() => {
        CustomRPC.selRPC = selectedRPC;
    }, [selectedRPC]);

    const appendRPC = (rpc: Activity) => {
        setRPCs((r_rpcs) => {
            return [...r_rpcs, rpc];
        });
    };

    const removeActivity = (rpc: Activity) => {
        setRPCs((r_rpcs) => {
            return r_rpcs.filter((v) => !LoDash.isEqual(v, rpc));
        });
    };

    const activities = useStateFromStores([ActivityStore], () => ActivityStore.getActivities());

    return (
        <div>
            <Flex align={Flex.Align.START} direction={Flex.Direction.HORIZONTAL}>
                <Select
                    className={selectControl}
                    options={rpcs?.map((v, i) => {
                        return {
                            label: v.name,
                            value: i
                        };
                    })}
                    onChange={((i) => {
                        console.log('changed radio to', i);
                        setSelectedRPC(i as number);
                    })}
                    value={selectedRPC ?? void 0}
                    serialize={((v) => (v as any).toString && (v as any).toString())}
                />

                <Button
                    style={{ marginRight: '5px' }}
                    size={Button.Sizes.MEDIUM}
                    onClick={(() => {
                        if(activities.includes(rpcs[selectedRPC])) {
                            Dispatcher.dispatch({
                                type: 'LOCAL_ACTIVITY_UPDATE',
                                activity: {},
                                socketId: 'oh-my-god-bd-plugin',
                                pid: 6969
                            });

                            return;
                        }

                        Dispatcher.dispatch({
                            type: 'LOCAL_ACTIVITY_UPDATE',
                            activity: rpcs[selectedRPC as keyof typeof rpcs],
                            socketId: 'oh-my-god-bd-plugin',
                            pid: 6969
                        });
                    })}
                >
                    {activities.includes(rpcs[selectedRPC]) ? 'Remove' : 'Set'}
                </Button>

                <Button
                    color={Button.Colors.RED}
                    style={{ marginRight: '5px' }}
                    size={Button.Sizes.MEDIUM}
                    onClick={(() => {
                        removeActivity(rpcs[selectedRPC as number]);
                        setSelectedRPC(-1);
                    })}
                >
                    Delete
                </Button>

                <Button
                    size={Button.Sizes.MEDIUM}
                    onClick={(() => {
                        console.log('made new profile (default)', RPC_DEFAULT);
                        appendRPC(RPC_DEFAULT);
                        setSelectedRPC(rpcs.length);
                    })}
                >
                    New
                </Button>
            </Flex>

            <Scroller>
                <UserActivities
                    setEditingRpc={setEditingRpc}
                    activityList={rpcs}
                />
            </Scroller>
        </div>
    );
}