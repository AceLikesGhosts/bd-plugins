import { React } from '@lib/components';
import Flex from '@lib/components/Flex';
import Timestamp from '@lib/components/Timestamp';
import UserStore from '@lib/stores/UserStore';
import DadscordAutoBans from '..';
const { Text, SettingItem, TextInput, Button } = BdApi.Components;

function AutobannedUser({
    timestamp,
    userId,
    reason,
    onRemoveUser
}: {
    userId: string;
    timestamp: Date;
    reason: string | null;
    onRemoveUser: (userId: string) => void;
}) {
    const user = UserStore.getUser(userId);
    const [reasonState, setReason] = React.useState<string | null>(reason);

    React.useEffect(() => {
        DadscordAutoBans.settings.autoBanUserIds.set(userId, {
            timestamp,
            reason: reasonState
        });
    }, [reasonState]);

    return (
        <li style={{
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            maxWidth: '500px'
        }}>
            <Flex direction={Flex.Direction.HORIZONTAL} align={Flex.Align.CENTER} style={{ gap: '12px' }}>
                <img
                    src={user?.id ? `https://cdn.discordapp.com/avatars/${ user?.id }/${ user?.avatar }` : 'https://cdn.discordapp.com/embed/avatars/0.png'}
                    height={'40px'}
                    width={'40px'}
                    style={{ borderRadius: '50%' }}
                />

                <div>
                    <Text size={Text.Sizes.SIZE_16} tag='h4' strong>
                        {user?.username ?? 'Unknown Username'}
                    </Text>
                    <Timestamp timestamp={timestamp} />
                </div>
            </Flex>

            <SettingItem id={`reason-${ user?.id }`} name="Reason" note="">
                <TextInput
                    onChange={(e) => setReason(e)}
                    value={reasonState ?? ''}
                    placeholder="Enter a reason..."
                />
            </SettingItem>

            <Button onClick={() => onRemoveUser(userId)} color={Button.Colors.RED} style={{ marginTop: '8px' }}>
                Remove User
            </Button>
        </li>
    );
}

export function AutoBanModal() {
    const [autoBanUserIds, setAutoBanUserIds] = React.useState(new Map(DadscordAutoBans.settings.autoBanUserIds));
    const [newUserId, setNewUserId] = React.useState('');
    const [newReason, setNewReason] = React.useState<string | null>('');

    const addUser = (userId: string, reason: string | null) => {
        if(!userId) return;

        const newUser = {
            timestamp: new Date(),
            reason
        };

        const updatedUserIds = new Map(autoBanUserIds);
        updatedUserIds.set(userId, newUser);
        setAutoBanUserIds(updatedUserIds);

        DadscordAutoBans.settings.autoBanUserIds = updatedUserIds;
    };

    const removeUser = (userId: string) => {
        const updatedUserIds = new Map(autoBanUserIds);
        updatedUserIds.delete(userId);
        setAutoBanUserIds(updatedUserIds);

        DadscordAutoBans.settings.autoBanUserIds = updatedUserIds;
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
                    Add a New Autobanned User
                </Text>

                <TextInput
                    value={newUserId}
                    onChange={(e) => setNewUserId(e)}
                    placeholder="Enter User ID"
                />

                <TextInput
                    value={newReason ?? ''}
                    onChange={(e) => setNewReason(e)}
                    placeholder="Optional: Enter a Reason"
                />

                <Button
                    onClick={() => addUser(newUserId, newReason)}
                    color={Button.Colors.GREEN}
                    style={{ padding: '10px' }}
                >
                    Add User
                </Button>
            </div>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {Array.from(autoBanUserIds.entries()).map(([key, value]) => (
                    <AutobannedUser
                        key={key}
                        userId={key}
                        timestamp={value.timestamp}
                        reason={value.reason}
                        onRemoveUser={removeUser}
                    />
                ))}
            </ul>
        </>
    );
}
