import { React } from '@lib/components';
import { RadioItem } from '@lib/components/Radio';
import PlatformSpoofer, { PropertiesToSpoofAs } from '..';
import Flex from '@lib/components/Flex';
import Button from '@lib/components/Button';

export default function Settings(): JSX.Element {
    const [type, setType] = React.useState<keyof typeof PropertiesToSpoofAs>(PlatformSpoofer.settings.type ?? PlatformSpoofer.DefaultSettings.type);
    const [isSocketOpen, setSocketOpen] = React.useState<boolean>(PlatformSpoofer.socket?.isConnected() ?? false);

    React.useEffect(() => {
        PlatformSpoofer.settings.type = type;
    }, [type]);

    return (
        <div>
            <RadioItem
                title={'Websocket Spoofing'}
                options={Object.keys(PropertiesToSpoofAs).map((v) => {
                    return {
                        name: v,
                        value: v
                    };
                })}
                onChange={((e) => setType(e.value as keyof typeof PropertiesToSpoofAs))}
                value={type}
            />

            <Flex align={Flex.Direction.HORIZONTAL}>
                <Button
                    color={isSocketOpen ? Button.Colors.RED : Button.Colors.PRIMARY}
                    onClick={(() => {
                        if(isSocketOpen) {
                            PlatformSpoofer.socket?.close();
                            setSocketOpen(false);
                            BdApi.UI.showToast('Closed WebSocket', { type: 'warn' });
                            return;
                        }

                        setSocketOpen(true);
                        BdApi.UI.showToast('Opened WebSocket', { type: 'success' });
                        PlatformSpoofer.socket?.connect();
                    })}
                >
                    {isSocketOpen ? 'Disconnect From WebSocket' : 'Connect To WebSocket'}
                </Button>
            </Flex>
        </div>
    );
}