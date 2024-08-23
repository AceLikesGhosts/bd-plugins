import { React } from '@lib/components';
import PlatformSpoofer from '..';
import { RadioItem } from '@lib/components/Radio';
import { PropertiesToSpoofAs, socket } from '../utils';
import Flex from '@lib/components/Flex';
import Button from '@lib/components/Button';

export default function Settings(): React.ReactNode {
    const [type, setType] = React.useState(PlatformSpoofer.settings.type);
    const [isSocketOpen, setSocketOpen] = React.useState<boolean>(socket?.isConnected() ?? false);

    React.useEffect(() => {
        PlatformSpoofer.settings.type = type;
    }, [type]);

    return (
        <div>
            <RadioItem
                title={'Platform'}
                options={Object.keys(PropertiesToSpoofAs).map((v) => ({
                    name: v,
                    value: v
                }))}
                onChange={((e) => setType(e.value as keyof typeof PropertiesToSpoofAs))}
                value={type}
            />

            <Flex align={Flex.Direction.HORIZONTAL}>
                <Button
                    color={isSocketOpen ? Button.Colors.RED : Button.Colors.PRIMARY}
                    onClick={(() => {
                        if(isSocketOpen) {
                            setSocketOpen(false);
                            socket?.close();
                            BdApi.UI.showToast('Closed WebSocket', { type: 'warn' });
                            return;
                        }

                        setSocketOpen(true);
                        socket?.connect();
                        BdApi.UI.showToast('Opened WebSocket', { type: 'success' });
                    })}
                >
                    {isSocketOpen ? 'Disconnect From WebSocket' : 'Connect To WebSocket'}
                </Button>
            </Flex>
        </div>
    );
}