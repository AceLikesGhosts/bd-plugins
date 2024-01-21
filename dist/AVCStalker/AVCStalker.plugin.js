/**
* @name AVCStalker
* @description A simplistic.
* @author ace. & friez.
* @version 0.0.1-rc
* @source https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/AVCStalker/AVCStalker.plugin.js
* @authorLink https://github.com/AceLikesGhosts/bd-plugins
* @website https://github.com/AceLikesGhosts/bd-plugins
* @updateLink https://github.com/AceLikesGhosts/bd-plugins
* @authorId 327639826075484162
*/
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

/***/ 78:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = BdApi.Webpack.getByKeys('getVoiceStateForUser');


/***/ }),

/***/ 902:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const index_1 = __nccwpck_require__(799);
const __1 = __nccwpck_require__(65);
const VoiceStateStore_1 = __importDefault(__nccwpck_require__(78));
const DiscordTooltip = BdApi.Components.Tooltip;
// type Channel = { guild_id: string; };
const useStateFromStores = BdApi.Webpack.getByKeys('useStateFromStores')?.useStateFromStores;
const transitionTo = BdApi.Webpack.getByKeys('transitionTo').transitionTo;
// const ChannelStore = BdApi.Webpack.getStore('ChannelStore') as { getChannel(id: string): Channel; };
function JoinVcIcon({ userId }) {
    const voiceData = useStateFromStores([VoiceStateStore_1.default], () => [VoiceStateStore_1.default.getVoiceStateForUser(userId)] ?? 0);
    // const [channel, setChannel] = React.useState<Channel>(ChannelStore.getChannel(voiceData[0]?.channelId ?? '0') as Channel);
    const [peopleInVC, setGuildChannelLength] = index_1.React.useState(1);
    index_1.React.useEffect(() => {
        setGuildChannelLength(Object.keys(VoiceStateStore_1.default.getVoiceStatesForChannel(voiceData[0]?.channelId) ?? { hi: 'u-shouldnt-see-this' }).length);
        // setChannel(ChannelStore.getChannel(voiceData[0]?.channelId ?? '0') as Channel);
    }, [voiceData]);
    return (index_1.React.createElement(index_1.React.Fragment, null, voiceData[0]?.channelId ? index_1.React.createElement(DiscordTooltip, { text: 'Voice Channel' }, (props) => index_1.React.createElement("div", { ...props },
        index_1.React.createElement("svg", { width: 24, height: 24, role: 'img', 
            // this is only able to be set to a set string from `icons` so this is fine
            dangerouslySetInnerHTML: {
                __html: peopleInVC === 1 ?
                    __1.Icons.GaUser :
                    __1.Icons.GaUserAdd
            }, onClick: (() => {
                if (voiceData[0]?.channelId)
                    transitionTo(voiceData[0].channelId);
                else
                    BdApi.UI.showToast('Failed to locate the voice channel they are in', { type: 'error' });
            }) }))) : index_1.React.createElement("div", { id: 'hi-you-shouldnt-ever-see-this-div-lol' })));
}
exports["default"] = JoinVcIcon;


/***/ }),

/***/ 423:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const index_1 = __nccwpck_require__(799);
// import type { TextInputProps } from '@lib/components/TextInput';
// import type { FormItemProps } from '@lib/components/Form';
// import RawTextInput from '@lib/components/TextInput';
// import { FormItem, FormSwitch } from '@lib/components/Form';
// import { Margins } from '@lib/components';
// import AUserVoiceLocation from '..';
// import _ from '@lib/common/Lodash';
// function TextInput(props: TextInputProps & FormItemProps) {
//     return (
//         <FormItem
//             style={{
//                 width: '50%'
//             }}
//             className={Margins.marginBottom20}
//             {...props}
//         >
//             <RawTextInput
//                 {...props}
//             />
//         </FormItem>
//     );
// }
function Settings() {
    // const [maxLogFileSize, setMaxLogFileSize] = React.useState<number>(AUserVoiceLocation.settings.maxLogFileSize);
    // const [shouldLogFriends, setShouldLogFriends] = React.useState<boolean>(AUserVoiceLocation.settings.whoToLog.friends);
    // const [shouldLogRandoms, setShouldLogRandoms] = React.useState<boolean>(AUserVoiceLocation.settings.whoToLog.randoms);
    // const [purgeWhen, setPurgeWhen] = React.useState<number>(AUserVoiceLocation.settings.purgeWhen);
    // const [shouldPurge, setShouldPurge] = React.useState<boolean>(AUserVoiceLocation.settings.shouldPurge);
    // React.useEffect(() => {
    //     AUserVoiceLocation.settings = {
    //         maxLogFileSize,
    //         whoToLog: {
    //             friends: shouldLogFriends,
    //             randoms: shouldLogRandoms
    //         },
    //         purgeWhen,
    //         shouldPurge
    //     };
    // }, [maxLogFileSize, shouldLogFriends, shouldLogRandoms, shouldPurge, purgeWhen]);
    return (index_1.React.createElement("div", null,
        index_1.React.createElement("h1", null, "There is nothing here at this time.")));
}
exports["default"] = Settings;


/***/ }),

