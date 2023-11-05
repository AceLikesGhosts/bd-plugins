import type { Plugin } from 'betterdiscord';
import { FormSwitch } from '@lib/components/Form';
import { ImagePickerItem } from './components/ImagePicker';
const { React } = BdApi;

export default class ADiscordBypasses implements Plugin {
    public settings: typeof this.defaultSettings | undefined = void 0;
    public defaultSettings = {
        PTT: false,
        CallTimeout: false,
        NSFW: false,
        StreamPreview: false,
        CustomPreviewImage: '',
        SpotifyPremium: false,
        SpotifyPause: false,
        Verification: false,
        MaxAccounts: false
    };

    public UserStore: { getCurrentUser(): { nsfwAllowed: boolean; }; } = BdApi.Webpack.getStore('UserStore');

    start(): void {
        this.settings = BdApi.Data.load('ADiscordBypasses', 'settings') || this.defaultSettings;
    }

    stop(): void {
        BdApi.Data.save('ADiscordBypasses', 'settings', this.settings);
        delete this.settings;
    }

    getSettingsPanel(): () => JSX.Element {
        return DiscordBypassSettings.bind(this);
    }
}



function DiscordBypassSettings(this: Omit<ADiscordBypasses, 'getSettingsPanel'>): JSX.Element {
    type DefaultSettings = typeof this.defaultSettings;
    const [nsfw, setNSFW] = React.useState<DefaultSettings['NSFW']>(this.settings!.NSFW);
    const [callTimeout, setCallTimeout] = React.useState<DefaultSettings['CallTimeout']>(this.settings!.CallTimeout);
    const [PTT, setPTT] = React.useState<DefaultSettings['PTT']>(this.settings!.PTT);
    const [streamPreview, setStreamPreview] = React.useState<DefaultSettings['StreamPreview']>(this.settings!.StreamPreview);
    const [customPreviewImage, setCustomImagePreview] = React.useState<DefaultSettings['CustomPreviewImage']>(this.settings!.CustomPreviewImage);
    const [isPremium, setSpotifyPremium] = React.useState<DefaultSettings['SpotifyPremium']>(this.settings!.SpotifyPremium);
    const [spotifyPause, setSpotifyPause] = React.useState<DefaultSettings['SpotifyPause']>(this.settings!.SpotifyPause);
    const [Verification, setVerification] = React.useState<DefaultSettings['Verification']>(this.settings!.Verification);
    const [maxAccounts, setMaxAccounts] = React.useState<DefaultSettings['MaxAccounts']>(this.settings!.MaxAccounts);

    return (
        <div>
            <FormSwitch
                disabled={this.UserStore?.getCurrentUser()?.nsfwAllowed && !this.settings?.NSFW}
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
                note='Image to render as stream preview. (Must be under 200kb. If no image is provided, no stream preview will be shown.)'
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
        </div>
    );
}
