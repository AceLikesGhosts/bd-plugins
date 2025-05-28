import { FormSwitch } from '@lib/components/Form';
import UserStore from '@lib/stores/UserStore';
import ADiscordBypasses from '..';
import { DefaultSettings } from '..';
import { ImagePickerItem } from './ImagePicker';
import { React } from '@lib/components';

export function Settings(): JSX.Element {
    type DefaultSettings = typeof DefaultSettings;
    const [nsfw, setNSFW] = React.useState<DefaultSettings['NSFW']>(ADiscordBypasses.settings!.NSFW);
    const [callTimeout, setCallTimeout] = React.useState<DefaultSettings['CallTimeout']>(ADiscordBypasses.settings!.CallTimeout);
    const [PTT, setPTT] = React.useState<DefaultSettings['PTT']>(ADiscordBypasses.settings!.PTT);
    const [streamPreview, setStreamPreview] = React.useState<DefaultSettings['StreamPreview']>(ADiscordBypasses.settings!.StreamPreview);
    const [customPreviewImage, setCustomImagePreview] = React.useState<DefaultSettings['CustomPreviewImage']>(ADiscordBypasses.settings!.CustomPreviewImage);
    const [isPremium, setSpotifyPremium] = React.useState<DefaultSettings['SpotifyPremium']>(ADiscordBypasses.settings!.SpotifyPremium);
    const [spotifyPause, setSpotifyPause] = React.useState<DefaultSettings['SpotifyPause']>(ADiscordBypasses.settings!.SpotifyPause);
    const [Verification, setVerification] = React.useState<DefaultSettings['Verification']>(ADiscordBypasses.settings!.Verification);
    const [maxAccounts, setMaxAccounts] = React.useState<DefaultSettings['MaxAccounts']>(ADiscordBypasses.settings!.MaxAccounts);
    const [Idle, setIdle] = React.useState<DefaultSettings['Idle']>(ADiscordBypasses.settings!.Idle);
    const [electronBadge, setElectronBadge] = React.useState<DefaultSettings['electronBadge']>(ADiscordBypasses.settings!.electronBadge);

    React.useEffect(() => {
        ADiscordBypasses.settings = {
            NSFW: nsfw,
            CallTimeout: callTimeout,
            PTT,
            SpotifyPremium: isPremium,
            SpotifyPause: spotifyPause,
            MaxAccounts: maxAccounts,
            StreamPreview: streamPreview,
            CustomPreviewImage: customPreviewImage,
            Verification,
            Idle,
            electronBadge
        };
    }, [
        nsfw,
        callTimeout,
        PTT,
        streamPreview,
        customPreviewImage,
        isPremium,
        spotifyPause,
        Verification,
        maxAccounts,
        Idle,
        electronBadge
    ]);

    return (
        <div>
            <FormSwitch
                disabled={UserStore?.getCurrentUser()?.nsfwAllowed && !ADiscordBypasses.settings?.NSFW}
                note={`Bypasses the channel restriction when you're too young to enter channels marked as NSFW.`}
                value={nsfw}
                onChange={((v) => setNSFW(v))}
            >
                NSFW Bypass
            </FormSwitch>
            <FormSwitch
                note={'Lets you stay alone in a call for longer than 5 minutes.'}
                value={callTimeout}
                onChange={((v) => setCallTimeout(v))}
            >
                Call timeout
            </FormSwitch>
            <FormSwitch
                note={'Lets you use voice activity in channels that enforce the use of push-to-talk.'}
                value={PTT}
                onChange={((v) => setPTT(v))}
            >
                No push-to-talk.
            </FormSwitch>
            <FormSwitch
                note='Stops your stream preview from being rendered. If an image is provided, the image given will be rendered.'
                value={streamPreview}
                onChange={((v) => setStreamPreview(v))}
            >
                Custom stream preview
            </FormSwitch>
            <ImagePickerItem
                title='Custom Preview Image'
                note='Image to render as stream preview. (Must be under 200kb. If no image is provided, no stream preview will be shown.) Requires reloading the plugin.'
                disabled={!streamPreview}
                value={customPreviewImage}
                onChange={((v) => setCustomImagePreview(v))}
            />
            <FormSwitch
                note='Allows using the Spotify listen along feature on Discord without premium.'
                value={isPremium}
                onChange={((v) => setSpotifyPremium(v))}
            >
                Spotify Listen Along
            </FormSwitch>
            <FormSwitch
                note='Prevents Discord from pausing your Spotify when streaming or gaming.'
                value={spotifyPause}
                onChange={((v) => setSpotifyPause(v))}
            >
                Spotify Pause
            </FormSwitch>
            <FormSwitch
                note='Removes the 10 minutes wait before being able to join voice channels in newly joined guilds.'
                value={Verification}
                onChange={((v) => setVerification(v))}
            >
                Guild verification bypass
            </FormSwitch>
            <FormSwitch
                note={`Removes the maximum account limit in Discord's built-in account switcher.`}
                value={maxAccounts}
                onChange={((v) => setMaxAccounts(v))}
            >
                Max account limit bypass
            </FormSwitch>
            <FormSwitch
                note={'Stops Discord from setting your presence to idle when you leave Discord alone.'}
                value={Idle}
                onChange={(v) => setIdle(v)}
            >
                Anti Idle
            </FormSwitch>
            <FormSwitch
                note={'Stops Discord from displaying different badge icons (i.e. missed messages, and friend requests). Requires reloading the plugin.'}
                value={electronBadge}
                onChange={(v) => setElectronBadge(v)}
            >
                Missed Messages Badge
            </FormSwitch>
        </div>
    );
}
