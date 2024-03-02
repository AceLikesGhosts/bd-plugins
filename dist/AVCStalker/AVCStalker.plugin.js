/**
* @name AVCStalker
* @description In God we trust.
* @author ace.
* @version 2.1.0
* @source https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/AVCStalker/AVCStalker.plugin.js
* @authorLink https://github.com/AceLikesGhosts/bd-plugins
* @website https://github.com/AceLikesGhosts/bd-plugins
* @updateLink https://github.com/AceLikesGhosts/bd-plugins
* @authorId 327639826075484162
*/
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 317:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = BdApi.Webpack.getByKeys('debounce');


/***/ }),

/***/ 219:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const _1 = __nccwpck_require__(799);
exports["default"] = {
    Avatar: _1.RawComponents.Avatar,
    AvatarSizes: BdApi.Webpack.getByKeys('AvatarSizes')?.AvatarSizes
};


/***/ }),

/***/ 776:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const _1 = __nccwpck_require__(799);
exports["default"] = _1.RawComponents.Button;


/***/ }),

/***/ 348:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = BdApi.Webpack.getByKeys('Child', 'Justify');


/***/ }),

/***/ 281:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FormNotice = exports.FormSwitch = exports.FormDivider = exports.FormLabel = exports.FormText = exports.FormTitle = exports.FormItem = exports.FormSection = void 0;
const _1 = __nccwpck_require__(799);
_a = _1.RawComponents, exports.FormSection = _a.FormSection, exports.FormItem = _a.FormItem, exports.FormTitle = _a.FormTitle, exports.FormText = _a.FormText, exports.FormLabel = _a.FormLabel, exports.FormDivider = _a.FormDivider, exports.FormSwitch = _a.FormSwitch, exports.FormNotice = _a.FormNotice;


/***/ }),

/***/ 419:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const _1 = __nccwpck_require__(799);
const { Switch: RawSwitch } = _1.RawComponents;
exports["default"] = RawSwitch;


/***/ }),

/***/ 921:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const _1 = __nccwpck_require__(799);
exports["default"] = _1.RawComponents.Text;


/***/ }),

/***/ 571:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const _1 = __nccwpck_require__(799);
const { TextInput } = _1.RawComponents;
exports["default"] = TextInput;


/***/ }),

/***/ 671:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = BdApi.Webpack.getByStrings('MESSAGE_EDITED_TIMESTAMP_A11Y_LABEL');


/***/ }),

/***/ 799:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.React = exports.Margins = exports.RawComponents = void 0;
exports.RawComponents = BdApi.Webpack.getByKeys('Button', 'Switch', 'Select');
exports.Margins = BdApi.Webpack.getByKeys('marginBottom40', 'marginTop4');
exports.React = BdApi.React;


/***/ }),

/***/ 95:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DefaultColors = void 0;
/** @__PURE__ */
exports.DefaultColors = {
    PLUGIN_NAME: 'color: purple; font-weight: bold;',
    PLUGIN_VERSION: 'color: gray; font-size: 10px;'
};
function isError(err) {
    return err instanceof Error;
}
function getErrorMessage(error) {
    return `${error.name}: ${error.message}\nAt: ${error.stack}`;
}
class Logger {
    constructor(meta, colors = exports.DefaultColors) {
        this._meta = meta;
        this._colors = colors;
    }
    print(type, message, ...data) {
        console[type](`%c[${this._meta.name}]%c(v${this._meta.version})`, this._colors.PLUGIN_NAME, this._colors.PLUGIN_VERSION, message, ...data);
    }
    debug(message, ...data) {
        return this.print('debug', message, ...data);
    }
    log(message, ...data) {
        return this.info(message, ...data);
    }
    info(message, ...data) {
        return this.print('log', isError(message) ? getErrorMessage(message) : message, ...data);
    }
    warn(message, ...data) {
        return this.print('warn', isError(message) ? getErrorMessage(message) : message, ...data);
    }
    error(message, ...data) {
        return this.critical(message, ...data);
    }
    critical(message, ...data) {
        return this.print('error', isError(message) ? getErrorMessage(message) : message, ...data);
    }
}
exports["default"] = Logger;


/***/ }),

/***/ 115:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = BdApi.Webpack.getByKeys('_currentDispatchActionType', '_processingWaitQueue');


/***/ }),

/***/ 336:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const components_1 = __nccwpck_require__(799);
exports["default"] = {
    openModal: components_1.RawComponents.openModal,
    closeModal: components_1.RawComponents.closeModal,
    ModalRoot: components_1.RawComponents.ModalRoot,
    ModalSize: components_1.RawComponents.ModalSize
};


/***/ }),

/***/ 873:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = BdApi.Webpack.getByKeys('transitionTo');


/***/ }),

/***/ 432:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = BdApi.Webpack.getStore('ChannelStore');


/***/ }),

/***/ 866:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = BdApi.Webpack.getStore('GuildStore');


/***/ }),

/***/ 366:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = BdApi.Webpack.getStore('RelationshipStore');


/***/ }),

/***/ 771:
/***/ ((__unused_webpack_module, exports) => {


// this is actually the raw classes of
// the dispatcher, store, and some store utils
// but those are already exported
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = BdApi.Webpack.getByKeys('Store', 'useStateFromStores');


/***/ }),

/***/ 682:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = BdApi.Webpack.getStore('UserStore');


/***/ }),

/***/ 979:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = BdApi.Webpack.getByKeys('getVoiceStateForUser');


/***/ }),

/***/ 118:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const components_1 = __nccwpck_require__(799);
const __1 = __importStar(__nccwpck_require__(65));
const UserStore_1 = __importDefault(__nccwpck_require__(682));
const Following_1 = __nccwpck_require__(343);
const PanelButton = BdApi.Webpack.getByStrings('Masks.PANEL_BUTTON');
function ClearFollowing() {
    function clearFollowingPeople() {
        if (!__1.default.settings.voiceChatFollowing.clickVoiceChatButtonClears)
            return;
        BdApi.UI.showToast('Cleared following list', { type: 'success' });
        Following_1.followingPeople.clear();
    }
    function removeFromFollowing(id, username) {
        Following_1.followingPeople.delete(id);
        BdApi.UI.showToast(`Removed ${username} from following queue`);
    }
    return components_1.React.createElement(PanelButton, { icon: (() => components_1.React.createElement("svg", { viewBox: '0 0 24 24', height: 20, width: 20, dangerouslySetInnerHTML: { __html: __1.Icons.GoPeople } })), tooltipText: 'Clear Following', onClick: (() => clearFollowingPeople()), onContextMenu: (e) => {
            const menuItems = [];
            if (Following_1.followingPeople.size === 0)
                menuItems.push({
                    type: 'text',
                    label: 'You are not following anybody',
                    action: () => void 0
                });
            else
                Following_1.followingPeople.forEach((userId) => {
                    const user = UserStore_1.default.getUser(userId);
                    menuItems.push({
                        type: 'text',
                        label: `${user.globalName} (${user.username})`,
                        action: () => {
                            removeFromFollowing(user.id, user.username);
                        }
                    });
                });
            const menu = BdApi.ContextMenu.buildMenu([
                {
                    label: 'Click to remove from following'
                },
                {
                    type: 'group',
                    items: menuItems
                },
                {
                    type: 'separator'
                },
                {
                    type: 'text',
                    label: 'Clear Following',
                    action: () => clearFollowingPeople()
                }
            ]);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            BdApi.ContextMenu.open(e, menu, {
                align: 'top'
            });
        } });
}
exports["default"] = ClearFollowing;


