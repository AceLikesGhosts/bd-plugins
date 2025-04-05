import { Margins, React } from '@lib/components';
import { FormItem, FormItemProps, FormTitle } from '@lib/components/Form';
import RawTextInput, { TextInputProps } from '@lib/components/TextInput';
import AQuickNote from '..';

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


export function Settings() {
    const [noteString, setNoteString] = React.useState(AQuickNote.settings.noteString);

    React.useEffect(() => {
        AQuickNote.settings = {
            noteString: noteString
        };
    }, [noteString]);

    return (
        <div>
            <FormTitle tag='h2'>
                Settings
            </FormTitle>

            <TextInput
                title={'The note to apply to users who don\'t have a note.'}
                value={noteString}
                onChange={((e) => setNoteString(e))}
            />
        </div>
    );
}