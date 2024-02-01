import { React } from '@lib/components/index';
import AUserVoiceLocation, { DefaultSettings } from '..';
import { FormSwitch } from '@lib/components/Form';
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
    const [clickVoiceChatButtonClears, setClickVoiceChatButtonClears] = React.useState(AUserVoiceLocation.settings.voiceChatFollowing.clickVoiceChatButtonClears ?? DefaultSettings.voiceChatFollowing.clickVoiceChatButtonClears);
    const [userPopout, setUserPopout] = React.useState<boolean>(AUserVoiceLocation.settings.userPopout ?? DefaultSettings.userPopout);

    React.useEffect(() => {
        AUserVoiceLocation.settings = {
            voiceChatFollowing: {
                clickVoiceChatButtonClears
            },
            userPopout: userPopout
        };
    }, [clickVoiceChatButtonClears, userPopout]);

    return (
        <div>
            <FormSwitch
                value={clickVoiceChatButtonClears}
                onChange={((e) => setClickVoiceChatButtonClears(e))}
                note={'Should clicking the following button clear the following list? Setting made for Ollie.'}
            >
                Following Button Clearing
            </FormSwitch>

            <FormSwitch
                note={'Should we show what voice channels someone is in on their user popout?'}
                value={userPopout}
                onChange={((e) => setUserPopout(e))}
            >
                User Popout
            </FormSwitch>

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