/***/ }),

/***/ 902:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const index_1 = __nccwpck_require__(799);
const __1 = __nccwpck_require__(65);
const VoiceStateStore_1 = __importDefault(__nccwpck_require__(979));
const ChannelStore_1 = __importDefault(__nccwpck_require__(432));
const Transitions_1 = __importDefault(__nccwpck_require__(873));
const StoreUtils_1 = __importDefault(__nccwpck_require__(771));
const DiscordTooltip = BdApi.Components.Tooltip;
function JoinVcIcon({ userId }) {
    const voiceData = StoreUtils_1.default.useStateFromStores([VoiceStateStore_1.default], () => [VoiceStateStore_1.default.getVoiceStateForUser(userId)] ?? 0);
    const [channel, setChannel] = index_1.React.useState(ChannelStore_1.default.getChannel(voiceData[0]?.channelId ?? '0'));
    const [peopleInVC, setGuildChannelLength] = index_1.React.useState(1);
    index_1.React.useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        setGuildChannelLength(Object.keys(VoiceStateStore_1.default.getVoiceStatesForChannel(voiceData[0]?.channelId) ?? { hi: 'u-shouldnt-see-this' }).length);
        setChannel(ChannelStore_1.default.getChannel(voiceData[0]?.channelId ?? '0'));
    }, [voiceData]);
    return (index_1.React.createElement(index_1.React.Fragment, null, voiceData[0]?.channelId ? index_1.React.createElement(DiscordTooltip, { text: 'Voice Channel' }, (props) => index_1.React.createElement("div", { ...props },
        index_1.React.createElement("svg", { width: 24, height: 24, role: 'img', 
            // this is only able to be set to a set string from `icons` so this is fine
            dangerouslySetInnerHTML: {
                __html: peopleInVC === 1 ?
                    __1.Icons.GaUser :
                    __1.Icons.GaUserAdd
            }, onClick: (() => {
                if (voiceData[0]?.channelId) {
                    Transitions_1.default.transitionToGuild(channel.guild_id, voiceData[0].channelId);
                }
                else
                    BdApi.UI.showToast('Failed to locate the voice channel they are in', { type: 'error' });
            }) }))) : index_1.React.createElement("div", { id: 'hi-you-shouldnt-ever-see-this-div-lol' })));
}
exports["default"] = JoinVcIcon;


/***/ }),

/***/ 423:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const index_1 = __nccwpck_require__(799);
const __1 = __importStar(__nccwpck_require__(65));
const components_1 = __nccwpck_require__(799);
const Form_1 = __nccwpck_require__(281);
const TextInput_1 = __importDefault(__nccwpck_require__(571));
const Lodash_1 = __importDefault(__nccwpck_require__(317));
function TextInput(props) {
    return (index_1.React.createElement(Form_1.FormItem, { style: {
            width: '50%'
        }, className: components_1.Margins.marginBottom20, ...props },
        index_1.React.createElement(TextInput_1.default, { ...props })));
}
function Settings() {
    const [clickVoiceChatButtonClears, setClickVoiceChatButtonClears] = index_1.React.useState(__1.default.settings.voiceChatFollowing.clickVoiceChatButtonClears ?? __1.DefaultSettings.voiceChatFollowing.clickVoiceChatButtonClears);
    const [userPopout, setUserPopout] = index_1.React.useState(__1.default.settings.userPopout ?? __1.DefaultSettings.userPopout);
    const [isVCLoggingEnabled, setVCLoggingEnabled] = index_1.React.useState(__1.default.settings.vcLogging.enabled);
    const [vcLoggingMaxSize, setVCLoggingMaxSize] = index_1.React.useState(__1.default.settings.vcLogging.maxSize);
    const [logFriends, setLogFriends] = index_1.React.useState(__1.default.settings.vcLogging.logFriends);
    const [logCorrelatedPeople, setLogCorrelatedPeople] = index_1.React.useState(__1.default.settings.vcLogging.logCorrelatedPeople);
    const [filePath, setFilePath] = index_1.React.useState(__1.default.settings.vcLogging.filePath);
    const [isInvidual, setInvididual] = index_1.React.useState(__1.default.settings.contextMenu.individual);
    const [showLogButton, setShowLogButton] = index_1.React.useState(__1.default.settings.contextMenu.showLogButton);
    const [showWhitelistButton, setShowWhitelistButton] = index_1.React.useState(__1.default.settings.contextMenu.showWhitelistButton);
    const [contextName, setContextName] = index_1.React.useState(__1.default.settings.contextMenu.name);
    index_1.React.useEffect(() => {
        __1.default.settings = {
            voiceChatFollowing: {
                clickVoiceChatButtonClears
            },
            userPopout,
            vcLogging: {
                enabled: isVCLoggingEnabled,
                maxSize: vcLoggingMaxSize,
                whitelisted: __1.default.settings.vcLogging.whitelisted,
                logFriends,
                filePath,
                logCorrelatedPeople
            },
            contextMenu: {
                individual: isInvidual,
                showLogButton,
                name: contextName,
                showWhitelistButton
            }
        };
    }, [
        clickVoiceChatButtonClears,
        userPopout,
        isVCLoggingEnabled,
        vcLoggingMaxSize,
        logFriends,
        isInvidual,
        contextName,
        showWhitelistButton,
        showLogButton
    ]);
    return (index_1.React.createElement("div", null,
        index_1.React.createElement(Form_1.FormTitle, { tag: 'h2' }, "General Settings"),
        index_1.React.createElement(Form_1.FormSwitch, { value: clickVoiceChatButtonClears, onChange: ((e) => setClickVoiceChatButtonClears(e)), note: 'Should clicking the following button clear the following list? Setting made for Ollie.' }, "Following Button Clearing"),
        index_1.React.createElement(Form_1.FormSwitch, { note: 'Should we show what voice channels someone is in on their user popout?', value: userPopout, onChange: ((e) => setUserPopout(e)) }, "User Popout"),
        index_1.React.createElement(Form_1.FormDivider, null),
        index_1.React.createElement(Form_1.FormTitle, { tag: 'h2' }, "Voice Chat Logging"),
        index_1.React.createElement(Form_1.FormSwitch, { note: 'Should we log out voice states for later analysis?', value: isVCLoggingEnabled, onChange: ((e) => setVCLoggingEnabled(e)) }, "Enable Logging"),
        index_1.React.createElement(TextInput, { title: 'Maximum File Size (megabytes)', value: String(vcLoggingMaxSize), disabled: true, onChange: ((e) => {
                if (!Lodash_1.default.isNumber(e))
                    return;
                setVCLoggingMaxSize(Number(e));
            }) }),
        index_1.React.createElement(Form_1.FormSwitch, { note: 'Should we always log friend\'s voice states?', value: logFriends, onChange: ((e) => setLogFriends(e)) }, "Log Friends"),
        index_1.React.createElement(Form_1.FormSwitch, { note: 'Should we attempt to check if someone we have whitelisted/friended is in their call and log their state if so? WARNING: THIS WILL LAG YOUR DISCORD IF YOU ARE IN BIG SERVERS!', value: logCorrelatedPeople, onChange: ((e) => setLogCorrelatedPeople(e)) }, "Log Correlated People"),
        index_1.React.createElement(TextInput, { title: 'The location where we should save our VoiceState logs. Use "%plugins%" for plugin folder.', value: filePath, onChange: ((e) => setFilePath(e)) }),
        index_1.React.createElement(Form_1.FormDivider, null),
        index_1.React.createElement(Form_1.FormTitle, { tag: 'h2' }, "Context Menu"),
        index_1.React.createElement(Form_1.FormSwitch, { note: 'Makes each button show as an individual button on the context menu rather than under a group.', value: isInvidual, onChange: ((e) => setInvididual(e)) }, "Individual Context Menu Buttons"),
        index_1.React.createElement(Form_1.FormSwitch, { note: 'Should we show a button to open voice state logs on the user context menu?', value: showLogButton, onChange: ((e) => setShowLogButton(e)) }, "Show Log Button"),
        index_1.React.createElement(Form_1.FormSwitch, { note: 'Should we show a button that allows for adding a user to our active VoiceState logging?', value: showWhitelistButton, onChange: ((e) => setShowWhitelistButton(e)) }, "Show VoiceLog Whitelist Button"),
        index_1.React.createElement(TextInput, { title: 'Context Menu Name', disabled: isInvidual, value: contextName, onChange: ((e) => {
                setContextName(e);
            }) })));
}
exports["default"] = Settings;


