import { React } from '@lib/components';
import { SwitchInputProps } from 'betterdiscord';
import DadscordAutoBans, { AllowedCommands, AutoBanContext, DefaultSettings, meta, NotificationEvents } from '.';
import { openManagementModal } from './modal';
const { Text, SwitchInput, Button, SettingItem } = BdApi.Components;

type SettingsState = {
    showVoiceOwnerIcon: boolean;
    autoClaimVoiceChat: boolean;
    persistantSharedCallOwnership: Map<string, AllowedCommands[]>;
    autoBanUserIds: Map<string, AutoBanContext>;
    nameFiltering: Set<string>;
    showNotificationsFor: NotificationEvents[];
};

function Switch(args: SwitchInputProps & { title: string; note?: string; }) {
    return (
        <SettingItem inline id='kys-zere' note={args.note!} name={args.title}>
            <SwitchInput {...args} />
        </SettingItem>
    );
}


export default function Settings(): React.ReactNode {
    const [settings, setSettings] = React.useState<SettingsState>({
        showVoiceOwnerIcon: DefaultSettings.showVoiceOwnerIcon,
        autoClaimVoiceChat: DefaultSettings.autoClaimVoiceChat,
        persistantSharedCallOwnership: DefaultSettings.persistantSharedCallOwnership,
        autoBanUserIds: DefaultSettings.autoBanUserIds,
        nameFiltering: DefaultSettings.nameFiltering,
        showNotificationsFor: DefaultSettings.showNotificationsFor
    });

    React.useEffect(() => {
        DadscordAutoBans.settings = settings;
        BdApi.Data.save(meta.name, 'config', settings);
    }, [settings]);

    const handleSwitchChange = (key: keyof SettingsState) => (value: boolean) => {
        setSettings(prevSettings => ({
            ...prevSettings,
            [key]: value
        }));
    };


    function toTitleCase(str: string): string {
        return str
            .split('_')
            .map(word =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(' ');
    }


    return (
        <div>
            <Text style={{ marginBottom: '15px' }} strong size={Text.Sizes.SIZE_20} tag='h2'>
                NOTIFICATION SETTINGS
            </Text>

            {Object.keys(NotificationEvents)
                .filter((key) => isNaN(Number(key)))
                .map((ne) => (
                    <Switch
                        id='kys-zere'
                        key={ne}
                        title={toTitleCase(ne)}
                        value={settings.showNotificationsFor.includes(NotificationEvents[ne as keyof typeof NotificationEvents])}
                        onChange={(e) => {
                            const updatedNotifications = [...settings.showNotificationsFor];
                            const notificationValue = NotificationEvents[ne as keyof typeof NotificationEvents];

                            if(e) {
                                updatedNotifications.push(notificationValue);
                            } else {
                                const idx = updatedNotifications.findIndex((item) => item === notificationValue);
                                if(idx !== -1) {
                                    updatedNotifications.splice(idx, 1);
                                }
                            }

                            // Update the state with the modified notifications list
                            setSettings((prevSettings) => ({
                                ...prevSettings,
                                showNotificationsFor: updatedNotifications,
                            }));
                        }}
                    />
                ))}



            <Text style={{ marginBottom: '15px' }} strong size={Text.Sizes.SIZE_20} tag='h2'>
                VOICE CHAT SETTINGS
            </Text>

            <Switch
                title='Autoclaim Voice Chat'
                note='Automatically claim the voice chat you are in when the original owner leaves.'
                id='autoclaim'
                value={settings.autoClaimVoiceChat}
                onChange={handleSwitchChange('autoClaimVoiceChat')}
            />

            <Switch
                title='Show Voice Owner Icon'
                note='Show an icon next to who owns any custom voice chat.'
                id='show-voice-owner'
                value={settings.autoClaimVoiceChat}
                onChange={handleSwitchChange('showVoiceOwnerIcon')}
            />

            <Text style={{ marginBottom: '15px' }} strong size={Text.Sizes.SIZE_20} tag='h2'>
                OPEN MODALS
            </Text>

            <Button onClick={openManagementModal}>
                Open extended settings modal
            </Button>
        </div>
    );
}
