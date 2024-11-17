/**
* @name AForceMute
* @description In God we trust.
* @author manicinduced
* @version 0.0.1-RC
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

/***/ 115:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = BdApi.Webpack.getByKeys('dispatch', 'subscribe', 'register');


/***/ }),

/***/ 432:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChannelType = void 0;
var ChannelType;
(function (ChannelType) {
    ChannelType[ChannelType["VOICE"] = 2] = "VOICE";
})(ChannelType || (exports.ChannelType = ChannelType = {}));
exports["default"] = BdApi.Webpack.getStore('ChannelStore');


/***/ }),

/***/ 111:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Permissions = void 0;
exports.Permissions = BdApi.Webpack.getByKeys('MUTE_MEMBERS', 'VIEW_CHANNEL', { searchExports: true });
exports["default"] = BdApi.Webpack.getStore('PermissionStore');


/***/ }),

/***/ 682:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = BdApi.Webpack.getStore('UserStore');


/***/ }),

/***/ 351:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = BdApi.Webpack.getByKeys('setServerMute');


/***/ }),

/***/ 979:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = BdApi.Webpack.getByKeys('getVoiceStateForUser');


/***/ }),

/***/ 664:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.forceMuteCache = exports.logger = void 0;
const logger_1 = __importDefault(__nccwpck_require__(95));
const config_json_1 = __importDefault(__nccwpck_require__(820));
const userContext_1 = __importDefault(__nccwpck_require__(949));
const Dispatcher_1 = __importDefault(__nccwpck_require__(115));
const onVoiceUpdate_1 = __importDefault(__nccwpck_require__(196));
exports.logger = new logger_1.default(config_json_1.default);
exports.forceMuteCache = {};
class AVoiceUtils {
    constructor() {
        this.userContextCancel = null;
    }
    start() {
        exports.logger.info('Patching User-Context');
        this.userContextCancel = (0, userContext_1.default)();
        exports.logger.info('Subscribing to VOICE_STATE_UPDATES');
        Dispatcher_1.default.subscribe('VOICE_STATE_UPDATES', onVoiceUpdate_1.default);
    }
    stop() {
        exports.logger.info('Cancelling User-Context patch');
        this.userContextCancel?.();
        exports.logger.info('Unsubscribing to VOICE_STATE_UPDATES');
        Dispatcher_1.default.unsubscribe('VOICE_STATE_UPDATES', onVoiceUpdate_1.default);
    }
}
exports["default"] = AVoiceUtils;


/***/ }),

/***/ 196:
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
const __1 = __nccwpck_require__(664);
const PermissionStore_1 = __importStar(__nccwpck_require__(111));
const UserUpdates_1 = __importDefault(__nccwpck_require__(351));
const ChannelStore_1 = __importDefault(__nccwpck_require__(432));
function onVoiceStateUpdate(event) {
    if (event.type !== 'VOICE_STATE_UPDATES')
        return;
    for (const voiceState of event.voiceStates) {
        if (!__1.forceMuteCache[voiceState.userId])
            return;
        if (voiceState.mute) {
            __1.logger.log(`${voiceState.userId} was already muted`);
            return;
        }
        if (!PermissionStore_1.default.canWithPartialContext(PermissionStore_1.Permissions.VIEW_CHANNEL, { channelId: voiceState.channelId }) ||
            !PermissionStore_1.default.canWithPartialContext(PermissionStore_1.Permissions.MUTE_MEMBERS, { channelId: voiceState.channelId })) {
            __1.logger.log('missing permissions, not automatically remuting - missing VIEW_CHANNEL or MUTE_MEMBERS');
            return;
        }
        if (!voiceState.channelId && !voiceState.oldChannelId) {
            __1.logger.log('failed to find channel id in channelId and oldChannelId');
            return;
        }
        __1.logger.log(`remuting ${voiceState.userId}`);
        const channel = ChannelStore_1.default.getChannel(voiceState.channelId ?? voiceState.oldChannelId);
        UserUpdates_1.default.setServerMute(channel.guild_id, voiceState.userId, true);
    }
}
exports["default"] = onVoiceStateUpdate;


/***/ }),

/***/ 949:
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
const UserStore_1 = __importDefault(__nccwpck_require__(682));
const VoiceStateStore_1 = __importDefault(__nccwpck_require__(979));
const UserUpdates_1 = __importDefault(__nccwpck_require__(351));
const __1 = __nccwpck_require__(664);
const components_1 = __nccwpck_require__(799);
const ChannelStore_1 = __nccwpck_require__(432);
const PermissionStore_1 = __importStar(__nccwpck_require__(111));
const { CheckboxItem } = BdApi.ContextMenu;
// setServerMute
/**
 *
 * channel on user-context is reflective of the channel
 * they are currently in, or the current selected channel
 * if they are not within a voice channel
 *
 */
function insertIntoTree(children, search, insert) {
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (search(child)) {
            children.splice(i + 1, 0, insert);
            return true;
        }
        if (child === null || typeof child !== 'object') {
            continue;
        }
        if ('props' in child) {
            if (insertIntoTree([child.props], search, insert)) {
                return true;
            }
        }
        if ('children' in child && child.children) {
            if (insertIntoTree(child.children, search, insert)) {
                return true;
            }
        }
    }
    return false;
}
function PatchUserContext() {
    return BdApi.ContextMenu.patch('user-context', (res, props) => {
        const us = UserStore_1.default.getCurrentUser().id;
        const id = props.user.id;
        if (us === id)
            return;
        if (props.channel.type !== ChannelStore_1.ChannelType.VOICE)
            return;
        if (!PermissionStore_1.default.canWithPartialContext(PermissionStore_1.Permissions.VIEW_CHANNEL, { channelId: props.channel.id }) ||
            !PermissionStore_1.default.canWithPartialContext(PermissionStore_1.Permissions.MUTE_MEMBERS, { channelId: props.channel.id })) {
            __1.logger.debug('missing VIEW_CHANNEL or MUTE_MEMBERS permissions not displaying');
            return;
        }
        const [active, setActive] = components_1.React.useState(__1.forceMuteCache[id] || false);
        const forceMuteButton = components_1.React.createElement(CheckboxItem, { label: 'Force Server Mute', id: 'user-context-force-server-mute', color: 'danger', checked: active, action: (() => {
                const newState = !active;
                setActive(newState);
                __1.forceMuteCache[id] = newState;
                __1.logger.log(`Force mute ${newState ? 'enabled' : 'disabled'} for ${id}`);
                if (!VoiceStateStore_1.default.getVoiceStateForUser(id)?.mute) {
                    __1.logger.log(`Force muting ${id} (toggle pressed)`);
                    UserUpdates_1.default.setServerMute(props.channel.guild_id, id, true);
                }
            }) });
        const insertWasSuccessful = insertIntoTree(res.props.children, (node) => node?.key === 'voice-mute', forceMuteButton);
        if (!insertWasSuccessful) {
            __1.logger.error('Failed to insert in tree, inserting at last element');
            res.props.children.push(forceMuteButton);
            return;
        }
    });
}
exports["default"] = PatchUserContext;


/***/ }),

/***/ 820:
/***/ ((module) => {

module.exports = JSON.parse('{"$schema":"../../config_schema.jsonc","name":"AForceMute","description":"In God we trust.","author":"manicinduced","version":"0.0.1-RC"}');

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
/******/ 	var __webpack_exports__ = __nccwpck_require__(664);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;