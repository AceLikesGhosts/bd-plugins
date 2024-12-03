/**
* @name RandomiseFileNames
* @description Change up your file names.
* @author ace.
* @version 1.0.1
* @source https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/RandomiseFileNames/RandomiseFileNames.plugin.js
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

/***/ 281:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FormNotice = exports.FormSwitch = exports.FormDivider = exports.FormLabel = exports.FormText = exports.FormTitle = exports.FormItem = exports.FormSection = void 0;
const _1 = __nccwpck_require__(799);
_a = _1.RawComponents, exports.FormSection = _a.FormSection, exports.FormItem = _a.FormItem, exports.FormTitle = _a.FormTitle, exports.FormText = _a.FormText, exports.FormLabel = _a.FormLabel, exports.FormDivider = _a.FormDivider, exports.FormSwitch = _a.FormSwitch, exports.FormNotice = _a.FormNotice;


/***/ }),

/***/ 571:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const _1 = __nccwpck_require__(799);
const { TextInput } = _1.RawComponents;
exports["default"] = TextInput;


/***/ }),

/***/ 799:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.React = exports.Margins = exports.RawComponents = void 0;
exports.RawComponents = BdApi.Webpack.getByKeys('Button', 'Switch', 'Select');
exports.Margins = BdApi.Webpack.getByKeys('marginBottom40', 'marginTop4');
exports.React = BdApi.React;


/***/ }),

/***/ 360:
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
const Form_1 = __nccwpck_require__(281);
const TextInput_1 = __importDefault(__nccwpck_require__(571));
const Lodash_1 = __importDefault(__nccwpck_require__(317));
const __1 = __importStar(__nccwpck_require__(996));
function TextInput(props) {
    return (components_1.React.createElement(Form_1.FormItem, { style: {
            width: '50%'
        }, className: components_1.Margins.marginBottom20, ...props },
        components_1.React.createElement(TextInput_1.default, { ...props })));
}
function Settings() {
    const [letters, setLetters] = components_1.React.useState(__1.default.settings.letters ?? __1.DefaultSettings.letters);
    const [maxLetters, setMaxLetters] = components_1.React.useState(__1.default.settings.maxLetters ?? __1.DefaultSettings.maxLetters);
    const [timestamp, setTimestamp] = components_1.React.useState(__1.default.settings.timestamp ?? __1.DefaultSettings.timestamp);
    const [consistent, setConsistent] = components_1.React.useState(__1.default.settings.consistent ?? __1.DefaultSettings.consistent);
    const [consistentText, setConsistentText] = components_1.React.useState(__1.default.settings.consistentText ?? __1.DefaultSettings.consistentText);
    components_1.React.useEffect(() => {
        __1.default.settings = {
            letters,
            maxLetters,
            timestamp,
            consistent,
            consistentText
        };
    }, [letters, maxLetters, timestamp, consistent, consistentText]);
    return (components_1.React.createElement("div", null,
        components_1.React.createElement(Form_1.FormSwitch, { value: letters, onChange: ((e) => setLetters(e)), disabled: timestamp || consistent }, "Random Letters"),
        components_1.React.createElement(TextInput, { title: 'Maximum Amount of Letters', value: maxLetters?.toString(), disabled: !letters && (timestamp || consistent), onChange: (e) => {
                if (!Lodash_1.default.isNumber(e))
                    return;
                setMaxLetters(e);
            } }),
        components_1.React.createElement(Form_1.FormSwitch, { value: timestamp, onChange: ((e) => setTimestamp(e)), disabled: letters || consistent }, "Timestamp"),
        components_1.React.createElement(Form_1.FormSwitch, { value: consistent, onChange: ((e) => setConsistent(e)), disabled: letters || timestamp }, "Consistent"),
        components_1.React.createElement(TextInput, { title: 'Consistent Text', value: consistentText, disabled: !consistent && (timestamp || letters), onChange: (e) => setConsistentText(e) })));
}
exports["default"] = Settings;


/***/ }),

/***/ 996:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DefaultSettings = void 0;
const config_json_1 = __importDefault(__nccwpck_require__(182));
const Settings_1 = __importDefault(__nccwpck_require__(360));
exports.DefaultSettings = {
    letters: true,
    maxLetters: 7,
    timestamp: false,
    consistent: false,
    consistentText: 'image'
};
const uploadFileMod = BdApi.Webpack.getByKeys('uploadFiles');
const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+';
function getRandomCharacters(length) {
    let out = '';
    for (let i = 0; i < length; i++) {
        out += characters.charAt(Math.random() * characters.length);
    }
    return out;
}
class RandomiseFileName {
    start() {
        const data = BdApi.Data.load(config_json_1.default.name, 'settings');
        RandomiseFileName.settings = {
            ...exports.DefaultSettings,
            ...data
        };
        BdApi.Patcher.after(config_json_1.default.name, uploadFileMod, 'uploadFiles', (_, args) => {
            for (const file of args[0].uploads) {
                const newName = this.makeFileName(file.filename);
                file.filename = newName;
            }
        });
    }
    stop() {
        BdApi.Patcher.unpatchAll(config_json_1.default.name);
        BdApi.Data.save(config_json_1.default.name, 'settings', RandomiseFileName.settings);
    }
    getSettingsPanel() {
        return Settings_1.default;
    }
    makeFileName(fileName) {
        const splitStuff = fileName.split('.'); // somefile.png ['somefile', 'png']
        const fileExt = splitStuff[splitStuff.length - 1];
        if (RandomiseFileName.settings.letters)
            return `${getRandomCharacters(RandomiseFileName.settings.maxLetters)}.${fileExt}`;
        if (RandomiseFileName.settings.consistent)
            return `${RandomiseFileName.settings.consistentText}.${fileExt}`;
        if (RandomiseFileName.settings.timestamp)
            return `${Date.now()}.${fileExt}`;
        return fileName;
    }
}
RandomiseFileName.settings = exports.DefaultSettings;
exports["default"] = RandomiseFileName;


/***/ }),

/***/ 182:
/***/ ((module) => {

module.exports = JSON.parse('{"$schema":"../../config_schema.jsonc","name":"RandomiseFileNames","description":"Change up your file names.","author":"ace.","version":"1.0.1","source":"https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/RandomiseFileNames/RandomiseFileNames.plugin.js","authorLink":"https://github.com/AceLikesGhosts/bd-plugins","website":"https://github.com/AceLikesGhosts/bd-plugins","updateLink":"https://github.com/AceLikesGhosts/bd-plugins","authorId":"327639826075484162"}');

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
/******/ 	var __webpack_exports__ = __nccwpck_require__(996);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;