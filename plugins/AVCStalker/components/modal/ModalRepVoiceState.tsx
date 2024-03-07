import { React } from '@lib/components';
import Flex from '@lib/components/Flex';
import Avatars from '@lib/components/Avatar';
import Text from '@lib/components/Text';
import Timestamp from '@lib/components/Timestamp';
import UserStore from '@lib/stores/UserStore';
import { getVoiceStateDifferenceMessage } from 'plugins/AVCStalker/voiceState';
import type { StateData } from './ModalData';

export default function ModalRepVoiceState({ newestState, lastState }: StateData): JSX.Element {
    const user = UserStore.getUser(newestState.userId) || {
        username: 'unknown',
        id: '0'
    };

    return (
        <Flex direction={Flex.Direction.HORIZONTAL} align={Flex.Align.START} style={{ marginLeft: '16px' }}>
            <Flex direction={Flex.Direction.HORIZONTAL} align={Flex.Align.CENTER}>
                {'avatar' in user && <Avatars.Avatar
                    src={`https://cdn.discordapp.com/avatars/${ user.id }/${ user.avatar }`}
                    size={Avatars.AvatarSizes.SIZE_32}
                    status={null}
                />}

                <Flex direction={Flex.Direction.HORIZONTAL} style={{ width: '75%', maxWidth: '800px' }}>
                    <div onClick={(() => {
                        (window as unknown as { DiscordNative: { clipboard: { copy: (message: string) => void; }; }; }).DiscordNative.clipboard.copy(user.id);
                        BdApi.UI.showToast(`Copied ${user.username}'s ID.`, { type: 'success' });
                    })}>
                        <Text variant='text-md/bold' style={{ marginRight: '3px' }}>
                            {user.username}
                        </Text>
                    </div>
                    <Text variant='text-md/normal' style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', width: '50%' }}>
                        {getVoiceStateDifferenceMessage(newestState, lastState)}.
                    </Text>
                </Flex>

                <Text variant='text-sm/normal' style={{ marginRight: '16px' }}>
                    <Timestamp
                        timestamp={new Date(newestState.when)}
                    />
                </Text>
            </Flex>
        </Flex>
    );
}