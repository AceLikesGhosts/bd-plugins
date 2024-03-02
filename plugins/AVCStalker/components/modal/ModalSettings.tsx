import { React } from '@lib/components';
import type { UserIdProps } from '.';
import { FormItem } from '@lib/components/Form';
import Switch from '@lib/components/Switch';
import TextInput from '@lib/components/TextInput';
import { logger } from 'plugins/AVCStalker';
import Button from '@lib/components/Button';
import Flex from '@lib/components/Flex';
import Text from '@lib/components/Text';
import { memoryCache } from 'plugins/AVCStalker/data';
import { del } from 'plugins/AVCStalker/data/FileData';

// export default function ModalSettings(props: UserIdProps & { setUserIds: (ids: string[]) => void; }): JSX.Element {
//     return (
//         <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'flex-start', marginLeft: '16px', marginBottom: '10px', marginTop: '10px' }}>
//             <FormItem title={'user Ids'}>
//                 <TextInput
//                     value={props.userIds.toString()}
//                     onChange={((e) => {
//                         let splitBy = e.split(',');
//                         if(splitBy.length === 0) splitBy = e.split(', ');
//                         if(splitBy.length === 0) {
//                             logger.critical(`failed to split string into user ids`, e);
//                             return;
//                         }

//                         props.setUserIds(splitBy);
//                     })}
//                 />
//             </FormItem>

//             <Button color={Button.Colors.RED} size={Button.Sizes.MEDIUM}>
//                 Clear Logs
//             </Button>
//         </div>
//     );
// }

export default function ModalSettings(props: UserIdProps & { setUserIds: (ids: string[]) => void; showCorrelated: boolean; setShowCorrelated: (state: boolean) => void; }): JSX.Element {
    return (
        <Flex direction={Flex.Direction.HORIZONTAL} align={Flex.Align.CENTER} style={{ marginLeft: '16px', marginBottom: '10px', marginTop: '10px', maxHeight: '48px' }}>
            <FormItem style={{ marginRight: '15px' }}>
                <TextInput
                    value={props.userIds.toString()}
                    placeholder='User IDs'
                    onChange={((e) => {
                        let splitBy = e.split(',');
                        if(splitBy.length === 0) splitBy = e.split(', ');
                        if(splitBy.length === 0) {
                            logger.critical(`failed to split string into user ids`, e);
                            return;
                        }

                        props.setUserIds(splitBy);
                    })}
                />
            </FormItem>

            <Flex direction={Flex.Direction.HORIZONTAL} align={Flex.Align.CENTER}>
                <Text variant='eyebrow' style={{ marginRight: '5px' }}>Show Correlated Logs</Text>
                <Switch checked={props.showCorrelated} onChange={((e) => props.setShowCorrelated(e))} />
            </Flex>

            <Button
                color={Button.Colors.RED}
                size={Button.Sizes.MEDIUM}
                style={{ marginRight: '16px' }}
                onClick={(() => {
                    BdApi.UI.showConfirmationModal('aaa', 'aaa', {
                        danger: true,
                        onConfirm() {
                            props.userIds.forEach((userId) => {
                                memoryCache.set(userId, []);
                                del(userId);
                            });
                        },
                        onCancel() { },
                        confirmText: 'Delete Logs For User(s)',
                        cancelText: 'Cancel'
                    });
                })}
            >
                Clear Logs
            </Button>
        </Flex>
    );
}