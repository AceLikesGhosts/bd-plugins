import type { Plugin } from 'betterdiscord';

type Code = { code: string; created_at: string; expires_at: string; max_uses: number; uses: number; };

class ApplicationCommandAPI {
    ApplicationCommandStore: any;
    UserStore: any;
    IconUtils: any;
    commands: Map<any, any>;

    constructor(applicationCommandStore: any, userStore: any, iconUtils: any) {
        this.ApplicationCommandStore = applicationCommandStore || BdApi.Webpack.getStore('ApplicationCommandStore');
        this.UserStore = userStore;
        this.IconUtils = iconUtils;

        this.commands = new Map();
        this.#patchApplicationCommands();
        this.#patchIconUtils();
    }
    get CurrentUserSection() {
        const CurrentUser = this.UserStore.getCurrentUser();
        return {
            id: CurrentUser.id,
            name: CurrentUser.username,
            type: 1,
            icon: CurrentUser.avatar,
        };
    }

    #patchApplicationCommands() {
        const BuiltInCommands = BdApi.Webpack.getModule((m) =>
            m?.Kh?.toString?.()?.includes?.('BUILT_IN_TEXT')
        );

        BdApi.Patcher.after('FriendInvites', this.ApplicationCommandStore, 'JK', (_, _args, res) => {
            if(!res || !this.commands.size) return;

            if(
                !Array.isArray(res.sectionDescriptors) ||
                !res.sectionDescriptors.some(
                    (section: { id: any; }) => section.id == this.CurrentUserSection.id
                )
            )
                res.sectionDescriptors = Array.isArray(res.sectionDescriptors)
                    ? res.sectionDescriptors.splice(1, 0, this.CurrentUserSection)
                    : [this.CurrentUserSection];
            if(
                !Array.isArray(res.commands) ||
                Array.from(this.commands.values()).some(
                    (command) => !res.commands.includes(command)
                )
            )
                res.commands = Array.isArray(res.commands)
                    ? [
                        ...res.commands.filter(
                            (command: any) =>
                                !Array.from(this.commands.values()).includes(command)
                        ),
                        ...Array.from(this.commands.values()),
                    ]
                    : Array.from(this.commands.values());
            return res;
        });
        BdApi.Patcher.after(
            'FriendInvites',
            this.ApplicationCommandStore.ZP,
            'getChannelState',
            (_, _args, res) => {
                if(!res || !this.commands.size) return;
                if(
                    !Array.isArray(res.applicationSections) ||
                    !res.applicationSections.some(
                        (section: { id: string; }) => section.id == this.CurrentUserSection.id
                    )
                )
                    res.applicationSections = Array.isArray(
                        res.applicationSections
                    )
                        ? [this.CurrentUserSection, ...res.applicationSections]
                        : [this.CurrentUserSection];
                if(
                    !Array.isArray(res.applicationCommands) ||
                    Array.from(this.commands.values()).some(
                        (command) => !res.applicationCommands.includes(command)
                    )
                )
                    return res;
            }
        );
        BdApi.Patcher.after('FriendInvites', BuiltInCommands, 'Kh', (_, _args, res) => {
            return Array.isArray(res)
                ? [
                    ...res.filter(
                        (command) =>
                            !Array.from(this.commands.values()).includes(command)
                    ),
                    ...Array.from(this.commands.values()),
                ]
                : Array.from(this.commands.values());
        });
    }
    #patchIconUtils() {
        BdApi.Patcher.instead(
            'FriendInvites',
            this.IconUtils,
            'getApplicationIconURL',
            (_: unknown, args: unknown[], res) => {
                if((args[0] as { id: string; }).id !== this.CurrentUserSection.id)
                    return res(...args);

                return this.IconUtils.getUserAvatarURL(this.UserStore.getCurrentUser());
            }
        );
    }

    /**
     * 
     * @param {string} name 
     * @param {Record<string, unknown>} command 
     */
    register(
        name: string,
        command: {
            name: string,
            displayName: string,
            description: string;
            displayDescription: string,
            type: number,
            options: unknown | unknown[],
            name_localizations: unknown | unknown[],
            description_localizations: unknown | unknown[],
            applicationId?: string;
            id?: string;
            execute: (_: unknown, args: { channel: { id: string; }; }) => any | Promise<any>;
        }) {
        command.applicationId = '-1';
        (command.id = `${ this.CurrentUserSection.name }_${ this.commands.size + 1 }`.toLowerCase());
        this.commands.set(name, command);
        this.ApplicationCommandStore.ZP.shouldResetAll = true;
    }

    unregister() {
        this.commands.clear();
        this.ApplicationCommandStore.ZP.shouldResetAll = true;
    }
}

export default class implements Plugin {
    UserStore = BdApi.Webpack.getStore('UserStore');
    ApplicationCommandStore = BdApi.Webpack.getModule(
        (m) => m?.ZP?.getApplicationSections
    );
    TimestampUtils = BdApi.Webpack.getByKeys('fromTimestamp');
    IconUtils = BdApi.Webpack.getByKeys('getApplicationIconUrl');
    DiscordConstants = BdApi.Webpack.getModule((m) => m?.Plq?.ADMINISTRATOR == 8n);
    // i hate typescript~!
    CommandAPI: ApplicationCommandAPI | undefined = void 0;

    FakeMessage(channelId: string, content: string, embeds: unknown[]) {
        return {
            id: this.TimestampUtils.fromTimestamp(Date.now()),
            type: this.DiscordConstants.uaV.DEFAULT,
            flags: this.DiscordConstants.iLy.EPHEMERAL,
            content: content,
            channel_id: channelId,
            author: this.UserStore.getCurrentUser(),
            attachments: [],
            embeds: null != embeds ? embeds : [],
            pinned: false,
            mentions: [],
            mention_channels: [],
            mention_roles: [],
            mention_everyone: false,
            timestamp: new Date().toISOString(),
            state: this.DiscordConstants.yb.SENT,
            tts: false,
        };
    }