/***/ }),

/***/ 150:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const components_1 = __nccwpck_require__(799);
const ModalsModule_1 = __importDefault(__nccwpck_require__(336));
const ModalSettings_1 = __importDefault(__nccwpck_require__(180));
const ModalData_1 = __importDefault(__nccwpck_require__(887));
const Form_1 = __nccwpck_require__(281);
function Modal(props) {
    const [userIds, setUserIds] = components_1.React.useState([props.userId]);
    const [showCorrelated, setShowCorrelated] = components_1.React.useState(true);
    return (components_1.React.createElement(ModalsModule_1.default.ModalRoot, { size: ModalsModule_1.default.ModalSize.LARGE, ...props },
        components_1.React.createElement(ModalSettings_1.default, { userIds: userIds, setUserIds: setUserIds, showCorrelated: showCorrelated, setShowCorrelated: setShowCorrelated }),
        components_1.React.createElement(Form_1.FormDivider, null),
        components_1.React.createElement(ModalData_1.default, { userIds: userIds, showCorrelated: showCorrelated })));
}
exports["default"] = Modal;


/***/ }),

/***/ 887:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const components_1 = __nccwpck_require__(799);
const ModalRepVoiceState_1 = __importDefault(__nccwpck_require__(20));
const data_1 = __nccwpck_require__(496);
const Form_1 = __nccwpck_require__(281);
function ModalData(props) {
    const [data, setData] = components_1.React.useState(getData());
    components_1.React.useEffect(() => {
        // 10/10 code
        setData(getData());
    }, [props.userIds, props.showCorrelated]);
    function getData() {
        const output = [];
        for (let i = 0; i < props.userIds.length; i++) {
            const data = (0, data_1.get)(props.userIds[i]);
            const userStates = [];
            let prevState = null;
            for (let j = 0; j < data.length; j++) {
                const newState = data[j];
                if (!props.showCorrelated && !props.userIds.includes(newState.userId))
                    continue;
                if (prevState)
                    userStates.push({ newestState: newState, lastState: prevState });
                prevState = newState;
            }
            output.push(...userStates);
        }
        output.sort((x, y) => y.newestState.when - x.newestState.when);
        return output;
    }
    return (components_1.React.createElement("div", { style: { marginTop: '10px', overflowY: 'scroll', overflowX: 'hidden' } }, !!data.length ?
        data.map((states) => components_1.React.createElement(ModalRepVoiceState_1.default, { newestState: states.newestState, lastState: states.lastState })) : components_1.React.createElement(Form_1.FormText, { style: { marginLeft: '16px' }, type: 'h1' }, "No data to display...")));
}
exports["default"] = ModalData;


/***/ }),