/***/ 65:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.logger = exports.Icons = void 0;
const config_json_1 = __importDefault(__nccwpck_require__(136));
const UserCallHeader_1 = __importDefault(__nccwpck_require__(184));
const logger_1 = __importDefault(__nccwpck_require__(95));
// import Dispatcher from '@lib/modules/Dispatcher';
// import { onVoiceChange } from './voiceActivity';
// import { saveToFile } from './VoiceLogFile';
const Settings_1 = __importDefault(__nccwpck_require__(423));
// #region cringe result of @vercel/ncc.
exports.Icons = {
    LiaUserSlashSolid: `<path d="M 3.6992188 2.3007812 L 2.3007812 3.6992188 L 9.1210938 10.519531 C 9.1148472 10.54659 9.1055539 10.572434 9.0996094 10.599609 L 11 12.5 L 11 12.398438 L 15.601562 17 L 15.5 17 L 17.699219 19.199219 C 17.749353 19.210917 17.795909 19.231553 17.845703 19.244141 L 23.660156 25.058594 C 23.670754 25.106568 23.68955 25.150877 23.699219 25.199219 L 25.5 27 L 25.601562 27 L 28.300781 29.699219 L 29.699219 28.300781 L 25.59375 24.195312 C 24.75029 21.314801 22.648326 18.945754 19.900391 17.800781 C 21.800391 16.500781 23 14.4 23 12 C 23 8.1 19.9 5 16 5 C 13.390973 5 11.146509 6.4199607 9.921875 8.5234375 L 3.6992188 2.3007812 z M 16 7 C 18.8 7 21 9.2 21 12 C 21 14.086994 19.776043 15.83791 17.994141 16.595703 L 11.404297 10.005859 C 12.16209 8.2239568 13.913006 7 16 7 z M 9.0996094 13.300781 C 9.4996094 15.200781 10.499609 16.800781 12.099609 17.800781 C 8.4996094 19.300781 6 22.9 6 27 L 8 27 C 8 22.9 11.000391 19.599609 14.900391 19.099609 L 9.0996094 13.300781 z"></path>`,
    GaUserAdd: `<path fill-rule="evenodd" clip-rule="evenodd" d="M8 11C10.2091 11 12 9.20914 12 7C12 4.79086 10.2091 3 8 3C5.79086 3 4 4.79086 4 7C4 9.20914 5.79086 11 8 11ZM8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z" fill="currentColor"/><path d="M11 14C11.5523 14 12 14.4477 12 15V21H14V15C14 13.3431 12.6569 12 11 12H5C3.34315 12 2 13.3431 2 15V21H4V15C4 14.4477 4.44772 14 5 14H11Z" fill="currentColor"/><path d="M18 7H20V9H22V11H20V13H18V11H16V9H18V7Z" fill="currentColor" />`,
    GaUser: `<path fill-rule="evenodd" clip-rule="evenodd" d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z" fill="currentColor"/><path d="M16 15C16 14.4477 15.5523 14 15 14H9C8.44772 14 8 14.4477 8 15V21H6V15C6 13.3431 7.34315 12 9 12H15C16.6569 12 18 13.3431 18 15V21H16V15Z" fill="currentColor"/>`
};
// #endregion end of cringe
const DefaultSettings = {
    //              👇 MB, aka 1gb
    maxLogFileSize: 1024,
    whoToLog: {
        friends: true,
        randoms: false
    },
    shouldPurge: false,
    // days
    purgeWhen: 7
};
// export let settings: typeof DefaultSettings = DefaultSettings;
exports.logger = new logger_1.default(config_json_1.default);
class AUserVoiceLocation {
    start() {
        const loadedSettings = BdApi.Data.load(config_json_1.default.name, 'settings');
        AUserVoiceLocation.settings = {
            ...DefaultSettings,
            ...loadedSettings
        };
        // Dispatcher.subscribe('VOICE_STATE_UPDATES', onVoiceChange);
        exports.logger.info('Patching UserCallHeader');
        (0, UserCallHeader_1.default)();
    }
    stop() {
        exports.logger.info('Unpatching everything under the name of ', config_json_1.default.name);
        BdApi.Patcher.unpatchAll(config_json_1.default.name);
        exports.logger.info('Unsubscribed from VOICE_STATE_UPDATES (vc monitoring');
        // Dispatcher.unsubscribe('VOICE_STATE_UPDATES', onVoiceChange);
        exports.logger.info('Saving settings', AUserVoiceLocation.settings);
        BdApi.Data.save(config_json_1.default.name, 'settings', AUserVoiceLocation.settings);
        exports.logger.info('Saving creepy stalker data to json file');
        // saveToFile();
    }
    getSettingsPanel() {
        return Settings_1.default;
    }
}
AUserVoiceLocation.settings = DefaultSettings;
exports["default"] = AUserVoiceLocation;


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
        console.log(props);
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

/***/ 136:
/***/ ((module) => {

module.exports = JSON.parse('{"$schema":"../../config_schema.jsonc","name":"AVCStalker","description":"A simplistic.","author":"ace. & friez.","version":"0.0.1-rc","source":"https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/AVCStalker/AVCStalker.plugin.js","authorLink":"https://github.com/AceLikesGhosts/bd-plugins","website":"https://github.com/AceLikesGhosts/bd-plugins","updateLink":"https://github.com/AceLikesGhosts/bd-plugins","authorId":"327639826075484162"}');

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