    start(): void {
        console.log('%c[FriendInvites]', 'color: #ff00ee', 'Plugin enabled!');
        this.CommandAPI = new ApplicationCommandAPI(this.ApplicationCommandStore, this.UserStore, this.IconUtils);

        const InstantInviteStore: {
            createFriendInvite(): Promise<Code>;
            revokeFriendInvite(id: string): Promise<void>;
            revokeFriendInvites(): Promise<void>;
            getAllFriendInvites(): Promise<Code[]>;
        } = BdApi.Webpack.getByKeys('createFriendInvite');

        const MessageModule: {
            receiveMessage(id: string, content: Record<string, unknown>): Promise<void> | void;
        } = BdApi.Webpack.getByKeys('sendBotMessage');



        console.log('%c[FriendInvites]', 'color: #ff00ee', 'Patching XMLHttpRequest to prevent sending requests to Discord from client-side slash commands. (oop)');
        BdApi.Patcher.before('FriendInvites', XMLHttpRequest.prototype, 'open', (data) => {
            // Holy type casting hell, if only Patcher (type wise) would let us pass what our data is from a generic.
            // if only.
            if((data as unknown[])[0] === 'GET' && ((data as unknown[])[1] as string).toLowerCase().includes('application-commands/search?type=1&query=invites')) {
                return;
            }
        });

        // typescript doesnt like me.
        // TODO: make this not bad.
        const FakeMessage = this.FakeMessage;

        function showErrorHappened(err: unknown, id: string) {
            MessageModule.receiveMessage(
                id,
                FakeMessage(
                    id,
                    '',
                    [
                        {
                            type: 'rich',
                            title: 'An unexpected error has occured',
                            description: `
                                Failed to preform that action...
                                \`\`\`
                                ${ err }
                                \`\`\`
                                `
                        }
                    ]
                )
            );
        }

        this.CommandAPI!.register('invites view', {
            name: 'invites view',
            displayName: 'invites view',
            name_localizations: void 0,
            description: 'View your active friend invites',
            displayDescription: 'View your active friend invites',
            description_localizations: void 0,
            type: 1,
            options: [],
            execute: async (_, { channel }) => {
                try {
                    InstantInviteStore.getAllFriendInvites().then((codes: Code[]) => {
                        const invitesString = codes.map((code) => `
                                **discord.gg/${ code.code }**
                                **Created:** <t:${ Math.round(new Date(code.created_at).getTime() / 1000) }:R>
                                **Expires:** <t:${ new Date(code.expires_at).getTime() / 1000 }:R> 
                                **Uses:** ${ code.uses }/${ code.max_uses }
                                `
                        );

                        MessageModule.receiveMessage(
                            channel.id,
                            this.FakeMessage(
                                channel.id,
                                '',
                                [
                                    {
                                        type: 'rich',
                                        title: `You have ${ codes.length < 1 ? 'no active friend invites!' : `${ codes.length.toLocaleString() } active ${ codes.length > 1 ? 'invites' : 'invite' }` }`,
                                        description: codes.length >= 1 ? invitesString.join('\n') : 'N/A',
                                    }
                                ]
                            )
                        );
                    }).catch((err) => showErrorHappened(err, channel.id));
                } catch(e) {
                    showErrorHappened(e, channel.id);
                    console.error(e);
                }
            },
        });

        this.CommandAPI.register('invites create', {
            name: 'invites create',
            displayName: 'invites create',
            name_localizations: void 0,
            description: 'Create a new friend invite',
            displayDescription: 'Create a new friend invite',
            description_localizations: void 0,
            type: 1,
            options: [],
            execute: async (_, { channel }) => {
                try {
                    InstantInviteStore.createFriendInvite().then((code: Code) => {
                        MessageModule.receiveMessage(
                            channel.id,
                            this.FakeMessage(
                                channel.id,
                                '',
                                [
                                    {
                                        type: 'rich',
                                        title: 'Created friend code (' + code.code + ')',
                                        description: `
                                            [Created new friend code! (${ code.code })](https://discord.gg/${ code.code })
                                            **discord.gg/${ code.code }**
                                            **Max Uses:** ${ code.max_uses }
                                            **Expires:** <t:${ new Date(code.expires_at).getTime() / 1000 }:R> 
                                            `
                                    }
                                ]
                            )
                        );
                    }).catch(err => showErrorHappened(err, channel.id));
                } catch(e) {
                    showErrorHappened(e, channel.id);
                    console.error(e);
                }
            }
        });

        this.CommandAPI!.register('invites delete', {
            name: 'invites delete',
            displayName: 'invites delete',
            name_localizations: void 0,
            description: 'Delete all active friend invites',
            displayDescription: 'Delete all active friend invites',
            description_localizations: void 0,
            type: 1,
            options: [],
            execute: async (_, { channel }) => {
                try {
                    InstantInviteStore.revokeFriendInvites().then(() => {
                        MessageModule.receiveMessage(
                            channel.id,
                            this.FakeMessage(
                                channel.id,
                                '',
                                [
                                    {
                                        type: 'rich',
                                        title: 'Deleted all invite codes',
                                        description: 'Little sad we can\'t delete individual ones :c'
                                    }
                                ]
                            )
                        );
                    }).catch((err) => showErrorHappened(err, channel.id));
                } catch(e) {
                    showErrorHappened(e, channel.id);
                    console.error(e);
                }
            },
        });
    }

    stop(): void {
    }
}