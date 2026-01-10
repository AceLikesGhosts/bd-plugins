import { React } from '@lib/components';
import Flex from '@lib/components/Flex';
import UserStore from '@lib/stores/UserStore';
import DadscordAutoBans, { AllAllowedCommands, AllowedCommands } from '..';
const { Text, TextInput, Button } = BdApi.Components;

function OwnershipItem({
    userId,
    commands,
    onRemoveOwnership,
    onChangePermissions,
}: {
    userId: string;
    commands: AllowedCommands[];
    onRemoveOwnership: (userId: string) => void;
    onChangePermissions: (userId: string, updatedCommands: AllowedCommands[]) => void;
}) {
    const user = UserStore.getUser(userId);

    const handleCheckboxChange = (command: AllowedCommands) => {
        onChangePermissions(userId, commands.includes(command)
            ? commands.filter(c => c !== command)
            : [...commands, command]);
    };

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
                        {user?.username ?? 'Unknown Username'}
                    </Text>
                    <div>
                        {AllAllowedCommands.map((command) => (
                            <div key={command} style={{ marginBottom: '4px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <input
                                        type="checkbox"
                                        checked={commands.includes(command)}
                                        onChange={() => handleCheckboxChange(command)}
                                        style={{
                                            accentColor: 'rgb(114, 137, 218)',
                                            cursor: 'pointer',
                                        }}
                                    />
                                    <Text size={Text.Sizes.SIZE_14} tag='span'>
                                        {AllowedCommands[command]}
                                    </Text>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </Flex>

            <Button onClick={() => onRemoveOwnership(userId)} color={Button.Colors.RED} style={{ marginTop: '8px' }}>
                Remove Ownership
            </Button>
        </li>
    );
}

export function SharedCallOwnershipModal() {
    const [ownerships, setOwnerships] = React.useState(new Map<string, AllowedCommands[]>(DadscordAutoBans.settings.persistantSharedCallOwnership));
    const [newUserId, setNewUserId] = React.useState('');
    const [selectedCommands, setSelectedCommands] = React.useState<AllowedCommands[]>([]);

    const addOwnership = (userId: string, commands: AllowedCommands[]) => {
        if(!userId || commands.length === 0) return;

        const updatedOwnerships = new Map(ownerships);
        updatedOwnerships.set(userId, commands);
        setOwnerships(updatedOwnerships);

        DadscordAutoBans.settings.persistantSharedCallOwnership = updatedOwnerships;
    };

    const removeOwnership = (userId: string) => {
        const updatedOwnerships = new Map(ownerships);
        updatedOwnerships.delete(userId);
        setOwnerships(updatedOwnerships);

        DadscordAutoBans.settings.persistantSharedCallOwnership = updatedOwnerships;
    };

    const changePermissions = (userId: string, updatedCommands: AllowedCommands[]) => {
        const updatedOwnerships = new Map(ownerships);
        updatedOwnerships.set(userId, updatedCommands);
        setOwnerships(updatedOwnerships);

        DadscordAutoBans.settings.persistantSharedCallOwnership = updatedOwnerships;
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
                    Add New Shared Ownership
                </Text>

                <TextInput
                    value={newUserId}
                    onChange={(e) => setNewUserId(e)}
                    placeholder="Enter User ID"
                />

                <div>
                    <Text size={Text.Sizes.SIZE_14} tag="p">Select Commands</Text>
                    <div
                        style={{
                            display: 'flex',
                            gap: '8px',
                            flexWrap: 'wrap',
                            maxWidth: '100%',
                        }}
                    >
                        {AllAllowedCommands.map((command) => (
                            <Button
                                key={command}
                                color={selectedCommands.includes(command) ? Button.Colors.GREEN : Button.Colors.RED}
                                onClick={() => {
                                    setSelectedCommands((prev) =>
                                        prev.includes(command)
                                            ? prev.filter((cmd) => cmd !== command)
                                            : [...prev, command]
                                    );
                                }}
                                style={{
                                    flexShrink: 0,
                                    minWidth: '120px',
                                }}
                            >
                                {AllowedCommands[command]}
                            </Button>
                        ))}
                    </div>
                </div>

                <Button
                    onClick={() => addOwnership(newUserId, selectedCommands)}
                    color={Button.Colors.GREEN}
                    style={{ padding: '10px' }}
                >
                    Add Ownership
                </Button>
            </div>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {Array.from(ownerships.entries()).map(([userId, commands]) => (
                    <OwnershipItem
                        key={userId}
                        userId={userId}
                        commands={commands}
                        onRemoveOwnership={removeOwnership}
                        onChangePermissions={changePermissions}
                    />
                ))}
            </ul>
        </>
    );
}
