/**
* @name VCMuteUnknown
* @description .
* @author ace.
* @version 0.0.1-rc
* @source https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/VCMuteUnknown/VCMuteUnknown.plugin.js
* @authorLink https://github.com/AceLikesGhosts/bd-plugins
* @website https://github.com/AceLikesGhosts/bd-plugins
* @updateLink https://github.com/AceLikesGhosts/bd-plugins
* @authorId 327639826075484162
*/
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 281:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FormNotice = exports.FormSwitch = exports.FormDivider = exports.FormLabel = exports.FormText = exports.FormTitle = exports.FormItem = exports.FormSection = void 0;
const _1 = __nccwpck_require__(799);
_a = _1.RawComponents, exports.FormSection = _a.FormSection, exports.FormItem = _a.FormItem, exports.FormTitle = _a.FormTitle, exports.FormText = _a.FormText, exports.FormLabel = _a.FormLabel, exports.FormDivider = _a.FormDivider, exports.FormSwitch = _a.FormSwitch, exports.FormNotice = _a.FormNotice;


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

/***/ 366:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = BdApi.Webpack.getStore('RelationshipStore');


/***/ }),

/***/ 244:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = BdApi.Webpack.getStore('UserProfileStore');


/***/ }),

/***/ 682:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = BdApi.Webpack.getStore('UserStore');


/***/ }),

/***/ 999:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const components_1 = __nccwpck_require__(799);
const Form_1 = __nccwpck_require__(281);
const __1 = __importDefault(__nccwpck_require__(589));
const Margins = BdApi.Webpack.getByKeys('marginBottom40');
function Settings() {
    const [mute, setMute] = components_1.React.useState(__1.default.settings.mute ?? __1.default.DefaultSettings.mute);
    const [muteSoundboard, setMuteSoundboard] = components_1.React.useState(__1.default.settings.muteSoundboard ?? __1.default.DefaultSettings.muteSoundboard);
    const [ignoreFriends, setIgnoreFriends] = components_1.React.useState(__1.default.settings.ignoreFriends ?? __1.default.DefaultSettings.ignoreFriends);
    const [ignoreMutuals, setIgnoreMutuals] = components_1.React.useState(__1.default.settings.ignoreMutuals ?? __1.default.DefaultSettings.ignoreMutuals);
    return (components_1.React.createElement("div", null,
        components_1.React.createElement(components_1.RawComponents.Text, { variant: 'text-xs', className: Margins.marginBottom20 }, "Made with \uD83D\uDC96 for my beloved lulu-uwu-pookie-bear"),
        components_1.React.createElement(Form_1.FormSwitch, { value: mute, onChange: ((e) => setMute(e)), note: 'Local mutes newly joining people upon them joining the voice channel.' }, "Local Mute"),
        components_1.React.createElement(Form_1.FormSwitch, { value: muteSoundboard, onChange: ((e) => setMuteSoundboard(e)), note: 'Local mutes soundboards upon newly joining people joining the voice channel.' }, "Local Mute Soundboard"),
        components_1.React.createElement(Form_1.FormSwitch, { value: ignoreFriends, onChange: ((e) => setIgnoreFriends(e)), note: 'Should we ignore friends who join the voice channel?' }, "Ignore Friends"),
        components_1.React.createElement(Form_1.FormSwitch, { value: ignoreMutuals, onChange: ((e) => setIgnoreMutuals(e)), note: 'Should we ignore anybody that we have mutuals with?' }, "Ignore Mutuals")));
}
exports["default"] = Settings;


/***/ }),

