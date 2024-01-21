import { React } from '@lib/components';

import type { Activity } from '@lib/modules/UserActivity';
import UserActivities from './UserActivities';
import Flex from '@lib/components/Flex';
import Button from '@lib/components/Button';
import Select from '@lib/components/Select';
import Scroller from '@lib/components/Scroller';
import CustomRPC, { RPC_DEFAULT } from '../../index';

import ActivityStore from '@lib/stores/ActivityStore';
import StoreUtils from '@lib/stores/StoreUtils';
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

    function shallowEquals<T>(a: T, b: T): boolean {
        for(const key in a) {
            if(typeof a[key] === 'object' || typeof b[key] === 'object') 
                continue;

            if(a[key] !== b[key]) {
                return false;
            }
        }

        return true;
    }

    const removeActivity = (spot: number) => {
        setRPCs((r_rpcs) => {
            return r_rpcs.filter((_, i) => {
                return i !== spot;
            });
        });
    };

    const activities = useStateFromStores<Activity>([ActivityStore], () => ActivityStore.getActivities());
    const isRPCActive = (): boolean => {
        const rpc = rpcs[selectedRPC];
        return activities.some((r_rpc) => {
            return shallowEquals(rpc, r_rpc);
        });
    };

    return (
        <div>
            <Flex align={Flex.Align.START} direction={Flex.Direction.HORIZONTAL}>
                <Select
                    // className={selectControl}
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
                    className='bd-rpc-single-select'
                    serialize={((v) => (v as any).toString && (v as any).toString())}
                />

                <Button
                    style={{ marginRight: '5px' }}
                    size={Button.Sizes.MEDIUM}
                    onClick={(() => {
                        if(selectedRPC === -1) {
                            return;
                        }

                        if(isRPCActive()) {
                            void CustomRPC.setRPC(void 0);
                            return;
                        }

                        void CustomRPC.setRPC(rpcs[selectedRPC]);
                    })}
                >
                    {selectedRPC !== -1 && isRPCActive() ? 'Remove' : 'Set'}
                </Button>

                <Button
                    color={Button.Colors.RED}
                    style={{ marginRight: '5px' }}
                    size={Button.Sizes.MEDIUM}
                    onClick={(() => {
                        if(selectedRPC === -1) {
                            return;
                        }

                        removeActivity(selectedRPC);
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