/***/ 20:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const components_1 = __nccwpck_require__(799);
const Flex_1 = __importDefault(__nccwpck_require__(348));
const Avatar_1 = __importDefault(__nccwpck_require__(219));
const Text_1 = __importDefault(__nccwpck_require__(921));
const Timestamp_1 = __importDefault(__nccwpck_require__(671));
const UserStore_1 = __importDefault(__nccwpck_require__(682));
const voiceState_1 = __nccwpck_require__(414);
function ModalRepVoiceState({ newestState, lastState }) {
    const user = UserStore_1.default.getUser(newestState.userId);
    return (components_1.React.createElement(Flex_1.default, { direction: Flex_1.default.Direction.HORIZONTAL, align: Flex_1.default.Align.START, style: { marginLeft: '16px' } },
        components_1.React.createElement(Flex_1.default, { direction: Flex_1.default.Direction.HORIZONTAL, align: Flex_1.default.Align.CENTER },
            components_1.React.createElement(Avatar_1.default.Avatar, { src: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`, size: Avatar_1.default.AvatarSizes.SIZE_32, status: null }),
            components_1.React.createElement(Flex_1.default, { direction: Flex_1.default.Direction.HORIZONTAL, style: { width: '75%', maxWidth: '800px' } },
                components_1.React.createElement("div", { onClick: (() => {
                        window.DiscordNative.clipboard.copy(user.id);
                        BdApi.UI.showToast(`Copied ${user.username}'s ID.`, { type: 'success' });
                    }) },
                    components_1.React.createElement(Text_1.default, { variant: 'text-md/bold', style: { marginRight: '3px' } }, user.username)),
                components_1.React.createElement(Text_1.default, { variant: 'text-md/normal', style: { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', width: '50%' } },
                    (0, voiceState_1.getVoiceStateDifferenceMessage)(newestState, lastState),
                    ".")),
            components_1.React.createElement(Text_1.default, { variant: 'text-sm/normal', style: { marginRight: '16px' } },
                components_1.React.createElement(Timestamp_1.default, { timestamp: new Date(newestState.when) })))));
}
exports["default"] = ModalRepVoiceState;


/***/ }),

/***/ 180:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const components_1 = __nccwpck_require__(799);
const Form_1 = __nccwpck_require__(281);
const Switch_1 = __importDefault(__nccwpck_require__(419));
const TextInput_1 = __importDefault(__nccwpck_require__(571));
const AVCStalker_1 = __nccwpck_require__(65);
const Button_1 = __importDefault(__nccwpck_require__(776));
const Flex_1 = __importDefault(__nccwpck_require__(348));
const Text_1 = __importDefault(__nccwpck_require__(921));
const data_1 = __nccwpck_require__(496);
const FileData_1 = __nccwpck_require__(100);
function ModalSettings(props) {
    return (components_1.React.createElement(Flex_1.default, { direction: Flex_1.default.Direction.HORIZONTAL, align: Flex_1.default.Align.CENTER, style: { marginLeft: '16px', marginBottom: '10px', marginTop: '10px', maxHeight: '48px' } },
        components_1.React.createElement(Form_1.FormItem, { style: { marginRight: '15px' } },
            components_1.React.createElement(TextInput_1.default, { value: props.userIds.toString(), placeholder: 'User IDs', onChange: ((e) => {
                    let splitBy = e.split(',');
                    if (splitBy.length === 0)
                        splitBy = e.split(', ');
                    if (splitBy.length === 0) {
                        AVCStalker_1.logger.critical(`failed to split string into user ids`, e);
                        return;
                    }
                    props.setUserIds(splitBy);
                }) })),
        components_1.React.createElement(Flex_1.default, { direction: Flex_1.default.Direction.HORIZONTAL, align: Flex_1.default.Align.CENTER },
            components_1.React.createElement(Text_1.default, { variant: 'eyebrow', style: { marginRight: '5px' } }, "Show Correlated Logs"),
            components_1.React.createElement(Switch_1.default, { checked: props.showCorrelated, onChange: ((e) => props.setShowCorrelated(e)) })),
        components_1.React.createElement(Button_1.default, { color: Button_1.default.Colors.RED, size: Button_1.default.Sizes.MEDIUM, style: { marginRight: '16px' }, onClick: (() => {
                BdApi.UI.showConfirmationModal('aaa', 'aaa', {
                    danger: true,
                    onConfirm() {
                        props.userIds.forEach((userId) => {
                            data_1.memoryCache.set(userId, []);
                            (0, FileData_1.del)(userId);
                        });
                    },
                    onCancel() { },
                    confirmText: 'Delete Logs For User(s)',
                    cancelText: 'Cancel'
                });
            }) }, "Clear Logs")));
}
exports["default"] = ModalSettings;


/***/ }),

/***/ 959:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const components_1 = __nccwpck_require__(799);
const AVCStalker_1 = __nccwpck_require__(65);
const ModalsModule_1 = __importDefault(__nccwpck_require__(336));
const Modal_1 = __importDefault(__nccwpck_require__(150));
/**
 * Opens a popup Modal to show voice states for a user/everyone correlated
 */
function openModalFor(userId) {
    AVCStalker_1.logger.info(`opening voicestate modal for ${userId}`);
    void ModalsModule_1.default.openModal((props) => {
        return components_1.React.createElement(Modal_1.default, { ...props, userId });
    });
}
exports["default"] = openModalFor;


/***/ }),

/***/ 820:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const components_1 = __nccwpck_require__(799);
const Transitions_1 = __importDefault(__nccwpck_require__(873));
const ChannelStore_1 = __importDefault(__nccwpck_require__(432));
const GuildStore_1 = __importDefault(__nccwpck_require__(866));
const FLEX_CENTER = {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
};
function PopoutChnanelButton({ channelId, guildId }) {
    if (!channelId)
        return null;
    return components_1.React.createElement("button", { style: { ...FLEX_CENTER, width: '100%', height: '28px', background: 'transparent', marginTop: '4px', border: '2px solid white', borderRadius: '25px' }, onClick: (() => Transitions_1.default.transitionToGuild(guildId, channelId)) },
        components_1.React.createElement("div", { style: { ...FLEX_CENTER, width: '200px', height: '100%' } },
            components_1.React.createElement("img", { style: { height: '24px', width: '24px', marginRight: '5px', borderRadius: '10px' }, src: GuildStore_1.default.getGuild(guildId)?.getIconURL(), alt: 'Bad Image' }),
            components_1.React.createElement("span", { style: { color: 'white' } }, ChannelStore_1.default.getChannel(channelId).name)));
}
exports["default"] = PopoutChnanelButton;


/***/ }),

/***/ 690:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const components_1 = __nccwpck_require__(799);
const StoreUtils_1 = __importDefault(__nccwpck_require__(771));
const VoiceStateStore_1 = __importDefault(__nccwpck_require__(979));
const PopoutChannelButton_1 = __importDefault(__nccwpck_require__(820));
function Popout({ userId }) {
    const voiceStates = StoreUtils_1.default.useStateFromStores([VoiceStateStore_1.default], () => {
        const guilds = VoiceStateStore_1.default.getAllVoiceStates();
        const guildIds = Object.keys(guilds);
        const voiceStates = [];
        for (let i = 0; i < guildIds.length; i++) {
            const state = guilds[guildIds[i]][userId];
            if (!state)
                continue;
            voiceStates.push({
                channelId: state.channelId,
                guildId: guildIds[i]
            });
        }
        return voiceStates;
    });
    return (components_1.React.createElement("div", null, voiceStates.map((state) => {
        return components_1.React.createElement(PopoutChannelButton_1.default, { channelId: state.channelId, guildId: state.guildId });
    })));
}
exports["default"] = Popout;


