/**
 * @param {import("zerespluginlibrary").Plugin} Plugin 
 * @param {import("zerespluginlibrary").BoundAPI} Library 
 * @returns 
 */
module.exports = (Plugin, Library) => {
    const { Logger, Patcher, WebpackModules } = Library;

    //#region gracefully stolen from Tharki <3
    // https://github.com/Tharki-God/BetterDiscordPlugins
    const UserStore = WebpackModules.getByProps("getCurrentUser", "getUser");
    const ApplicationCommandStore = WebpackModules.getModule(
        (m) => m?.ZP?.getApplicationSections
    );

    const TimestampUtils = WebpackModules.getByProps("fromTimestamp");
    const DiscordConstants = WebpackModules.getModule((m) => m?.Plq?.ADMINISTRATOR == 8n);

    const IconUtils = WebpackModules.getByProps("getApplicationIconURL");

    function FakeMessage(channelId, content, embeds) {
        return {
            id: TimestampUtils.fromTimestamp(Date.now()),
            type: DiscordConstants.uaV.DEFAULT,
            flags: DiscordConstants.iLy.EPHEMERAL,
            content: content,
            channel_id: channelId,
            author: UserStore.getCurrentUser(),
            attachments: [],
            embeds: null != embeds ? embeds : [],
            pinned: false,
            mentions: [],
            mention_channels: [],
            mention_roles: [],
            mention_everyone: false,
            timestamp: new Date().toISOString(),
            state: DiscordConstants.yb.SENT,
            tts: false,
        };
    }

    const ApplicationCommandAPI = new (class ApplicationCommandAPI {
        constructor() {
            this.commands = new Map();
            this.#patchApplicationCommands();
            this.#patchIconUtils();
        }
        get CurrentUserSection() {
            const CurrentUser = UserStore.getCurrentUser();
            return {
                id: CurrentUser.id,
                name: CurrentUser.username,
                type: 1,
                icon: CurrentUser.avatar,
            };
        }

        #patchApplicationCommands() {
            const BuiltInCommands = WebpackModules.getModule((m) =>
                m?.Kh?.toString?.()?.includes?.("BUILT_IN_TEXT")
            );

            Patcher.after(ApplicationCommandStore, "JK", (_, args, res) => {
                if(!res || !this.commands.size) return;

                if(
                    !Array.isArray(res.sectionDescriptors) ||
                    !res.sectionDescriptors.some(
                        (section) => section.id == this.CurrentUserSection.id
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
                                (command) =>
                                    !Array.from(this.commands.values()).includes(command)
                            ),
                            ...Array.from(this.commands.values()),
                        ]
                        : Array.from(this.commands.values());
                return res;
            });
            Patcher.after(
                ApplicationCommandStore.ZP,
                "getChannelState",
                (_, args, res) => {
                    if(!res || !this.commands.size) return;
                    if(
                        !Array.isArray(res.applicationSections) ||
                        !res.applicationSections.some(
                            (section) => section.id == this.CurrentUserSection.id
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
            Patcher.after(BuiltInCommands, "Kh", (_, args, res) => {
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
            Patcher.instead(
                IconUtils,
                "getApplicationIconURL",
                (_, args, res) => {
                    if(args[0].id !== this.CurrentUserSection.id)
                        return res(...args);
                    return IconUtils.getUserAvatarURL(UserStore.getCurrentUser());
                }
            );
        }

        register(name, command) {
            command.applicationId = '-1';
            (command.id = `${this.CurrentUserSection.name}_${this.commands.size + 1
                }`.toLowerCase());
            this.commands.set(name, command);
            ApplicationCommandStore.ZP.shouldResetAll = true;
        }
        unregister() {
            this.commands.clear();
            ApplicationCommandStore.ZP.shouldResetAll = true;
        }
    })();
    //#endregion

    return class extends Plugin {

        onStart() {
            Logger.info("Plugin enabled!");

            /**
             * @type {{
             *  createFriendInvite(): Promise<string>;
             *  revokeFriendInvite(id: string): Promise<void>;
             *  revokeFriendInvites(): Promise<void>;
             *  getAllFriendInvites(): Promise<string>;
             * }}
             */
            const iis = WebpackModules.getByProps('createFriendInvite');
            const channelModuleThingIg = BdApi.findModuleByProps('sendBotMessage');

            Logger.log('Patching XMLHttpRequest to stop from sending requests for client-side slash commands.');

            // Prevent slashies registered on client side by this from hitting Discord's servers (yayyy.)
            Patcher.before(XMLHttpRequest.prototype, 'open', (data) => {
                if(data[0] === 'GET' && data[1].toLowerCase().includes('application-commands/search?type=1&query=invites')) {
                    return;
                }
            });

            function showErrorHappened(err, id) {
                channelModuleThingIg.receiveMessage(
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
                                ${err}
                                \`\`\`
                                `
                            }
                        ]
                    )
                );
            }

            ApplicationCommandAPI.register('invites view', {
                name: 'invites view',
                displayName: 'invites view',
                name_localizations: undefined,
                description: 'View your active friend invites',
                displayDescription: 'View your active friend invites',
                description_localizations: undefined,
                inputType: 0,
                options: [],
                execute: async (_, { channel }) => {
                    try {
                        iis.getAllFriendInvites().then((/** @type {{  code: string; created_at: string; expires_at: string; max_uses: number; uses: number }[]} */ codes) => {
                            const invitesString = codes.map((code) =>
                                `
                                **discord.gg/${code.code}**
                                **Created:** <t:${Math.round(new Date(code.created_at).getTime() / 1000)}:R>
                                **Expires:** <t:${new Date(code.expires_at).getTime() / 1000}:R> 
                                **Uses:** ${code.uses}/${code.max_uses}
                                `
                            );

                            const TITLE = `You have ${codes.length < 1 ? 'no active friend invites!' : `${codes.length.toLocaleString()} active ${codes.length > 1 ? 'invites' : 'invite'}`}`

                            channelModuleThingIg.receiveMessage(
                                channel.id,
                                FakeMessage(
                                    channel.id,
                                    '',
                                    [
                                        {
                                            type: 'rich',
                                            title: TITLE,
                                            description: codes.length >= 1 ? invitesString.join('\n') : 'N/A',
                                        }
                                    ]
                                )
                            )
                        }).catch((err) => showErrorHappened(err, channel.id));
                    } catch(e) {
                        showErrorHappened(e, channel.id);
                        Logger.err(e);
                    }
                }
            });

            ApplicationCommandAPI.register('invites create', {
                name: 'invites create',
                displayName: 'invites create',
                name_localizations: undefined,
                description: 'Create a new friend invite',
                displayDescription: 'Create a new friend invite',
                description_localizations: undefined,
                inputType: 0,
                options: [],
                execute: async (_, { channel }) => {
                    try {

                        iis.createFriendInvite().then(( /** @type {{ code: string; expires_at: string; max_uses: number }} */ code) => {
                            channelModuleThingIg.receiveMessage(
                                channel.id,
                                FakeMessage(
                                    channel.id,
                                    '',
                                    [
                                        {
                                            type: 'rich',
                                            title: 'Created friend code (' + code.code + ')',
                                            description: `
                                            [Created new friend code! (${code.code})](https://discord.gg/${code.code})
                                            **discord.gg/${code.code}**
                                            **Max Uses:** ${code.max_uses}
                                            **Expires:** <t:${new Date(code.expires_at).getTime() / 1000}:R> 
                                            `
                                        }
                                    ]
                                )
                            )
                        }).catch(err => showErrorHappened(err, channel.id));
                    } catch(e) {
                        showErrorHappened(e, channel.id)
                        Logger.err(e);
                    }
                }
            });

            ApplicationCommandAPI.register('invites delete', {
                name: 'invites delete',
                displayName: 'invites delete',
                name_localizations: undefined,
                description: 'Delete all active friend invites',
                displayDescription: 'Delete all active friend invites',
                description_localizations: undefined,
                inputType: 0,
                options: [],
                execute: async (_, { channel }) => {
                    try {
                        iis.revokeFriendInvites().then(() => {
                            channelModuleThingIg.receiveMessage(
                                channel.id,
                                FakeMessage(
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
                            )
                        }).catch((err) => showErrorHappened(err, channel.id));
                    } catch(e) {
                        showErrorHappened(e, channel.id)
                        Logger.err(e);
                    }
                }
            });
        }

        onStop() {
            Logger.info("Plugin disabled!");
            ApplicationCommandAPI.unregister();
            Patcher.unpatchAll();
        }
    };
};

