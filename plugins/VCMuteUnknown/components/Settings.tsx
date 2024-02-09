import { RawComponents, React } from '@lib/components';
import { FormSwitch } from '@lib/components/Form';
import VCMuteUnknown from '..';

const Margins = BdApi.Webpack.getByKeys('marginBottom40');

export default function Settings(): JSX.Element {
    const [mute, setMute] = React.useState<boolean>(VCMuteUnknown.settings.mute ?? VCMuteUnknown.DefaultSettings.mute);
    const [muteSoundboard, setMuteSoundboard] = React.useState<boolean>(VCMuteUnknown.settings.muteSoundboard ?? VCMuteUnknown.DefaultSettings.muteSoundboard);
    const [ignoreFriends, setIgnoreFriends] = React.useState<boolean>(VCMuteUnknown.settings.ignoreFriends ?? VCMuteUnknown.DefaultSettings.ignoreFriends);
    const [ignoreMutuals, setIgnoreMutuals] = React.useState<boolean>(VCMuteUnknown.settings.ignoreMutuals ?? VCMuteUnknown.DefaultSettings.ignoreMutuals);

    return (
        <div>
            <RawComponents.Text
                variant='text-xs'
                className={Margins.marginBottom20}
            >
                Made with 💖 for my beloved lulu-uwu-pookie-bear
            </RawComponents.Text>

            <FormSwitch
                value={mute}
                onChange={((e) => setMute(e))}
                note={'Local mutes newly joining people upon them joining the voice channel.'}
            >
                Local Mute
            </FormSwitch>

            <FormSwitch
                value={muteSoundboard}
                onChange={((e) => setMuteSoundboard(e))}
                note={'Local mutes soundboards upon newly joining people joining the voice channel.'}
            >
                Local Mute Soundboard
            </FormSwitch>

            <FormSwitch
                value={ignoreFriends}
                onChange={((e) => setIgnoreFriends(e))}
                note={'Should we ignore friends who join the voice channel?'}
            >
                Ignore Friends
            </FormSwitch>

            <FormSwitch
                value={ignoreMutuals}
                onChange={((e) => setIgnoreMutuals(e))}
                note={'Should we ignore anybody that we have mutuals with?'}
            >
                Ignore Mutuals
            </FormSwitch>
        </div>
    );
}