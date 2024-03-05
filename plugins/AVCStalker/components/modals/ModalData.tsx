import { React } from '@lib/components';
import ModalRepVoiceState from './ModalRepVoiceState';
import { get } from 'plugins/AVCStalker/data';
import { FormText } from '@lib/components/Form';
import type { TimestampedUserVoiceState } from 'plugins/AVCStalker/data';
import type { UserIdProps } from '..';

export type StateData = { newestState: TimestampedUserVoiceState, lastState: TimestampedUserVoiceState; };

export default function ModalData(props: UserIdProps & { showCorrelated: boolean; }): JSX.Element {
    const [data, setData] = React.useState<StateData[]>(getData());

    React.useEffect(() => {
        // 10/10 code
        setData(getData());
    }, [props.userIds, props.showCorrelated]);

    function getData(): StateData[] {
        const output: StateData[] = [];

        for(let i: number = 0; i < props.userIds.length; i++) {
            const data = get(props.userIds[i]);
            const userStates: StateData[] = [];

            let prevState = null;
            for(let j: number = 0; j < data.length; j++) {
                const newState = data[j];
                if(!props.showCorrelated && !props.userIds.includes(newState.userId)) continue;

                if(prevState)
                    userStates.push({ newestState: newState, lastState: prevState });

                prevState = newState;
            }

            output.push(...userStates);
        }

        output.sort((x, y) => y.newestState.when - x.newestState.when);
        return output;
    }

    return (
        <div style={{ marginTop: '10px', overflowY: 'scroll', overflowX: 'hidden' }}>
            {!!data.length ?
                data.map((states) =>
                    <ModalRepVoiceState
                        newestState={states.newestState}
                        lastState={states.lastState}
                    />
                ) : <FormText style={{ marginLeft: '16px' }} type='h1'>No data to display...</FormText>
            }
        </div>
    );
}