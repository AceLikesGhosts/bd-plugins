import { React } from '@lib/components';
import type { UserIdProps } from '.';
import { FormItem } from '@lib/components/Form';
import TextInput from '@lib/components/TextInput';
import { logger } from 'plugins/AVCStalker';

export default function ModalSettings(props: UserIdProps & { setUserIds: (ids: string[]) => void; }): JSX.Element {
    return (
        <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'flex-start', marginLeft: '16px', marginBottom: '10px' }}>
            <FormItem title={'user Ids'}>
                <TextInput
                    value={props.userIds.toString()}
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
        </div>
    );
}