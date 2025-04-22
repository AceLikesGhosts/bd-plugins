import { Margins, React } from '@lib/components';
import { FormItemProps, FormItem, FormText } from '@lib/components/Form';
import RawTextInput, { TextInputProps } from '@lib/components/TextInput';
import ADifferentSearch, { meta } from '.';
import { RadioItem } from '@lib/components/Radio';

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

// name: URL
const DefaultProvidedSearchEngines = {
    startpage: 'https://startpage.com/sp/search?query=',
    duckduckgo: 'https://duckduckgo.com/?t=h_&q=',
    searX: 'https://searx.be/search?q='
} as Record<PropertyKey, PropertyKey>;

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
            <RadioItem
                title={'Search Engine'}
                options={Object.keys(DefaultProvidedSearchEngines).map((k) => ({
                    name: k,
                    value: DefaultProvidedSearchEngines[k]
                }))}
                onChange={((e) => {
                    setSearchEngineName(e.name!.toString());
                    setSearchEngineURL(e.value.toString());
                })}
                className={Margins.marginBottom20}
                value={searchEngineURL}
            />

            <FormText className={Margins.marginBottom20}>or manually provide a search engine</FormText>

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