/**
* @name PlatformSpoofer
* @description Allows for spoofing what device you are using to Discord's WebSocket.
* @author ace.
* @version 1.0.0
* @source https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/PlatformSpoofer/PlatformSpoofer.plugin.js
* @authorLink https://github.com/AceLikesGhosts/bd-plugins
* @authorId 327639826075484162
*/
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

/***/ 556:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RadioItem = void 0;
const _1 = __nccwpck_require__(799);
const Form_1 = __nccwpck_require__(281);
const { RadioGroup: RawRadioGroup } = _1.RawComponents;
const _2 = __nccwpck_require__(799);
function RadioItem(props) {
    return (_2.React.createElement(Form_1.FormItem, { ...props },
        _2.React.createElement(RawRadioGroup, { ...props })));
}
exports.RadioItem = RadioItem;
exports["default"] = RawRadioGroup;


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

/***/ 298:
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
const Radio_1 = __nccwpck_require__(556);
const __1 = __importStar(__nccwpck_require__(1));
const Flex_1 = __importDefault(__nccwpck_require__(348));
const Button_1 = __importDefault(__nccwpck_require__(776));
function Settings() {
    const [type, setType] = components_1.React.useState(__1.default.settings.type ?? __1.default.DefaultSettings.type);
    const [isSocketOpen, setSocketOpen] = components_1.React.useState(__1.default.socket?.isConnected() ?? false);
    components_1.React.useEffect(() => {
        __1.default.settings.type = type;
    }, [type]);
    return (components_1.React.createElement("div", null,
        components_1.React.createElement(Radio_1.RadioItem, { title: 'Websocket Spoofing', options: Object.keys(__1.PropertiesToSpoofAs).map((v) => {
                return {
                    name: v,
                    value: v
                };
            }), onChange: ((e) => setType(e.value)), value: type }),
        components_1.React.createElement(Flex_1.default, { align: Flex_1.default.Direction.HORIZONTAL },
            components_1.React.createElement(Button_1.default, { color: isSocketOpen ? Button_1.default.Colors.RED : Button_1.default.Colors.PRIMARY, onClick: (() => {
                    if (isSocketOpen) {
                        __1.default.socket?.close();
                        setSocketOpen(false);
                        BdApi.UI.showToast('Closed WebSocket', { type: 'warn' });
                        return;
                    }
                    setSocketOpen(true);
                    BdApi.UI.showToast('Opened WebSocket', { type: 'success' });
                    __1.default.socket?.connect();
                }) }, isSocketOpen ? 'Disconnect From WebSocket' : 'Connect To WebSocket'))));
}
exports["default"] = Settings;


/***/ }),

/***/ 1:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PropertiesToSpoofAs = void 0;
const logger_1 = __importDefault(__nccwpck_require__(95));
const config_json_1 = __importDefault(__nccwpck_require__(429));
const Settings_1 = __importDefault(__nccwpck_require__(298));
exports.PropertiesToSpoofAs = {
    ios: {
        browser: 'Discord iOS',
        os: 'iOS'
    },
    android: {
        browser: 'Discord Android',
        os: 'Android'
    },
    web: {
        browser: 'Discord Web',
        os: 'Other'
    },
    linux: {
        browser: 'Discord Client',
        os: 'Linux'
    },
    win32: {
        browser: 'Discord Client',
        os: 'Windows'
    },
    darwin: {
        browser: 'Discord Client',
        os: 'Mac OS X'
    }
};
class PlatformSpoofer {
    constructor() {
        this.propertyStuff = null;
        this.logger = new logger_1.default(config_json_1.default);
    }
    start() {
        this.logger.log('started');
        this.logger.log('found websocket module');
        _a.socket = BdApi.Webpack.getByKeys('socket', 'localVoiceState').socket;
        this.logger.log('found property related things (getSuperProperties, getSuperPropertiesBase64)');
        this.propertyStuff = BdApi.Webpack.getByKeys('getSuperProperties', 'getSuperPropertiesBase64');
        this.logger.log('patched `getSuperProperties`');
        BdApi.Patcher.instead(config_json_1.default.name, this.propertyStuff, 'getSuperProperties', (context, args, orig) => {
            if (!_a.settings.active)
                return orig.apply(context, args);
            const data = orig.apply(context, args);
            return {
                ...data,
                browser: exports.PropertiesToSpoofAs[_a.settings?.type]?.browser,
                os: exports.PropertiesToSpoofAs[_a.settings?.type]?.os
            };
        });
    }
    stop() {
        BdApi.Patcher.unpatchAll(config_json_1.default.name);
        BdApi.UI.showConfirmationModal('Refresh Client', 'In order to fully disable PlatformSpoofer you are required to reload your Discord client.', {
            onConfirm() {
                window.location.reload();
            },
            onCancel() {
                return;
            },
        });
    }
    getSettingsPanel() {
        return Settings_1.default.bind(this);
    }
}
_a = PlatformSpoofer;
PlatformSpoofer.socket = null;
PlatformSpoofer.DefaultSettings = {
    active: true,
    type: 'win32'
};
PlatformSpoofer.settings = _a.DefaultSettings;
exports["default"] = PlatformSpoofer;


/***/ }),

/***/ 429:
/***/ ((module) => {

module.exports = JSON.parse('{"$schema":"../../config_schema.jsonc","name":"PlatformSpoofer","description":"Allows for spoofing what device you are using to Discord\'s WebSocket.","author":"ace.","version":"1.0.0","source":"https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/PlatformSpoofer/PlatformSpoofer.plugin.js","authorLink":"https://github.com/AceLikesGhosts/bd-plugins","authorId":"327639826075484162"}');

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
/******/ 	var __webpack_exports__ = __nccwpck_require__(1);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;