import { React } from '@lib/components/index';
// import type { TextInputProps } from '@lib/components/TextInput';
// import type { FormItemProps } from '@lib/components/Form';
// import RawTextInput from '@lib/components/TextInput';
// import { FormItem, FormSwitch } from '@lib/components/Form';
// import { Margins } from '@lib/components';
// import AUserVoiceLocation from '..';
// import _ from '@lib/common/Lodash';

// function TextInput(props: TextInputProps & FormItemProps) {
//     return (
//         <FormItem
//             style={{
//                 width: '50%'
//             }}
//             className={Margins.marginBottom20}
//             {...props}
//         >
//             <RawTextInput
//                 {...props}
//             />
//         </FormItem>
//     );
// }

export default function Settings(): JSX.Element {
    // const [maxLogFileSize, setMaxLogFileSize] = React.useState<number>(AUserVoiceLocation.settings.maxLogFileSize);
    // const [shouldLogFriends, setShouldLogFriends] = React.useState<boolean>(AUserVoiceLocation.settings.whoToLog.friends);
    // const [shouldLogRandoms, setShouldLogRandoms] = React.useState<boolean>(AUserVoiceLocation.settings.whoToLog.randoms);
    // const [purgeWhen, setPurgeWhen] = React.useState<number>(AUserVoiceLocation.settings.purgeWhen);
    // const [shouldPurge, setShouldPurge] = React.useState<boolean>(AUserVoiceLocation.settings.shouldPurge);

    // React.useEffect(() => {
    //     AUserVoiceLocation.settings = {
    //         maxLogFileSize,
    //         whoToLog: {
    //             friends: shouldLogFriends,
    //             randoms: shouldLogRandoms
    //         },
    //         purgeWhen,
    //         shouldPurge
    //     };
    // }, [maxLogFileSize, shouldLogFriends, shouldLogRandoms, shouldPurge, purgeWhen]);

    return (
        <div>
            <h1>There is nothing here at this time.</h1>
            {/* <TextInput
                title={'Log File Max Size (MB)'}
                value={maxLogFileSize.toString()}
                onChange={((e) => {
                    if(!_.isNumber(e)) return;
                    setMaxLogFileSize(e);
                })}
            />
            <FormSwitch 
                note={'Attempts to find friends within channels and logs the entire channel state (THIS IS RESOURCE INTENSIVE)'}
                value={shouldLogFriends}
                onChange={((e) => setShouldLogFriends(e))}
            >
                Log Friends
            </FormSwitch>
            <FormSwitch 
                note={'Logs any event that occurs, without scanning the rest'}
                value={shouldLogRandoms}
                onChange={((e) => setShouldLogRandoms(e))}
            >
                Log Randoms
            </FormSwitch>
            <FormSwitch
                note={'Should we purge the history?'}
                value={shouldPurge}
                onChange={((e) => setShouldPurge(e))}
            >
                Purge History
            </FormSwitch>
            <TextInput
                title={'How often should we purge the history in days?'}
                value={purgeWhen.toString()}
                disabled={!shouldPurge}
                onChange={((e) => {
                    if(!_.isNumber(e)) return;
                    setPurgeWhen(e);
                })}
            /> */}
        </div>
    );
}