/***/ }),

/***/ 100:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.save = exports.del = exports.get = void 0;
const fs_1 = __importDefault(__nccwpck_require__(147));
const _1 = __nccwpck_require__(496);
const __1 = __importStar(__nccwpck_require__(65));
/**
 * Reads data from the disc, and returns it, then discards anything nonrelevant for the GC to manage.
 * This will be expensive if there is a lot of data.
 * @warning EXPENSIVE OPERATION!
 */
function get(relevantId) {
    try {
        return JSON.parse(fs_1.default.readFileSync(__1.default.settings.vcLogging.filePath.replace('%plugins%', BdApi.Plugins.folder), { encoding: 'utf-8' }))[relevantId] ?? undefined;
    }
    catch (err) {
        __1.logger.critical(`Failed to read file cache for VoiceStateLogs: `, err);
        return undefined;
    }
}
exports.get = get;
function del(relevantId) {
    const filePath = __1.default.settings.vcLogging.filePath.replace('%plugins%', BdApi.Plugins.folder);
    try {
        const data = JSON.parse(fs_1.default.readFileSync(__1.default.settings.vcLogging.filePath.replace('%plugins%', BdApi.Plugins.folder), { encoding: 'utf-8' }));
        data[relevantId] = [];
        fs_1.default.writeFileSync(filePath, JSON.stringify(data), { encoding: 'utf-8' });
    }
    catch (err) {
        __1.logger.critical(`Failed to delete log data (VoiceStateLogs) `, err, relevantId);
        return undefined;
    }
}
exports.del = del;
function save() {
    try {
        const filePath = __1.default.settings.vcLogging.filePath.replace('%plugins%', BdApi.Plugins.folder);
        const data = JSON.parse(fs_1.default.readFileSync(filePath, { encoding: 'utf-8' }));
        _1.memoryCache.forEach((value) => {
            const userId = value[0].userId;
            if (!userId)
                throw new Error(`Failed to save VCStalker log data, unable to find userId on first element of memory cache ${value[0]} ${value}`);
            data[userId] = [
                ...data[userId] ?? [],
                ...value
            ];
        });
        fs_1.default.writeFileSync(filePath, JSON.stringify(data), { encoding: 'utf-8' });
        __1.logger.info(`wrote out VCStalker log data`, data, filePath);
    }
    catch (err) {
        __1.logger.critical(`FAILED TO SAVE DATA??`, err);
        return;
    }
}
exports.save = save;


/***/ }),

/***/ 496:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.get = exports.append = exports.memoryCache = void 0;
const __1 = __nccwpck_require__(65);
const FileData_1 = __nccwpck_require__(100);
/**
 * Cache in memory of relevant user id to voice states.
 */
exports.memoryCache = new Map();
/**
 * Appends data to our log file.
 * @param tsVoiceState - The voice state we are appending to our logs
 * @param relevantId - The user who is relevant/who this log relates to.
 */
function append(tsVoiceState, relevantId) {
    if (!relevantId) {
        // TODO: remove this expansion
        relevantId = tsVoiceState.userId;
        __1.logger.info(`changed relevantId to tsVoiceState`, tsVoiceState.userId);
    }
    __1.logger.info(`updated voice state cache`);
    exports.memoryCache.set(relevantId, [
        ...exports.memoryCache.get(relevantId) ?? [],
        tsVoiceState
    ]);
}
exports.append = append;
/**
 * @warning Invokes `fileDataGet` which will read the log file.
 */
function get(relevantId) {
    return [
        ...exports.memoryCache.get(relevantId) ?? [],
        ...(0, FileData_1.get)(relevantId) ?? []
    ];
}
exports.get = get;


/***/ }),

