import { React } from '@lib/components';
import Flex from '@lib/components/Flex';
import DadscordNameFilter from '..';
const { Text, TextInput, Button } = BdApi.Components;

function NameFilterItem({
    filter,
    onRemoveFilter
}: {
    filter: string;
    onRemoveFilter: (filter: string) => void;
}) {
    return (
        <li style={{
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            maxWidth: '500px'
        }}>
            <Flex direction={Flex.Direction.HORIZONTAL} align={Flex.Align.CENTER} style={{ gap: '12px' }}>
                <div>
                    <Text size={Text.Sizes.SIZE_16} tag='h4' strong>
                        {filter}
                    </Text>
                </div>
            </Flex>

            <Button onClick={() => onRemoveFilter(filter)} color={Button.Colors.RED} style={{ marginTop: '8px' }}>
                Remove Filter
            </Button>
        </li>
    );
}

export function NameFilterModal() {
    const [nameFilters, setNameFilters] = React.useState(new Set<string>(DadscordNameFilter.settings.nameFiltering));
    const [newFilter, setNewFilter] = React.useState('');

    const addFilter = (filter: string) => {
        if(!filter) return; // Don't add if filter is empty

        const updatedFilters = new Set(nameFilters);
        updatedFilters.add(filter);
        setNameFilters(updatedFilters);

        // Save the new state to the settings
        DadscordNameFilter.settings.nameFiltering = updatedFilters;
    };

    const removeFilter = (filter: string) => {
        const updatedFilters = new Set(nameFilters);
        updatedFilters.delete(filter);
        setNameFilters(updatedFilters);

        // Save the updated state to the settings
        DadscordNameFilter.settings.nameFiltering = updatedFilters;
    };

    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                padding: '20px',
                maxWidth: '500px',
                marginBottom: '20px'
            }}>
                <Text size={Text.Sizes.SIZE_16} tag='h3' strong>
                    Add a New Name Filter
                </Text>

                <TextInput
                    value={newFilter}
                    onChange={(e) => setNewFilter(e)}
                    placeholder="Enter a name or regex filter"
                />

                <Button
                    onClick={() => addFilter(newFilter)}
                    color={Button.Colors.GREEN}
                    style={{ padding: '10px' }}
                >
                    Add Filter
                </Button>
            </div>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {Array.from(nameFilters).map((filter) => (
                    <NameFilterItem
                        key={filter}
                        filter={filter}
                        onRemoveFilter={removeFilter}
                    />
                ))}
            </ul>
        </>
    );
}
