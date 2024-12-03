/**
* @name CopyActivity
* @description .
* @author ace.
* @version 1.0.1
* @source https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/CopyActivity/CopyActivity.plugin.js
* @authorLink https://github.com/AceLikesGhosts/bd-plugins
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

/***/ 681:
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

/***/ 335:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActivityType = void 0;
exports.ActivityType = {
    Playing: 0,
    Streaming: 1,
    Listening: 2,
    Watching: 3,
    Competing: 5
};
// export default /** @__PURE__ */ BdApi.Webpack.getByStrings('renderXboxImage') as new (args: UserActivityProps) => UserActivity;
exports["default"] = BdApi.Webpack.getByStrings('renderXboxImage');


/***/ }),

/***/ 896:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = BdApi.Webpack.getStore('PresenceStore');


/***/ }),

/***/ 771:
/***/ ((__unused_webpack_module, exports) => {


// // this is actually the raw classes of
// // the dispatcher, store, and some store utils
// // but those are already exported
Object.defineProperty(exports, "__esModule", ({ value: true }));
// import type { FluxDispatcher } from '../modules/Dispatcher';
// import type { Store } from './Store';
// interface StoreUtils {
//     Dispatcher: new (...args: any[]) => FluxDispatcher,
//     Store: new (...args: any[]) => Store;
//     BatchedStoreListener: new (...args: any[]) => unknown; // class
//     default: unknown; // idk and cba to find out
//     useSyncExternalStore<T>(stores: unknown[], callback: () => T | T[]): T[];
//     useStateFromStoresArray<T>(stores: unknown[], callback: () => unknown): T[];
//     useStateFromStoresObject<T>(stores: unknown[], callback: () => unknown): T[];
// }
// export default /** @__PURE__ */ BdApi.Webpack.getByKeys('Store', 'useStateFromStores') as StoreUtils;
exports["default"] = BdApi.Webpack.getByStrings('useStateFromStores', { searchExports: true });


/***/ }),

/***/ 682:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = BdApi.Webpack.getStore('UserStore');


/***/ }),

/***/ 756:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const components_1 = __nccwpck_require__(681);
const UserStore_1 = __importDefault(__nccwpck_require__(682));
const _1 = __nccwpck_require__(903);
const StoreUtils_1 = __importDefault(__nccwpck_require__(771));
const PresenceStore_1 = __importDefault(__nccwpck_require__(896));
const { Item } = BdApi.ContextMenu;
const UserActivity_1 = __nccwpck_require__(335);
const Lodash_1 = __importDefault(__nccwpck_require__(317));
const util_1 = __nccwpck_require__(957);
// import CopyItems from './CopyItems';
function PatchUserContext() {
    _1.logger.log('Patched UserContext');
    return BdApi.ContextMenu.patch('user-context', (res, props) => {
        const activities = (0, StoreUtils_1.default)([PresenceStore_1.default], () => PresenceStore_1.default.getActivities(props.user.id));
        if (props.user.id === UserStore_1.default.getCurrentUser().id) {
            res.props.children.push(components_1.React.createElement(Item, { label: 'Activity Utilities', id: `local-copy-activity-${props.user.id}` },
                components_1.React.createElement(Item, { label: 'Presences', id: `select-presence-${props.user.id}`, disabled: Boolean(activities.length === 0) }, !!activities.length &&
                    components_1.React.createElement(components_1.React.Fragment, null,
                        components_1.React.createElement(Item, { label: 'Click to remove...', id: `second-very-cool-label-name-${props.user.id}` }),
                        components_1.React.createElement(BdApi.ContextMenu.Separator, null),
                        activities.map((activity, i) => (activity.name !== 'Custom Status' && components_1.React.createElement(Item, { key: String(i), id: `activity-stealing-${String(i)}`, label: `${Lodash_1.default.findKey(UserActivity_1.ActivityType, v => v === activity.type)} ${activity.name}`, action: (() => {
                                _1.logger.log(`Removing activity ${activity.name}`, i, activity);
                                void (0, util_1.removeActivity)(activity);
                            }) }))))),
                components_1.React.createElement(Item, { label: 'Monitor Stealing', id: `monitor-stealing-presences-${props.user.id}`, disabled: Boolean(_1.activelyStealActivitiesFrom.size === 0) }, !!_1.activelyStealActivitiesFrom.size && components_1.React.createElement(components_1.React.Fragment, null,
                    components_1.React.createElement(Item, { label: 'Click to remove...', id: `very-cool-label-name-${props.user.id}` }),
                    components_1.React.createElement(BdApi.ContextMenu.Separator, null),
                    [..._1.activelyStealActivitiesFrom].map((id) => components_1.React.createElement(Item, { label: `${UserStore_1.default.getUser(id).username} (${id})`, id: `stop-stealing-actiivties-${id}`, action: (() => {
                            _1.logger.log(`Stopping monitor stealing of ${props.user.id}'s activities (context click)`);
                            _1.activelyStealActivitiesFrom.delete(id);
                        }) }))))));
            return;
        }
        res.props.children.push(components_1.React.createElement(Item, { label: 'Activity Utilities', id: `copy-activity-${props.user.id}` },
            components_1.React.createElement(Item, { label: 'Presences', id: `select-presence-${props.user.id}` }, activities.map((activity, i) => (activity.name !== 'Custom Status' && components_1.React.createElement(Item, { key: String(i), id: `activity-stealing-${String(i)}`, disabled: activity.type === UserActivity_1.ActivityType.Listening && activity.name === 'Spotify', label: `${Lodash_1.default.findKey(UserActivity_1.ActivityType, v => v === activity.type)} ${activity.name}`, action: (() => {
                    _1.logger.log(`Applying activity ${activity.name}`, i, activity);
                    void (0, util_1.applyActivity)(activity);
                }) })))),
            components_1.React.createElement(Item, { label: 'Take All Activities', id: `take-activities-${props.user.id}`, action: (() => {
                    _1.logger.log(`Taking ${props.user.id}'s activities (context click)`);
                    const activities = PresenceStore_1.default.getActivities(props.user.id);
                    if (activities === null) {
                        _1.logger.log(`No activities to steal from ${props.user.id}`);
                        return;
                    }
                    for (let i = 0; i < activities.length; i++) {
                        const activity = activities[i];
                        if (activity.type === UserActivity_1.ActivityType.Listening && activity.name === 'Spotify')
                            continue;
                        void (0, util_1.applyActivity)(activity);
                    }
                }) }),
            _1.activelyStealActivitiesFrom.has(props.user.id) ?
                components_1.React.createElement(Item, { label: 'Stop Stealing Activities (monitoring)', id: `stop-stealing-activities-${props.user.id}`, action: (() => {
                        _1.logger.log(`Stopping monitor stealing of ${props.user.id}'s activities (context click)`);
                        _1.activelyStealActivitiesFrom.delete(props.user.id);
                    }) })
                : components_1.React.createElement(Item, { label: 'Steal Activities (monitoring)', id: `steal-activities-${props.user.id}`, action: (() => {
                        _1.logger.log(`Monitor stealing ${props.user.id}'s activities (context click)`);
                        _1.activelyStealActivitiesFrom.add(props.user.id);
                    }) })));
    });
}
exports["default"] = PatchUserContext;