/***/ 65:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.logger = exports.DefaultSettings = exports.Icons = void 0;
const config_json_1 = __importDefault(__nccwpck_require__(136));
const UserCallHeader_1 = __importDefault(__nccwpck_require__(184));
const logger_1 = __importDefault(__nccwpck_require__(95));
const Settings_1 = __importDefault(__nccwpck_require__(423));
const voiceState_1 = __importDefault(__nccwpck_require__(414));
const Dispatcher_1 = __importDefault(__nccwpck_require__(115));
const UserContext_1 = __importDefault(__nccwpck_require__(680));
const UserAccountMenu_1 = __importDefault(__nccwpck_require__(583));
const UserPopout_1 = __importDefault(__nccwpck_require__(948));
const FileData_1 = __nccwpck_require__(100);
// #region cringe result of @vercel/ncc.
exports.Icons = {
    LiaUserSlashSolid: `<path d="M 3.6992188 2.3007812 L 2.3007812 3.6992188 L 9.1210938 10.519531 C 9.1148472 10.54659 9.1055539 10.572434 9.0996094 10.599609 L 11 12.5 L 11 12.398438 L 15.601562 17 L 15.5 17 L 17.699219 19.199219 C 17.749353 19.210917 17.795909 19.231553 17.845703 19.244141 L 23.660156 25.058594 C 23.670754 25.106568 23.68955 25.150877 23.699219 25.199219 L 25.5 27 L 25.601562 27 L 28.300781 29.699219 L 29.699219 28.300781 L 25.59375 24.195312 C 24.75029 21.314801 22.648326 18.945754 19.900391 17.800781 C 21.800391 16.500781 23 14.4 23 12 C 23 8.1 19.9 5 16 5 C 13.390973 5 11.146509 6.4199607 9.921875 8.5234375 L 3.6992188 2.3007812 z M 16 7 C 18.8 7 21 9.2 21 12 C 21 14.086994 19.776043 15.83791 17.994141 16.595703 L 11.404297 10.005859 C 12.16209 8.2239568 13.913006 7 16 7 z M 9.0996094 13.300781 C 9.4996094 15.200781 10.499609 16.800781 12.099609 17.800781 C 8.4996094 19.300781 6 22.9 6 27 L 8 27 C 8 22.9 11.000391 19.599609 14.900391 19.099609 L 9.0996094 13.300781 z"></path>`,
    GaUserAdd: `<path fill-rule="evenodd" clip-rule="evenodd" d="M8 11C10.2091 11 12 9.20914 12 7C12 4.79086 10.2091 3 8 3C5.79086 3 4 4.79086 4 7C4 9.20914 5.79086 11 8 11ZM8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z" fill="currentColor"/><path d="M11 14C11.5523 14 12 14.4477 12 15V21H14V15C14 13.3431 12.6569 12 11 12H5C3.34315 12 2 13.3431 2 15V21H4V15C4 14.4477 4.44772 14 5 14H11Z" fill="currentColor"/><path d="M18 7H20V9H22V11H20V13H18V11H16V9H18V7Z" fill="currentColor" />`,
    GaUser: `<path fill-rule="evenodd" clip-rule="evenodd" d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z" fill="currentColor"/><path d="M16 15C16 14.4477 15.5523 14 15 14H9C8.44772 14 8 14.4477 8 15V21H6V15C6 13.3431 7.34315 12 9 12H15C16.6569 12 18 13.3431 18 15V21H16V15Z" fill="currentColor"/>`,
    GoPeople: `<path d="M3.5 8a5.5 5.5 0 1 1 8.596 4.547 9.005 9.005 0 0 1 5.9 8.18.751.751 0 0 1-1.5.045 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.499-.044 9.005 9.005 0 0 1 5.9-8.181A5.496 5.496 0 0 1 3.5 8ZM9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm8.29 4c-.148 0-.292.01-.434.03a.75.75 0 1 1-.212-1.484 4.53 4.53 0 0 1 3.38 8.097 6.69 6.69 0 0 1 3.956 6.107.75.75 0 0 1-1.5 0 5.193 5.193 0 0 0-3.696-4.972l-.534-.16v-1.676l.41-.209A3.03 3.03 0 0 0 17.29 8Z"/>`,
    RxCross2: `<path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor"/>`
};
// #endregion end of cringe
exports.DefaultSettings = {
    voiceChatFollowing: {
        clickVoiceChatButtonClears: true
    },
    userPopout: false,
    vcLogging: {
        enabled: false,
        // list of user ids
        whitelisted: [],
        // megabytes
        maxSize: 1000,
        logFriends: true,
        logCorrelatedPeople: false,
        filePath: '%plugins%/AVCStalker_VSLogs.json'
    },
    contextMenu: {
        individual: true,
        showLogButton: false,
        showWhitelistButton: false,
        name: 'Voice Utilities'
    }
};
exports.logger = new logger_1.default(config_json_1.default);
class AVCStalker {
    constructor() {
        this.cancelUserContextPatch = null;
    }
    start() {
        const loadedSettings = BdApi.Data.load(config_json_1.default.name, 'settings');
        AVCStalker.settings = {
            ...exports.DefaultSettings,
            ...loadedSettings
        };
        Dispatcher_1.default.subscribe('VOICE_STATE_UPDATES', voiceState_1.default);
        exports.logger.info('Patching UserCallHeader');
        (0, UserCallHeader_1.default)();
        exports.logger.info('Patching UserContext');
        this.cancelUserContextPatch = (0, UserContext_1.default)();
        exports.logger.info('Patching UserPopout');
        (0, UserPopout_1.default)();
        exports.logger.info('Dom-Patching UserAccountPanel');
        (0, UserAccountMenu_1.default)();
    }
    stop() {
        exports.logger.info('Unpatching everything under the name of ', config_json_1.default.name);
        BdApi.Patcher.unpatchAll(config_json_1.default.name);
        this.cancelUserContextPatch();
        exports.logger.info('Unsubscribed from VOICE_STATE_UPDATES (vc monitoring');
        Dispatcher_1.default.unsubscribe('VOICE_STATE_UPDATES', voiceState_1.default);
        exports.logger.info('Saving settings', AVCStalker.settings);
        BdApi.Data.save(config_json_1.default.name, 'settings', AVCStalker.settings);
        exports.logger.info('Saving VC logs');
        (0, FileData_1.save)();
        const elm = document.getElementById('ClearFollowing');
        if (elm)
            elm.remove();
    }
    getSettingsPanel() {
        return Settings_1.default;
    }
    onSwitch() {
        exports.logger.info('Dom-Patching UserAccountPanel');
        (0, UserAccountMenu_1.default)();
    }
}
AVCStalker.settings = exports.DefaultSettings;
exports["default"] = AVCStalker;


/***/ }),

/***/ 583:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const components_1 = __nccwpck_require__(799);
const ClearFollowing_1 = __importDefault(__nccwpck_require__(118));
const __1 = __nccwpck_require__(65);
function PatchUserAccountMenu() {
    // TODO: make this an actual patch, because this is SHIT dom manip and is
    // fucking DISGUSTING!
    const muteButton = document.querySelector('[aria-label="Mute"]');
    let container = document.getElementById('ClearFollowing');
    if (!container) {
        __1.logger.info(`Failed to find 'container' making new one`);
        container = document.createElement('div');
        container.setAttribute('id', 'ClearFollowing');
    }
    // TODO: this is shit, and language dependent, TOO BAD!
    const statusContainer = document.querySelector('[aria-label="Set Status"]');
    if (!statusContainer) {
        __1.logger.critical('Failed to find statusContainer with query "[aria-label="Set Status"]", expected HTMLElement but recieved ', statusContainer);
        return;
    }
    if (statusContainer?.style?.minWidth !== '87px') {
        statusContainer.style.minWidth = '87px';
    }
    __1.logger.info(`inserting container 'beforebegin' on element`, muteButton);
    muteButton?.insertAdjacentElement('beforebegin', container);
    BdApi.ReactDOM.render(components_1.React.createElement(ClearFollowing_1.default, null), container);
}
exports["default"] = PatchUserAccountMenu;


/***/ }),

/***/ 184:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const index_1 = __nccwpck_require__(799);
const __1 = __nccwpck_require__(65);
const config_json_1 = __importDefault(__nccwpck_require__(136));
const JoinVcIcon_1 = __importDefault(__nccwpck_require__(902));
function PatchUserCallHeader() {
    const stringFilter = BdApi.Webpack.Filters.byStrings('.GUILD_HOME');
    const keyFilter = BdApi.Webpack.Filters.byKeys('Icon', 'Title');
    // @ts-expect-error this works, don't care!
    const [titlebarModule, titlebarKey] = BdApi.Webpack.getWithKey((m) => keyFilter(m) && !stringFilter(m));
    BdApi.Patcher.before(config_json_1.default.name, titlebarModule, titlebarKey, (_, [props]) => {
        let foundId = undefined;
        for (let i = 0; i < props.children?.length; i++) {
            const child = props.children[i];
            if (child?.props?.channel?.recipients) {
                foundId = child?.props?.channel?.recipients[0];
                break;
            }
        }
        if (!foundId) {
            __1.logger.critical('Failed to find the channel id, indicating it\'s either a server channel' +
                ' or discord completly fucked my code', foundId);
            return;
        }
        const toolbar = props?.toolbar;
        if (!toolbar) {
            __1.logger.warn('Failed to find `toolbar` in `props` of `titlebarModule` mod');
            return;
        }
        const icon = index_1.React.createElement(JoinVcIcon_1.default, { userId: foundId });
        // idx 1 = start call
        // idx 2 = video call
        // idx 3 = pin
        // idx 4 = groupchat add people button
        try {
            toolbar.props?.children[0]?.splice(4, 0, icon);
            __1.logger.info('Patched titlebar to add icon for current call');
        }
        catch (err) {
            __1.logger.error('Failed to patch titlebar, weird?', err);
        }
    });
}
exports["default"] = PatchUserCallHeader;


