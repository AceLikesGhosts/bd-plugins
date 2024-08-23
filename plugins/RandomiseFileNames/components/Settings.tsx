import type { FormItemProps } from '@lib/components/Form';
import type { TextInputProps } from '@lib/components/TextInput';
import { Margins, React } from '@lib/components';
import { FormItem, FormSwitch } from '@lib/components/Form';
import RawTextInput from '@lib/components/TextInput';
import Lodash from '@lib/common/Lodash';
import RandomiseFileName, { DefaultSettings } from '..';

function TextInput(props: TextInputProps & FormItemProps) {
    return (
        <FormItem
            style={{
                width: '50%'
            }}
            className={Margins.marginBottom20}
            {...props}
        >
            <RawTextInput
                {...props}
            />
        </FormItem>
    );
}

export default function Settings(): React.ReactNode {
    const [letters, setLetters] = React.useState<boolean>(RandomiseFileName.settings.letters ?? DefaultSettings.letters);
    const [maxLetters, setMaxLetters] = React.useState<number>(RandomiseFileName.settings.maxLetters ?? DefaultSettings.maxLetters);

    const [timestamp, setTimestamp] = React.useState<boolean>(RandomiseFileName.settings.timestamp ?? DefaultSettings.timestamp);
    const [consistent, setConsistent] = React.useState<boolean>(RandomiseFileName.settings.consistent ?? DefaultSettings.consistent);
    const [consistentText, setConsistentText] = React.useState<string>(RandomiseFileName.settings.consistentText ?? DefaultSettings.consistentText);

    React.useEffect(() => {
        RandomiseFileName.settings = {
            letters,
            maxLetters,
            timestamp,
            consistent,
            consistentText
        };
    }, [letters, maxLetters, timestamp, consistent, consistentText]);

    return (
        <div>
            <FormSwitch
                value={letters}
                onChange={((e) => setLetters(e))}
                disabled={timestamp || consistent}
            >
                Random Letters
            </FormSwitch>

            <TextInput
                title={'Maximum Amount of Letters'}
                value={maxLetters?.toString()}
                disabled={!letters && (timestamp || consistent)}
                onChange={(e) => {
                    if(!Lodash.isNumber(e)) return;
                    setMaxLetters(e);
                }}
            />

            <FormSwitch
                value={timestamp}
                onChange={((e) => setTimestamp(e))}
                disabled={letters || consistent}
            >
                Timestamp
            </FormSwitch>


            <FormSwitch
                value={consistent}
                onChange={((e) => setConsistent(e))}
                disabled={letters || timestamp}
            >
                Consistent
            </FormSwitch>

            <TextInput
                title={'Consistent Text'}
                value={consistentText}
                disabled={!consistent && (timestamp || letters)}
                onChange={(e) => setConsistentText(e)}
            />
        </div>
    );
}