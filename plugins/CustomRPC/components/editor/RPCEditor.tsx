import { Margins, React } from '@lib/components';
import Button from '@lib/components/Button';
import RawTextInput from '@lib/components/TextInput';
import { ActivityType, type Activity } from '@lib/modules/UserActivity';
import type { TextInputProps } from '@lib/components/TextInput';
import type { FormItemProps } from '@lib/components/Form';
import { FormItem, FormSwitch } from '@lib/components/Form';
import { RadioItem } from '@lib/components/Radio';
import Flex from '@lib/components/Flex';

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

export default function RPCEditor({ activity, save, back }: { activity: Activity, save: (rpc: Activity) => void; back: () => void; }): JSX.Element {
    const [tempRPC, setTempRPC] = React.useState<Activity>(activity);
    const [showTime, setShowTime] = React.useState<boolean>(false);

    const appendRPC = (rpc: Partial<Activity>) => {
        setTempRPC((r_rpc) => {
            return {
                ...r_rpc,
                ...rpc
            };
        });
    };

    return (
        <div>
            <TextInput
                title={'Application Id'}
                value={tempRPC.application_id}
                required
                onChange={((e) => appendRPC({ application_id: e }))}
            />

            <TextInput
                title={'Name'}
                value={tempRPC.name}
                required
                onChange={((e) => appendRPC({ name: e }))}
            />

            <TextInput
                title={'Details'}
                value={tempRPC.details}
                required
                onChange={((e) => appendRPC({ details: e }))}
            />

            <TextInput
                title={'State'}
                value={tempRPC.state}
                onChange={((e) => {
                    if(tempRPC.type === ActivityType.Listening) {
                        appendRPC({ assets: { large_text: e } });
                        return;
                    }

                    appendRPC({ state: e });
                })}
            />

            {/* assets */}
            <TextInput
                title={'Large Image'}
                value={tempRPC.assets?.large_image}
                onChange={((e) => appendRPC({ assets: { large_image: e } }))}
            />

            <TextInput
                title={'Large Image Text'}
                value={tempRPC.assets?.large_text}
                // if listening the large image text is used instead, cringe limitation of cord.
                // iirc.
                disabled={tempRPC.type === ActivityType.Listening}
                onChange={((e) => appendRPC({ assets: { large_text: e } }))}
            />

            <TextInput
                title={'Small Image'}
                value={tempRPC.assets?.small_image}
                onChange={((e) => appendRPC({ assets: { small_image: e } }))}
            />

            <TextInput
                title={'Small Image Text'}
                value={tempRPC.assets?.small_text}
                onChange={((e) => appendRPC({ assets: { small_text: e } }))}
            />

            <FormSwitch
                value={showTime}
                onChange={((e) => setShowTime(e))}
            >
                Show Time
            </FormSwitch>

            <TextInput
                title={'Start'}
                value={String(tempRPC.timestamps?.start ?? '0')}
                onChange={((e) => appendRPC({ timestamps: { start: Number(e) } }))}
                disabled={!showTime}
            />

            <TextInput
                title={'End'}
                value={String(tempRPC.timestamps?.end ?? '0')}
                onChange={((e) => appendRPC({ timestamps: { end: Number(e) } }))}
                disabled={!showTime}
            />

            <RadioItem
                title={'Activity Type'}
                options={Object.entries(ActivityType).map((v) => {
                    return {
                        name: v[0],
                        value: v[1]
                    };
                })}
                onChange={((e) => appendRPC({ type: e.value }))}
                value={tempRPC.type}
            />

            <TextInput
                title={'Twitch URL'}
                placeholder='https://twitch.tv/...'
                onChange={((e) => appendRPC({ url: e }))}
                disabled={tempRPC.type !== ActivityType.Streaming}
            />

            <Flex direction={Flex.Direction.HORIZONTAL}>
                <Button
                    style={{ marginRight: '15px' }}
                    onClick={(() => save(tempRPC))}
                >
                    Save
                </Button>

                <Button
                    onClick={() => back()}
                    color={Button.Colors.YELLOW}
                >
                    Back
                </Button>
            </Flex>
        </div>
    );
}