/***/ }),

/***/ 680:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const components_1 = __nccwpck_require__(799);
const __1 = __importStar(__nccwpck_require__(65));
const VoiceStateStore_1 = __importDefault(__nccwpck_require__(979));
const ChannelStore_1 = __importDefault(__nccwpck_require__(432));
const util_1 = __nccwpck_require__(268);
const Following_1 = __nccwpck_require__(343);
const modal_1 = __importDefault(__nccwpck_require__(959));
const { Item } = BdApi.ContextMenu;
function PatchUserContext() {
    __1.logger.info('Patched UserContext');
    function findVCAndJoin(id) {
        const vs = VoiceStateStore_1.default.getVoiceStateForUser(id);
        if (!vs || !vs.channelId)
            return;
        const channel = ChannelStore_1.default.getChannel(vs.channelId);
        __1.logger.info(`${id} was already in a vc when we said to start following so joining their call (${vs.channelId})`);
        (0, util_1.joinCall)(vs, channel);
    }
    return BdApi.ContextMenu.patch('user-context', (res, props) => {
        const id = props.user.id;
        const isFollowing = Following_1.followingPeople.has(id);
        const followButton = components_1.React.createElement(Item, { label: isFollowing ? 'Unfollow' : 'Follow', id: 'follow-call', action: (() => {
                if (isFollowing)
                    Following_1.followingPeople.delete(id);
                else {
                    __1.logger.info(`now following ${id}`);
                    Following_1.followingPeople.add(id);
                    findVCAndJoin(id);
                }
            }) });
        // TODO: stop wasting resources by creating this even if we don't render it!
        const logButton = components_1.React.createElement(Item, { label: 'Open Voice Logs', id: 'voice-logs', action: (() => {
                __1.logger.info(`opened voice state logs for: `, id);
                (0, modal_1.default)(id);
            }) });
        const isWhitelisted = __1.default.settings.vcLogging.whitelisted.includes(id);
        // TODO: stop wasting resources by creating this even if we don't render it!
        const whitelistButton = components_1.React.createElement(Item, { label: isWhitelisted ? 'Remove From Whitelist' : 'Add To Whitelist', id: 'whitelist-button', action: (() => {
                __1.logger.info(`${isWhitelisted ? 'removed' : 'added'} ${id} to whitelisted (vclogs)`);
                if (isWhitelisted)
                    __1.default.settings.vcLogging.whitelisted.splice(__1.default.settings.vcLogging.whitelisted.indexOf(id), 1);
                else
                    __1.default.settings.vcLogging.whitelisted.push(id);
            }) });
        if (__1.default.settings.contextMenu.individual) {
            res.props.children.push(followButton);
            if (__1.default.settings.contextMenu.showLogButton)
                res.props.children.push(logButton);
            if (__1.default.settings.contextMenu.showWhitelistButton)
                res.props.children.push(whitelistButton);
        }
        else
            res.props.children.push(components_1.React.createElement(Item, { label: __1.default.settings.contextMenu.name, id: 'vcstalker-group' },
                followButton,
                __1.default.settings.contextMenu.showLogButton ? logButton : void 0,
                __1.default.settings.contextMenu.showWhitelistButton ? whitelistButton : void 0));
    });
}
exports["default"] = PatchUserContext;


/***/ }),

/***/ 948:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const components_1 = __nccwpck_require__(799);
const popout_1 = __importDefault(__nccwpck_require__(690));
const config_json_1 = __importDefault(__nccwpck_require__(136));
const __1 = __importDefault(__nccwpck_require__(65));
function PatchUserPopout() {
    const [mod, key] = BdApi.Webpack.getWithKey(BdApi.Webpack.Filters.byStrings('showCopiableUsername', 'canDM', 'displayProfile'));
    BdApi.Patcher.after(config_json_1.default.name, mod, key, (_, [{ user }], res) => {
        if (!__1.default.settings.userPopout)
            return res;
        res.props.children.splice(1, 0, components_1.React.createElement(popout_1.default, { userId: user.id }));
    });
}
exports["default"] = PatchUserPopout;


/***/ }),

/***/ 268:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.joinCall = exports.ConnectionBit = void 0;
const VoiceStateStore_1 = __importDefault(__nccwpck_require__(979));
const UserStore_1 = __importDefault(__nccwpck_require__(682));
const _1 = __nccwpck_require__(65);
const Following_1 = __nccwpck_require__(343);
// TODO: de-hardcode this bitfield and pull it from Webpack, but for now
// this isn't going to change, and if it does they are going to notify on their
// proper documentation page as this is a supported bitfield from
// https://discord.dev/
exports.ConnectionBit = 0x100000n;
const voiceChannelUtils = BdApi.Webpack.getByKeys('selectVoiceChannel', 'disconnect');
// I don't care!
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
function joinCall(voiceState, channel) {
    if (!Following_1.followingPeople.has(voiceState.userId))
        return;
    if (VoiceStateStore_1.default.isInChannel(channel.id))
        return;
    const VSs = VoiceStateStore_1.default.getVoiceStatesForChannel(voiceState.channelId);
    if (!VSs)
        return;
    if (channel.permissionOverwrites_
        && channel.permissionOverwrites_[UserStore_1.default.getCurrentUser().id]
        && channel.permissionOverwrites_[UserStore_1.default.getCurrentUser().id]?.deny & exports.ConnectionBit) {
        _1.logger.info(`attempted to join vc but we are denied from joining, setting 250ms timeout before attempting to rejoin`);
        return setTimeout(() => joinCall(voiceState, channel), 250);
    }
    const people = Object.keys(VSs).length;
    if (channel.userLimit_ !== 0 && people >= channel.userLimit_) {
        _1.logger.info(`attempted to join ${channel.name} but it was full (${people} >= ${channel.userLimit_}). setting 250ms timeout before attempting to rejoin`);
        return setTimeout(() => joinCall(voiceState, channel), 250);
    }
    _1.logger.info('joining voice channel');
    voiceChannelUtils.selectVoiceChannel(voiceState.channelId);
}
exports.joinCall = joinCall;


