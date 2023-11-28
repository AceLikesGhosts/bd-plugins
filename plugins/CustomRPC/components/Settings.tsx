import type CustomRPC from '..';

import { React } from '@lib/components';
import RPCEditor from './editor/RPCEditor';
import Activities from './activities';
import type { Activity } from '@lib/modules/UserActivity';

export default function Settings(this: Omit<CustomRPC, 'getSettingsPanel'>): JSX.Element {
    const [showRPC, setShowRPC] = React.useState<boolean>(false);
    const [editingRPC, setEditingRPC] = React.useState<number>(-1);
    const [rpcs, setRPCs] = React.useState<Activity[]>(this.rpcs!);

    console.log(`Settings.tsx:`, rpcs);
    React.useEffect(() => {
        if(editingRPC === -1) setShowRPC(false);
        else setShowRPC(true);
    }), [editingRPC];

    React.useEffect(() => {
        this.rpcs = rpcs;
    }, [rpcs]);

    const saveRPC = (rpc: Activity) => {
        setRPCs((r_rpc) => {
            r_rpc[editingRPC] = rpc;
            return r_rpc;
        });
    };

    return (
        <div style={{ color: '#fff' }}>
            {showRPC === true ?
                <RPCEditor
                    save={saveRPC}
                    back={(() => { setEditingRPC(-1); })}
                    activity={rpcs![editingRPC!]}
                /> :
                <Activities
                    rpcs={rpcs}
                    setRPCs={setRPCs}
                    setEditingRpc={setEditingRPC}
                />
            }
        </div>
    );
}
