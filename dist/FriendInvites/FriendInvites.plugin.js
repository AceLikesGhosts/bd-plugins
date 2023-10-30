/**
* @name FriendInvites
* @description Simple friend-invites.
* @author ace.
* @version 1.2.0
* @source https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/FriendInvites.plugin.js
* @authorLink https://github.com/AceLikesGhosts/bd-plugins
* @authorId 327639826075484162
*/
require('./sourcemap-register.js');/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 339:
/***/ (function(__unused_webpack_module, exports) {


var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ApplicationCommandAPI_instances, _ApplicationCommandAPI_patchApplicationCommands, _ApplicationCommandAPI_patchIconUtils;
Object.defineProperty(exports, "__esModule", ({ value: true }));
class ApplicationCommandAPI {
    constructor(applicationCommandStore, userStore, iconUtils) {
        _ApplicationCommandAPI_instances.add(this);
        this.ApplicationCommandStore = applicationCommandStore;
        this.UserStore = userStore;
        this.IconUtils = iconUtils;
        this.commands = new Map();
        __classPrivateFieldGet(this, _ApplicationCommandAPI_instances, "m", _ApplicationCommandAPI_patchApplicationCommands).call(this);
        __classPrivateFieldGet(this, _ApplicationCommandAPI_instances, "m", _ApplicationCommandAPI_patchIconUtils).call(this);
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
    /**
     *
     * @param {string} name
     * @param {Record<string, unknown>} command
     */
    register(name, command) {
        command.applicationId = '-1';
        (command.id = `${this.CurrentUserSection.name}_${this.commands.size + 1}`.toLowerCase());
        this.commands.set(name, command);
        this.ApplicationCommandStore.ZP.shouldResetAll = true;
    }
    unregister() {
        this.commands.clear();
        this.ApplicationCommandStore.ZP.shouldResetAll = true;
    }
}
_ApplicationCommandAPI_instances = new WeakSet(), _ApplicationCommandAPI_patchApplicationCommands = function _ApplicationCommandAPI_patchApplicationCommands() {
    const BuiltInCommands = BdApi.Webpack.getModule((m) => m?.Kh?.toString?.()?.includes?.('BUILT_IN_TEXT'));
    BdApi.Patcher.after('FriendInvites', this.ApplicationCommandStore, 'JK', (_, _args, res) => {
        if (!res || !this.commands.size)
            return;
        if (!Array.isArray(res.sectionDescriptors) ||
            !res.sectionDescriptors.some(
            // eslint-disable-next-line eqeqeq
            (section) => section.id == this.CurrentUserSection.id))
            res.sectionDescriptors = Array.isArray(res.sectionDescriptors)
                ? res.sectionDescriptors.splice(1, 0, this.CurrentUserSection)
                : [this.CurrentUserSection];
        if (!Array.isArray(res.commands) ||
            Array.from(this.commands.values()).some((command) => !res.commands.includes(command)))
            res.commands = Array.isArray(res.commands)
                ? [
                    ...res.commands.filter((command) => !Array.from(this.commands.values()).includes(command)),
                    ...Array.from(this.commands.values()),
                ]
                : Array.from(this.commands.values());
        return res;
    });
    BdApi.Patcher.after('FriendInvites', this.ApplicationCommandStore.ZP, 'getChannelState', (_, _args, res) => {
        if (!res || !this.commands.size)
            return;
        if (!Array.isArray(res.applicationSections) ||
            !res.applicationSections.some(
            // eslint-disable-next-line eqeqeq
            (section) => section.id == this.CurrentUserSection.id))
            res.applicationSections = Array.isArray(res.applicationSections)
                ? [this.CurrentUserSection, ...res.applicationSections]
                : [this.CurrentUserSection];
        if (!Array.isArray(res.applicationCommands) ||
            Array.from(this.commands.values()).some((command) => !res.applicationCommands.includes(command)))
            return res;
    });
    BdApi.Patcher.after('FriendInvites', BuiltInCommands, 'Kh', (_, _args, res) => {
        return Array.isArray(res)
            ? [
                ...res.filter((command) => !Array.from(this.commands.values()).includes(command)),
                ...Array.from(this.commands.values()),
            ]
            : Array.from(this.commands.values());
    });
}, _ApplicationCommandAPI_patchIconUtils = function _ApplicationCommandAPI_patchIconUtils() {
    BdApi.Patcher.instead('FriendInvites', this.IconUtils, 'getApplicationIconURL', (_, args, res) => {
        if (args[0].id !== this.CurrentUserSection.id)
            return res(...args);
        return this.IconUtils.getUserAvatarURL(this.UserStore.getCurrentUser());
    });
};
class default_1 {
    constructor() {
        this.UserStore = BdApi.Webpack.getStore('UserStore');
        this.ApplicationCommandStore = BdApi.Webpack.getModule((m) => m?.ZP?.getApplicationSections);
        this.TimestampUtils = BdApi.Webpack.getByKeys('fromTimestamp');
        this.IconUtils = BdApi.Webpack.getByKeys('getApplicationIconUrl');
        // eslint-disable-next-line eqeqeq
        this.DiscordConstants = BdApi.Webpack.getModule((m) => m?.Plq?.ADMINISTRATOR == 8n);
        this.InstantInviteStore = BdApi.Webpack.getByKeys('createFriendInvite');
        this.MessageModule = BdApi.Webpack.getByKeys('sendBotMessage');
        // i hate typescript~!
        this.CommandAPI = void 0;
    }
    FakeMessage(channelId, content, embeds) {
        return {
            id: this.TimestampUtils.fromTimestamp(Date.now()),
            type: this.DiscordConstants.uaV.DEFAULT,
            flags: this.DiscordConstants.iLy.EPHEMERAL,
            content: content,
            channel_id: channelId,
            author: this.UserStore.getCurrentUser(),
            attachments: [],
            embeds: embeds !== null ? embeds : [],
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
    start() {
        console.log('%c[FriendInvites]', 'color: #ff00ee', 'Plugin enabled!');
        this.CommandAPI = new ApplicationCommandAPI(this.ApplicationCommandStore, this.UserStore, this.IconUtils);
        console.log('%c[FriendInvites]', 'color: #ff00ee', 'Patching XMLHttpRequest to prevent sending requests to Discord from client-side slash commands. (oop)');
        BdApi.Patcher.before('FriendInvites', XMLHttpRequest.prototype, 'open', (data) => {
            // Holy type casting hell, if only Patcher (type wise) would let us pass what our data is from a generic.
            // if only.
            if (data[0] === 'GET' && data[1].toLowerCase().includes('application-commands/search?type=1&query=invites')) {
                return;
            }
        });
        const showErrorHappened = (err, id) => {
            void this.MessageModule.receiveMessage(id, this.FakeMessage(id, '', [
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
            ]));
        };
        this.CommandAPI.register('invites view', {
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
                    this.InstantInviteStore.getAllFriendInvites().then((codes) => {
                        const invitesString = codes.map((code) => `
                                **discord.gg/${code.code}**
                                **Created:** <t:${Math.round(new Date(code.created_at).getTime() / 1000)}:R>
                                **Expires:** <t:${new Date(code.expires_at).getTime() / 1000}:R> 
                                **Uses:** ${code.uses}/${code.max_uses}
                                `);
                        void this.MessageModule.receiveMessage(channel.id, this.FakeMessage(channel.id, '', [
                            {
                                type: 'rich',
                                title: `You have ${codes.length < 1 ? 'no active friend invites!' : `${codes.length.toLocaleString()} active ${codes.length > 1 ? 'invites' : 'invite'}`}`,
                                description: codes.length >= 1 ? invitesString.join('\n') : 'N/A',
                            }
                        ]));
                    }).catch((err) => showErrorHappened(err, channel.id));
                }
                catch (e) {
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
                if (!this.UserStore.getCurrentUser().phone) {
                    void this.MessageModule.receiveMessage(channel.id, this.FakeMessage(channel.id, '', [
                        {
                            type: 'rich',
                            title: 'Creating friend invites requires having a mobile phone number connected to your account.',
                            content: ''
                        }
                    ]));
                    return;
                }
                try {
                    this.InstantInviteStore.createFriendInvite().then((code) => {
                        void this.MessageModule.receiveMessage(channel.id, this.FakeMessage(channel.id, '', [
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
                        ]));
                    }).catch(err => showErrorHappened(err, channel.id));
                }
                catch (e) {
                    showErrorHappened(e, channel.id);
                    console.error(e);
                }
            }
        });
        this.CommandAPI.register('invites delete', {
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
                    this.InstantInviteStore.revokeFriendInvites().then(() => {
                        void this.MessageModule.receiveMessage(channel.id, this.FakeMessage(channel.id, '', [
                            {
                                type: 'rich',
                                title: 'Deleted all invite codes',
                                description: 'Little sad we can\'t delete individual ones :c'
                            }
                        ]));
                    }).catch((err) => showErrorHappened(err, channel.id));
                }
                catch (e) {
                    showErrorHappened(e, channel.id);
                    console.error(e);
                }
            },
        });
    }
    stop() {
        this.CommandAPI?.unregister();
        BdApi.Patcher.unpatchAll('FriendInvites');
    }
}
exports["default"] = default_1;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__[339](0, __webpack_exports__);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map