import { Margins, React } from '@lib/components';
import { FormItemProps, FormItem } from '@lib/components/Form';
import RawTextInput, { TextInputProps } from '@lib/components/TextInput';
import ADifferentSearch, { meta } from '.';

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
    const [searchEngineName, setSearchEngineName] = React.useState(ADifferentSearch.settings.searchEngineName);
    const [searchEngineURL, setSearchEngineURL] = React.useState(ADifferentSearch.settings.searchEngineURL);

    React.useEffect(() => {
        ADifferentSearch.settings = {
            searchEngineName: searchEngineName,
            searchEngineURL: searchEngineURL
        };

        BdApi.Data.save(meta.name, 'settings', ADifferentSearch.settings);
    }, [
        searchEngineName,
        searchEngineURL
    ]);

    return (
        <div>
            <TextInput
                title={'Search Engine Name'}
                value={searchEngineName}
                onChange={((e) => {
                    setSearchEngineName(e);
                })}
            />

            <TextInput
                title={'Search Engine URL'}
                value={searchEngineURL}
                onChange={((e) => {
                    setSearchEngineURL(e);
                })}
            />
        </div>
    );
}