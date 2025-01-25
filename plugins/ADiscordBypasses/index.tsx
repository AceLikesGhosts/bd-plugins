import type { Meta, Plugin } from 'betterdiscord';

import { React } from '@lib/components';
import Logger from '@lib/logger';

import { ImagePickerItem } from './components/ImagePicker';
import { FormSwitch } from '@lib/components/Form';
import UserStore from '@lib/stores/UserStore';

import NSFWPatch from './patches/NSFWPatch';
import SpotifyPremium from './patches/SpotifyPremium';
import Timeout from './patches/Timeout';
import GuildVerification from './patches/GuildVerification';
import StreamPreview from './patches/StreamPreview';
import PTT from './patches/PTT';
import AccountSwitcher from './patches/AccountSwitcher';
import Idle from './patches/Idle';
import setBadge from './patches/setBadge';

export default class ADiscordBypasses implements Plugin {
    public readonly logger: Logger;
    public constructor(meta: Meta) {
        this.logger = new Logger(meta);
    }

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
        MaxAccounts: false,
        Idle: false,
        electronBadge: false
    };

    start(): void {
        this.logger.log('started');
        this.settings = BdApi.Data.load('ADiscordBypasses', 'settings') || this.defaultSettings;

        NSFWPatch(this);
        SpotifyPremium(this);
        Timeout(this);
        GuildVerification(this);
        StreamPreview(this);
        PTT(this);
        AccountSwitcher(this);
        Idle(this);
        setBadge(this);
    }

    stop(): void {
        this.logger.log('stopped');
        BdApi.Data.save('ADiscordBypasses', 'settings', this.settings);
        BdApi.Patcher.unpatchAll('ADiscordBypasses');
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
    const [Idle, setIdle] = React.useState<DefaultSettings['Idle']>(this.settings!.Idle);
    const [electronBadge, setElectronBadge] = React.useState<DefaultSettings['electronBadge']>(this.settings!.electronBadge);

    React.useEffect(() => {
        this.settings = {
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
                disabled={UserStore?.getCurrentUser()?.nsfwAllowed && !this.settings?.NSFW}
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