/***/ 589:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_json_1 = __importDefault(__nccwpck_require__(846));
const Dispatcher_1 = __importDefault(__nccwpck_require__(115));
const Settings_1 = __importDefault(__nccwpck_require__(999));
const UserStore_1 = __importDefault(__nccwpck_require__(682));
const RelationshipStore_1 = __importDefault(__nccwpck_require__(366));
const UserProfileStore_1 = __importDefault(__nccwpck_require__(244));
const logger_1 = __importDefault(__nccwpck_require__(95));
class VCMuteUnknown {
    constructor() {
        this.logger = new logger_1.default(config_json_1.default);
        this.mediaUserHelpers = null;
        this.mediaEngineStore = null;
        this.soundboardStore = null;
        this.ourId = null;
        this.ourChannelId = null;
    }
    handleUserJoin(voiceState) {
        if (voiceState.type !== 'VOICE_STATE_UPDATES')
            return;
        for (let i = 0; i < voiceState.voiceStates.length; i++) {
            const vs = voiceState.voiceStates[i];
            if (vs.userId === (this?.ourId || UserStore_1.default.getCurrentUser().id)) {
                this.ourChannelId = vs.channelId;
                this.logger.log('updated ourChannelId to: ', vs.channelId);
                return;
            }
            if (vs.channelId !== this?.ourChannelId)
                return;
            // they updated say personal mute, or deafen/screenshare/etc, therefore we dont care
            if (vs.channelId === vs.oldChannelId)
                return;
            if (VCMuteUnknown.settings.ignoreFriends && RelationshipStore_1.default.isFriend(vs.userId))
                return;
            if (VCMuteUnknown.settings.ignoreMutuals && UserProfileStore_1.default.getMutualFriends(vs.userId) !== undefined)
                return;
            if (VCMuteUnknown.settings.mute) {
                if (!this.mediaEngineStore?.isLocalMute(vs.userId)) {
                    this.logger.log('local muting user due to them joining voice channel: ', vs.userId);
                    this.mediaUserHelpers?.toggleLocalMute(vs.userId);
                }
                else
                    this.logger.log('user was already muted so we are not doing anything', vs.userId);
            }
            if (VCMuteUnknown.settings.muteSoundboard) {
                if (!this.soundboardStore?.isLocalSoundboardMuted(vs.userId)) {
                    this.logger.log('local diasble soundboard due to them joining voice channel: ', vs.userId);
                    this.mediaUserHelpers?.toggleLocalSoundboardMute(vs.userId);
                }
                else
                    this.logger.info('user was already soundboard muted so we are not doing anything', vs.userId);
            }
        }
    }
    start() {
        this.logger.log('started');
        this.mediaUserHelpers = BdApi.Webpack.getByKeys('toggleLocalMute', 'toggleSelfDeaf', 'toggleSelfMute');
        this.mediaEngineStore = BdApi.Webpack.getStore('MediaEngineStore');
        this.soundboardStore = BdApi.Webpack.getStore('SoundboardStore');
        this.ourId = UserStore_1.default.getCurrentUser().id;
        Dispatcher_1.default.subscribe('VOICE_STATE_UPDATES', this.handleUserJoin.bind(this));
    }
    stop() {
        this.logger.log('stopped');
        Dispatcher_1.default.unsubscribe('VOICE_STATE_UPDATES', this.handleUserJoin.bind(this));
        this.mediaUserHelpers = null;
    }
    getSettingsPanel() {
        return Settings_1.default.bind(this);
    }
}
VCMuteUnknown.DefaultSettings = {
    mute: true,
    muteSoundboard: true,
    ignoreMutuals: false,
    ignoreFriends: true
};
VCMuteUnknown.settings = VCMuteUnknown.DefaultSettings;
exports["default"] = VCMuteUnknown;


/***/ }),

/***/ 846:
/***/ ((module) => {

module.exports = JSON.parse('{"$schema":"../../config_schema.jsonc","name":"VCMuteUnknown","description":".","author":"ace.","version":"0.0.1-rc","source":"https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/VCMuteUnknown/VCMuteUnknown.plugin.js","authorLink":"https://github.com/AceLikesGhosts/bd-plugins","website":"https://github.com/AceLikesGhosts/bd-plugins","updateLink":"https://github.com/AceLikesGhosts/bd-plugins","authorId":"327639826075484162"}');

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
/******/ 	var __webpack_exports__ = __nccwpck_require__(589);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;