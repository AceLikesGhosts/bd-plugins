/**
 * @name FriendInvites
 * @description Simple friend-invites.
 * @version 1.0.0
 * @author ace.
 * @authorId 249746236008169473
 * @website https://github.com/acelikesghosts/bd-plugins
 * @source https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/FriendInvites.plugin.js
 */
/*@cc_on
@if (@_jscript)
    
    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\\BetterDiscord\\plugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
    } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
    }
    WScript.Quit();

@else@*/
const config = {
    info: {
        name: "FriendInvites",
        authors: [
            {
                name: "ace.",
                discord_id: "249746236008169473",
                github_username: "acelikesghosts",
                twitter_username: "uncarcrashable"
            }
        ],
        version: "1.0.0",
        description: "Simple friend-invites.",
        github: "https://github.com/acelikesghosts/bd-plugins",
        github_raw: "https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/FriendInvites.plugin.js"
    },
    main: "index.js"
};
class Dummy {
    constructor() {this._config = config;}
    start() {}
    stop() {}
}
 
if (!global.ZeresPluginLibrary) {
    BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.name ?? config.info.name} is missing. Please click Download Now to install it.`, {
        confirmText: "Download Now",
        cancelText: "Cancel",
        onConfirm: () => {
            require("request").get("https://betterdiscord.app/gh-redirect?id=9", async (err, resp, body) => {
                if (err) return require("electron").shell.openExternal("https://betterdiscord.app/Download?id=9");
                if (resp.statusCode === 302) {
                    require("request").get(resp.headers.location, async (error, response, content) => {
                        if (error) return require("electron").shell.openExternal("https://betterdiscord.app/Download?id=9");
                        await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), content, r));
                    });
                }
                else {
                    await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                }
            });
        }
    });
}
 
module.exports = !global.ZeresPluginLibrary ? Dummy : (([Plugin, Api]) => {
     const plugin = (Plugin, Library) => {
    const { Logger, Patcher, WebpackModules } = Library;

    const UserStore = WebpackModules.getByProps('getCurrentUser', 'getUser');
    const ApplicationCommandStore = WebpackModules.getModule(
        (m) => m?.ZP?.getApplicationSections
    );

    const TimestampUtils = WebpackModules.getByProps('fromTimestamp');
    const DiscordConstants = WebpackModules.getModule((m) => m?.Plq?.ADMINISTRATOR == 8n);

    const IconUtils = WebpackModules.getByProps('getApplicationIconURL');

    //#region gracefully stolen from Tharki <3
    // https://github.com/Tharki-God/BetterDiscordPlugins
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
                m?.Kh?.toString?.()?.includes?.('BUILT_IN_TEXT')
            );

            Patcher.after(ApplicationCommandStore, 'JK', (_, args, res) => {
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
                'getChannelState',
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
            Patcher.after(BuiltInCommands, 'Kh', (_, args, res) => {
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
                'getApplicationIconURL',
                (_, args, res) => {
                    if(args[0].id !== this.CurrentUserSection.id)
                        return res(...args);
                    return IconUtils.getUserAvatarURL(UserStore.getCurrentUser());
                }
            );
        }

        /**
         * 
         * @param {string} name 
         * @param {Record<string, unknown>} command 
         */
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
            Logger.info('Plugin enabled!');

            /**
             * @type {{
             *  createFriendInvite(): Promise<string>;
             *  revokeFriendInvite(id: string): Promise<void>;
             *  revokeFriendInvites(): Promise<void>;
             *  getAllFriendInvites(): Promise<string>;
             * }}
             */
            const InstantInviteStore = WebpackModules.getByProps('createFriendInvite');
            /**
             * @type {{
             *  receiveMessage(id: string, content: Record<string, unknown>): Promise<void> | void;
             * }}
             */
            const MessageModule = BdApi.findModuleByProps('sendBotMessage');

            Logger.log('Patching XMLHttpRequest to stop from sending requests for client-side slash commands.');

            // Prevent slashies registered on client side by this from hitting Discord's servers (yayyy.)
            Patcher.before(XMLHttpRequest.prototype, 'open', (data) => {
                if(data[0] === 'GET' && data[1].toLowerCase().includes('application-commands/search?type=1&query=invites')) {
                    return;
                }
            });

            function showErrorHappened(err, id) {
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
                execute: async (_, /** @type { { channel: { id: string } } } */ { channel }) => {
                    try {
                        InstantInviteStore.getAllFriendInvites().then((/** @type {{  code: string; created_at: string; expires_at: string; max_uses: number; uses: number }[]} */ codes) => {
                            const invitesString = codes.map((code) =>
                                `
                                **discord.gg/${code.code}**
                                **Created:** <t:${Math.round(new Date(code.created_at).getTime() / 1000)}:R>
                                **Expires:** <t:${new Date(code.expires_at).getTime() / 1000}:R> 
                                **Uses:** ${code.uses}/${code.max_uses}
                                `
                            );

                            MessageModule.receiveMessage(
                                channel.id,
                                FakeMessage(
                                    channel.id,
                                    '',
                                    [
                                        {
                                            type: 'rich',
                                            title: `You have ${codes.length < 1 ? 'no active friend invites!' : `${codes.length.toLocaleString()} active ${codes.length > 1 ? 'invites' : 'invite'}`}`,
                                            description: codes.length >= 1 ? invitesString.join('\n') : 'N/A',
                                        }
                                    ]
                                )
                            );
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
                execute: async (_, /** @type { { channel: { id: string } } } */ { channel }) => {
                    try {
                        InstantInviteStore.createFriendInvite().then(( /** @type {{ code: string; expires_at: string; max_uses: number }} */ code) => {
                            MessageModule.receiveMessage(
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
                            );
                        }).catch(err => showErrorHappened(err, channel.id));
                    } catch(e) {
                        showErrorHappened(e, channel.id);
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
                execute: async (_, /** @type { { channel: { id: string } } } */ { channel }) => {
                    try {
                        InstantInviteStore.revokeFriendInvites().then(() => {
                            MessageModule.receiveMessage(
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
                            );
                        }).catch((err) => showErrorHappened(err, channel.id));
                    } catch(e) {
                        showErrorHappened(e, channel.id);
                        Logger.err(e);
                    }
                }
            });
        }

        onStop() {
            Logger.info('Plugin disabled!');
            ApplicationCommandAPI.unregister();
            Patcher.unpatchAll();
        }
    };
};
     return plugin(Plugin, Api);
})(global.ZeresPluginLibrary.buildPlugin(config));
/*@end@*/