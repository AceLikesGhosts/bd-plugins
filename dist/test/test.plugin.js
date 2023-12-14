/**
* @name Test
* @description Plugin to test the Updater.
* @author ace.
* @version 0.0.1
* @source https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/test/test.plugin.js
* @updateLink https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/test/test.plugin.js
* @authorLink https://github.com/AceLikesGhosts/bd-plugins
* @authorId 327639826075484162
*/
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 984:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSemVer = void 0;
// gotta really make sure its pure yknow
/** @__PURE__ */
function getSemVer(version) {
    try {
        return new DiscordSemVer(version);
    }
    catch (_) {
        return false;
    }
}
exports.getSemVer = getSemVer;
/** @__PURE__ */
const DiscordSemVer = BdApi.Webpack.getByKeys('valid', 'clean', 'satisfies');
exports["default"] = DiscordSemVer;


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

/***/ 749:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const SemVer_1 = __nccwpck_require__(984);
const logger_1 = __importDefault(__nccwpck_require__(95));
const Metadata_1 = __importDefault(__nccwpck_require__(735));
// ncc doesn't touch our funny imports
const fs_1 = __nccwpck_require__(147);
const path_1 = __importDefault(__nccwpck_require__(17));
const updateLogger = new logger_1.default({
    name: 'Updater',
    version: 'INTERNAL'
});
async function downloadFromRelease(currentMeta, currentSemver) {
    const releaseURL = `https://api.github.com/repos/${currentMeta.updateLink.split('.com/')[1]}`;
    const releases = await (await fetch(releaseURL)).json();
    for (let i = 0; i < releases.length; i++) {
        const release = releases[i];
        // v1.0.0_NAME
        // v0.5.1-RC_NAME
        const splitName = release.tag_name.split('_');
        const name = splitName[1];
        // missing name, or wrong name (this will fuck people who rename plugins)
        if (!name || name !== currentMeta.name) {
            continue;
        }
        // our version is higher
        if (currentSemver.compare(splitName[0]) !== -1) {
            continue;
        }
        for (let j = 0; j < release.assets.length; j++) {
            const asset = release.assets[j];
            if (asset.name !== `${currentMeta.name}.plugin.js`) {
                continue;
            }
            // this is the asset we want to use.
            // we now have to download it
            const outPath = path_1.default.join(BdApi.Plugins.folder, `${currentMeta.name}.plugin.js`);
            const resp = await fetch(asset.browser_download_url);
            const buffer = await resp.arrayBuffer();
            (0, fs_1.unlink)(outPath, (err) => {
                if (err) {
                    updateLogger.critical(err);
                    return;
                }
                updateLogger.debug('unlinked file', outPath);
                (0, fs_1.writeFile)(outPath, Buffer.from(buffer), {}, (err) => {
                    if (err) {
                        updateLogger.critical(err);
                        return;
                    }
                    updateLogger.debug(`updated plugin ${currentMeta.name} to ${splitName[0]} from ${currentMeta.version}`);
                });
            });
        }
    }
}
async function downloadFromRaw(currentMeta, currentSemver) {
    const text = await (await fetch(currentMeta.updateLink)).text();
    const rawMeta = (0, Metadata_1.default)(text);
    if (currentSemver.compare(rawMeta.version) !== -1) {
        return;
    }
    const outPath = path_1.default.join(BdApi.Plugins.folder, `${currentMeta.name}.plugin.js`);
    (0, fs_1.unlink)(outPath, (err) => {
        if (err) {
            updateLogger.critical(err);
            return;
        }
        (0, fs_1.writeFile)(outPath, text, (err) => {
            if (err) {
                updateLogger.critical(err);
                return;
            }
            updateLogger.debug(`updated plugin ${currentMeta.name} to ${rawMeta.version} from ${currentMeta.version}`);
        });
    });
}
class Updater {
    constructor(meta) {
        this.id = null;
        const semVer = (0, SemVer_1.getSemVer)(meta.version);
        if (meta.updateLink?.startsWith('https://github.com/')) {
            this.id = setInterval(() => {
                updateLogger.debug('attempting to download from releases');
                void downloadFromRelease(meta, semVer);
            }, Updater.DURATION);
        }
        else if (meta.updateLink?.startsWith('https://raw.githubusercontent.com/')) {
            this.id = setInterval(() => {
                updateLogger.debug('attempting to download from raw');
                void downloadFromRaw(meta, semVer);
            }, Updater.DURATION);
        }
        else {
            throw new Error(`Illegal Scheme Expected: Recieved UpdateURL "${meta.updateLink}" but it was not a Raw Github link nor a link to a mono repo supporting releases.`);
        }
    }
    stop() {
        if (this.id) {
            clearInterval(this.id);
        }
    }
}
Updater.DURATION = 3600;
exports["default"] = Updater;


/***/ }),

/***/ 735:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/** @__PURE__ */
const splitRegex = /[^\S\r\n]*?\r?(?:\r\n|\n)[^\S\r\n]*?\*[^\S\r\n]?/;
/** @__PURE__ */
const escapedAtRegex = /^\\@/;
function parseJSDocMeta(fileContent) {
    const block = fileContent.split('/**', 2)[1].split('*/', 1)[0];
    const out = {};
    let field = '';
    let accum = '';
    for (const line of block.split(splitRegex)) {
        if (line.length === 0)
            continue;
        if (line.charAt(0) === '@' && line.charAt(1) !== ' ') {
            out[field] = accum;
            const l = line.indexOf(' ');
            field = line.substring(1, l);
            accum = line.substring(l + 1);
        }
        else {
            accum += ' ' + line.replace('\\n', '\n').replace(escapedAtRegex, '@');
        }
    }
    out[field] = accum.trim();
    delete out[''];
    out.format = 'jsdoc';
    return out;
}
exports["default"] = parseJSDocMeta;


/***/ }),

/***/ 742:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const updater_1 = __importDefault(__nccwpck_require__(749));
class test {
    constructor(meta) {
        this.updater = new updater_1.default(meta);
    }
    start() {
        console.log('started');
    }
    stop() {
        console.log('stopped');
        this.updater.stop();
    }
}
exports["default"] = test;


/***/ }),

/***/ 147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 17:
/***/ ((module) => {

module.exports = require("path");

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
/******/ 	var __webpack_exports__ = __nccwpck_require__(742);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;