/***/ }),

/***/ 343:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.followFromVoiceState = exports.followingPeople = void 0;
const ChannelStore_1 = __importDefault(__nccwpck_require__(432));
const UserStore_1 = __importDefault(__nccwpck_require__(682));
const __1 = __nccwpck_require__(65);
const util_1 = __nccwpck_require__(268);
/**
 * Set of userIDs to follow, aka who we care about
 * to follow
 */
exports.followingPeople = new Set();
function followFromVoiceState(vs) {
    if (vs.channelId === null || !vs.channelId) {
        BdApi.UI.showToast(`${UserStore_1.default.getUser(vs.userId).globalName} left voice chat!`, { type: 'warn' });
        return;
    }
    const channel = ChannelStore_1.default.getChannel(vs.channelId);
    const msg = `Joining ${UserStore_1.default.getUser(vs.userId).globalName} in #${channel.name}`;
    __1.logger.info(msg);
    BdApi.UI.showToast(msg);
    (0, util_1.joinCall)(vs, channel);
}
exports.followFromVoiceState = followFromVoiceState;


/***/ }),

/***/ 554:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCorrelatedPeople = exports.isFriendOrWhitelisted = void 0;
const __1 = __importDefault(__nccwpck_require__(65));
const RelationshipStore_1 = __importDefault(__nccwpck_require__(366));
const UserStore_1 = __importDefault(__nccwpck_require__(682));
const VoiceStateStore_1 = __importDefault(__nccwpck_require__(979));
const ourId = UserStore_1.default.getCurrentUser().id;
function isFriendOrWhitelisted(voiceState) {
    if (voiceState.userId === ourId)
        return false;
    if (__1.default.settings.vcLogging.whitelisted.includes(voiceState.userId))
        return true;
    if (__1.default.settings.vcLogging.logFriends)
        return RelationshipStore_1.default.isFriend(voiceState.userId);
    return false;
}
exports.isFriendOrWhitelisted = isFriendOrWhitelisted;
function getCorrelatedPeople(voiceState) {
    // VOICE_STATE_UPDATE -> 
    //     isFriend() || isWhitelisted() -> append to log file;
    // then if logCorrelated:
    //     loop over each person in VC:
    //          if one of our friends is in that vc, return the friend's id
    //          so that we can correlate the VoiceState to our Friend's ID
    // not in a VC, cant check correlated people, gtfo!
    if (voiceState.channelId === null)
        return undefined;
    const inVC = VoiceStateStore_1.default.getVoiceStatesForChannel(voiceState.channelId);
    const outputIds = [];
    for (const userId in inVC) {
        const state = inVC[userId];
        if (isFriendOrWhitelisted(state))
            outputIds.push(state.userId);
    }
    return outputIds;
}
exports.getCorrelatedPeople = getCorrelatedPeople;


/***/ }),

/***/ 414:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getVoiceStateDifferenceMessage = void 0;
const Following_1 = __nccwpck_require__(343);
const Logging_1 = __nccwpck_require__(554);
const data_1 = __nccwpck_require__(496);
const __1 = __importStar(__nccwpck_require__(65));
const ChannelStore_1 = __importDefault(__nccwpck_require__(432));
const GuildStore_1 = __importDefault(__nccwpck_require__(866));
function getVoiceStateDifferenceMessage(newest, old) {
    if (newest.channelId !== old.channelId || newest.channelId === null) {
        if (!newest.channelId && !newest.oldChannelId) {
            __1.logger.critical('Newest had no past nor current, wtf?', newest);
            return 'left channel (unknown)';
        }
        const channel = ChannelStore_1.default.getChannel(newest.channelId ?? newest.oldChannelId);
        const guild = GuildStore_1.default.getGuild(channel.guild_id);
        if (newest.channelId === null)
            return `left ${channel.name} in ${guild?.name ?? 'unknown'}`;
        return `moved to ${channel.name} in ${guild?.name ?? 'unknown'}`;
    }
    if (newest.selfMute !== old.selfMute)
        return newest.selfMute ? 'muted' : 'unmuted';
    if (newest.selfDeaf !== old.selfDeaf)
        return newest.selfDeaf ? 'deafened' : 'undeafened';
    if (newest.selfStream !== old.selfStream)
        return newest.selfStream ? 'started streaming' : 'stopped streaming';
    if (newest.selfVideo !== old.selfVideo)
        return newest.selfVideo ? 'started video' : 'stopped video';
    if (newest.deaf !== old.deaf)
        return newest.deaf ? 'got server deafened' : 'got unserver deafened';
    if (newest.mute !== old.mute)
        return newest.mute ? 'got server muted' : 'got unserver muted';
    if (newest.sessionId !== old.sessionId)
        return 'changed platforms';
    return 'unknown? (no previous data)';
}
exports.getVoiceStateDifferenceMessage = getVoiceStateDifferenceMessage;
function onVoiceChange(voiceState) {
    if (voiceState.type !== 'VOICE_STATE_UPDATES')
        return;
    for (let i = 0; i < voiceState.voiceStates.length; i++) {
        const vs = voiceState.voiceStates[i];
        if (Following_1.followingPeople.has(vs.userId))
            (0, Following_1.followFromVoiceState)(vs);
        if (__1.default.settings.vcLogging.enabled) {
            if ((0, Logging_1.isFriendOrWhitelisted)(vs))
                (0, data_1.append)({ ...vs, when: Date.now() }, vs.userId);
            if (!__1.default.settings.vcLogging.logCorrelatedPeople)
                continue;
            const correlatedUserIds = (0, Logging_1.getCorrelatedPeople)(vs);
            // There was nobody correlated
            if (!correlatedUserIds || correlatedUserIds.length === 0)
                continue;
            for (let j = 0; j < correlatedUserIds.length; j++)
                (0, data_1.append)({ ...vs, when: Date.now() }, correlatedUserIds[j]);
        }
    }
}
exports["default"] = onVoiceChange;


/***/ }),

/***/ 147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 136:
/***/ ((module) => {

module.exports = JSON.parse('{"$schema":"../../config_schema.jsonc","name":"AVCStalker","description":"In God we trust.","author":"ace.","version":"2.1.0","source":"https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/AVCStalker/AVCStalker.plugin.js","authorLink":"https://github.com/AceLikesGhosts/bd-plugins","website":"https://github.com/AceLikesGhosts/bd-plugins","updateLink":"https://github.com/AceLikesGhosts/bd-plugins","authorId":"327639826075484162"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
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
/******/ 	var __webpack_exports__ = __nccwpck_require__(65);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;