/***/ }),

/***/ 903:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activelyStealActivitiesFrom = exports.logger = void 0;
const UserActivity_1 = __nccwpck_require__(335);
const logger_1 = __importDefault(__nccwpck_require__(95));
const config_json_1 = __importDefault(__nccwpck_require__(799));
const PatchContext_1 = __importDefault(__nccwpck_require__(756));
const Dispatcher_1 = __importDefault(__nccwpck_require__(115));
const util_1 = __nccwpck_require__(957);
exports.logger = new logger_1.default(config_json_1.default);
exports.activelyStealActivitiesFrom = new Set();
function handlePresenceUpdate(e) {
    if (e.type !== 'PRESENCE_UPDATES')
        return;
    for (let i = 0; i < e.updates.length; i++) {
        const update = e.updates[i];
        if (!exports.activelyStealActivitiesFrom.has(update.user.id))
            continue;
        update.activities.forEach((activity) => {
            if ((activity.type === UserActivity_1.ActivityType.Listening && activity.name === 'Spotify') || activity.name === 'Custom Status')
                return;
            exports.logger.log(`Stealing activity from ${update.user.username} (${update.user.id})`, activity);
            void (0, util_1.applyActivity)(activity);
        });
    }
}
class CopyActivity {
    constructor() {
        this.cancel = null;
    }
    start() {
        exports.logger.log('started');
        exports.logger.log('patched user context');
        this.cancel = (0, PatchContext_1.default)();
        Dispatcher_1.default.subscribe('PRESENCE_UPDATES', handlePresenceUpdate);
    }
    stop() {
        exports.logger.log('stopped');
        exports.logger.log('unsubscribed from PRESENCE_UPDATES');
        Dispatcher_1.default.unsubscribe('PRESENCE_UPDATES', handlePresenceUpdate);
        exports.logger.log('cleared constant stealing ids');
        exports.activelyStealActivitiesFrom.clear();
        exports.logger.log('unpatched user context');
        this.cancel();
    }
}
exports["default"] = CopyActivity;


/***/ }),

/***/ 957:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.removeActivity = exports.applyActivity = void 0;
const Dispatcher_1 = __importDefault(__nccwpck_require__(115));
function applyActivity(activity) {
    void Dispatcher_1.default.dispatch({
        type: 'LOCAL_ACTIVITY_UPDATE',
        activity: {
            ...activity
        },
        socketId: 'crpc'.concat(btoa(JSON.stringify(activity)).substr(0, 20))
    });
}
exports.applyActivity = applyActivity;
function removeActivity(activity) {
    void Dispatcher_1.default.dispatch({
        type: 'LOCAL_ACTIVITY_UPDATE',
        activity: {},
        socketId: 'crpc'.concat(btoa(JSON.stringify(activity)).substr(0, 20))
    });
}
exports.removeActivity = removeActivity;


/***/ }),

/***/ 799:
/***/ ((module) => {

module.exports = JSON.parse('{"$schema":"../../config_schema.jsonc","name":"CopyActivity","description":".","author":"ace.","version":"1.0.1","source":"https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/CopyActivity/CopyActivity.plugin.js","authorLink":"https://github.com/AceLikesGhosts/bd-plugins","authorId":"327639826075484162"}');

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
/******/ 	var __webpack_exports__ = __nccwpck_require__(903);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;