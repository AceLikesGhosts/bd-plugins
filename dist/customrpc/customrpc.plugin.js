/**
* @name CustomRPC
* @description Pretty decent RPC plugin.
* @author ace.
* @version 1.3.0-RC
* @source https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/CustomRPC/CustomRPC.plugin.js
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

/***/ 904:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const _1 = __nccwpck_require__(799);
exports["default"] = _1.RawComponents.AdvancedScrollerAuto;


/***/ }),

/***/ 973:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.selectControlFlexStyle = void 0;
const _1 = __nccwpck_require__(799);
exports.selectControlFlexStyle = '1 1 40%';
// export default /** @__PURE__ */ RawComponents.Select as (props: SelectProps) => JSX.Element
exports["default"] = _1.RawComponents.SingleSelect;


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

/***/ 95:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/** @__PURE__ */
const DefaultColors = {
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
    constructor(meta, colors = DefaultColors) {
        this._meta = meta;
        this._colors = colors;
    }
    print(type, message, ...data) {
        console[type](`%c[${this._meta.name}]%c(v${this._meta.version})`, this._colors.PLUGIN_NAME, this._colors.PLUGIN_VERSION, message, ...data);
    }
    log(message, ...data) {
        if (process.env.DEV?.toString()?.toLocaleLowerCase() === 'true' ||
            process.env.NODE_ENV?.toString()?.toLowerCase() === 'dev') {
            return this.warn('`log` is an alias for `info`, please use the `info` function.');
        }
        return this.info(message, ...data);
    }
    info(message, ...data) {
        return this.print('log', isError(message) ? getErrorMessage(message) : message, ...data);
    }
    warn(message, ...data) {
        return this.print('warn', isError(message) ? getErrorMessage(message) : message, ...data);
    }
    error(message, ...data) {
        if (process.env.DEV?.toString()?.toLocaleLowerCase() === 'true' ||
            process.env.NODE_ENV?.toString()?.toLowerCase() === 'dev') {
            return this.warn('`error` is an alias for `critical`, please use the `critical` function.');
        }
        return this.critical(message, ...data);
    }
    critical(message, ...data) {
        return this.print('error', isError(message) ? getErrorMessage(message) : message, ...data);
    }
}
exports["default"] = Logger;


/***/ }),

/***/ 248:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = BdApi.Webpack.getByKeys('getLocalPresence', 'getActivities');


/***/ }),

/***/ 570:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const filter = BdApi.Webpack.Filters.byStrings('getAssetImage: size must === [number, number] for Twitch');
exports["default"] = BdApi.Webpack.getModule(m => typeof m === 'object' &&
    Object.values(m /** this was asserted above */).some(filter));


/***/ }),

/***/ 115:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = BdApi.Webpack.getByKeys('_currentDispatchActionType', '_processingWaitQueue');


/***/ }),

/***/ 805:
/***/ ((__unused_webpack_module, exports) => {


// this is actually the raw classes of
// the dispatcher, store, and some store utils
// but those are already exported
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = BdApi.Webpack.getByKeys('Store', 'useStateFromStores');


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

/***/ 256:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = BdApi.Webpack.getStore('UserStore');


/***/ }),

/***/ 544:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const components_1 = __nccwpck_require__(799);
const RPCEditor_1 = __importDefault(__nccwpck_require__(131));
const activities_1 = __importDefault(__nccwpck_require__(916));
function Settings() {
    const [showRPC, setShowRPC] = components_1.React.useState(false);
    const [editingRPC, setEditingRPC] = components_1.React.useState(-1);
    const [rpcs, setRPCs] = components_1.React.useState(this.rpcs);
    console.log(`Settings.tsx:`, rpcs);
    components_1.React.useEffect(() => {
        if (editingRPC === -1)
            setShowRPC(false);
        else
            setShowRPC(true);
    }), [editingRPC];
    components_1.React.useEffect(() => {
        this.rpcs = rpcs;
    }, [rpcs]);
    const saveRPC = (rpc) => {
        setRPCs((r_rpc) => {
            r_rpc[editingRPC] = rpc;
            return r_rpc;
        });
    };
    return (components_1.React.createElement("div", { style: { color: '#fff' } }, showRPC === true ?
        components_1.React.createElement(RPCEditor_1.default, { save: saveRPC, back: (() => { setEditingRPC(-1); }), activity: rpcs[editingRPC] }) :
        components_1.React.createElement(activities_1.default, { rpcs: rpcs, setRPCs: setRPCs, setEditingRpc: setEditingRPC })));
}
exports["default"] = Settings;


/***/ }),

/***/ 331:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
// https://github.com/E-boi/replugged-plugins/blob/main/plugins/customrpc/components/UserActivities.tsx
// Totally legally taken code
const components_1 = __nccwpck_require__(799);
const UserActivity_1 = __importDefault(__nccwpck_require__(335));
const UserStore_1 = __importDefault(__nccwpck_require__(256));
// const { useStateFromStores } = StoreUtil;
const Button_1 = __importDefault(__nccwpck_require__(776));
const Flex_1 = __importDefault(__nccwpck_require__(348));
const classes = BdApi.Webpack.getByKeys('profileColors');
function UserActivities({ setEditingRpc, activityList: activities }) {
    // if(!useStateFromStores || !ActivityStore)
    // return <h1>Failed to find useStateFromStores or ActivityStore</h1>;
    // let activities = useStateFromStores([ActivityStore], () => ActivityStore.getActivities()) as Activity[];
    // activities = activities.filter((a) => activityList.includes(a));
    return (components_1.React.createElement("div", { className: `${classes?.profileColors} bd-rpc-activities` }, activities?.map((a, i) => UserActivity_1.default && a.type !== 4 && (components_1.React.createElement(Flex_1.default, { style: { width: '100%' } },
        components_1.React.createElement(UserActivity_1.default, { activity: a, className: 'bd-rpc-activity', source: 'Profile Modal', type: 'ProfileV2', useStoreStream: false, user: UserStore_1.default?.getCurrentUser() }),
        components_1.React.createElement(Flex_1.default, { style: { marginRight: 5 }, justify: Flex_1.default.Justify.END, align: Flex_1.default.Align.CENTER },
            components_1.React.createElement(Button_1.default, { onClick: () => {
                    setEditingRpc(i);
                } }, "Edit")))))));
}
exports["default"] = UserActivities;


/***/ }),

/***/ 916:
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
const UserActivities_1 = __importDefault(__nccwpck_require__(331));
const Flex_1 = __importDefault(__nccwpck_require__(348));
const Button_1 = __importDefault(__nccwpck_require__(776));
const Select_1 = __importDefault(__nccwpck_require__(973));
const Scroller_1 = __importDefault(__nccwpck_require__(904));
const index_1 = __importStar(__nccwpck_require__(364));
const ActivityStore_1 = __importDefault(__nccwpck_require__(248));
const StoreUtils_1 = __importDefault(__nccwpck_require__(805));
const { useStateFromStores } = StoreUtils_1.default;
function default_1({ rpcs, setEditingRpc, setRPCs }) {
    const [selectedRPC, setSelectedRPC] = components_1.React.useState(index_1.default.selRPC);
    components_1.React.useEffect(() => {
        index_1.default.selRPC = selectedRPC;
    }, [selectedRPC]);
    const appendRPC = (rpc) => {
        setRPCs((r_rpcs) => {
            return [...r_rpcs, rpc];
        });
    };
    function shallowEquals(a, b) {
        for (const key in a) {
            if (typeof a[key] === 'object' || typeof b[key] === 'object')
                continue;
            if (a[key] !== b[key]) {
                return false;
            }
        }
        return true;
    }
    const removeActivity = (spot) => {
        setRPCs((r_rpcs) => {
            return r_rpcs.filter((_, i) => {
                return i !== spot;
            });
        });
    };
    const activities = useStateFromStores([ActivityStore_1.default], () => ActivityStore_1.default.getActivities());
    const isRPCActive = () => {
        const rpc = rpcs[selectedRPC];
        return activities.some((r_rpc) => {
            return shallowEquals(rpc, r_rpc);
        });
    };
    return (components_1.React.createElement("div", null,
        components_1.React.createElement(Flex_1.default, { align: Flex_1.default.Align.START, direction: Flex_1.default.Direction.HORIZONTAL },
            components_1.React.createElement(Select_1.default
            // className={selectControl}
            , { 
                // className={selectControl}
                options: rpcs?.map((v, i) => {
                    return {
                        label: v.name,
                        value: i
                    };
                }), onChange: ((i) => {
                    console.log('changed radio to', i);
                    setSelectedRPC(i);
                }), value: selectedRPC ?? void 0, className: 'bd-rpc-single-select', serialize: ((v) => v.toString && v.toString()) }),
            components_1.React.createElement(Button_1.default, { style: { marginRight: '5px' }, size: Button_1.default.Sizes.MEDIUM, onClick: (() => {
                    if (selectedRPC === -1) {
                        return;
                    }
                    if (isRPCActive()) {
                        void index_1.default.setRPC(void 0);
                        return;
                    }
                    void index_1.default.setRPC(rpcs[selectedRPC]);
                }) }, selectedRPC !== -1 && isRPCActive() ? 'Remove' : 'Set'),
            components_1.React.createElement(Button_1.default, { color: Button_1.default.Colors.RED, style: { marginRight: '5px' }, size: Button_1.default.Sizes.MEDIUM, onClick: (() => {
                    if (selectedRPC === -1) {
                        return;
                    }
                    removeActivity(selectedRPC);
                    setSelectedRPC(-1);
                }) }, "Delete"),
            components_1.React.createElement(Button_1.default, { size: Button_1.default.Sizes.MEDIUM, onClick: (() => {
                    console.log('made new profile (default)', index_1.RPC_DEFAULT);
                    appendRPC(index_1.RPC_DEFAULT);
                    setSelectedRPC(rpcs.length);
                }) }, "New")),
        components_1.React.createElement(Scroller_1.default, null,
            components_1.React.createElement(UserActivities_1.default, { setEditingRpc: setEditingRpc, activityList: rpcs }))));
}
exports["default"] = default_1;


/***/ }),

/***/ 131:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const components_1 = __nccwpck_require__(799);
const Button_1 = __importDefault(__nccwpck_require__(776));
const TextInput_1 = __importDefault(__nccwpck_require__(571));
const UserActivity_1 = __nccwpck_require__(335);
const Form_1 = __nccwpck_require__(281);
const Radio_1 = __nccwpck_require__(556);
const Flex_1 = __importDefault(__nccwpck_require__(348));
function TextInput(props) {
    return (components_1.React.createElement(Form_1.FormItem, { style: {
            width: '50%'
        }, className: components_1.Margins.marginBottom20, ...props },
        components_1.React.createElement(TextInput_1.default, { ...props })));
}
function RPCEditor({ activity, save, back }) {
    const [tempRPC, setTempRPC] = components_1.React.useState(activity);
    const [showTime, setShowTime] = components_1.React.useState(false);
    const appendRPC = (rpc) => {
        setTempRPC((r_rpc) => {
            return {
                ...r_rpc,
                ...rpc
            };
        });
    };
    return (components_1.React.createElement("div", null,
        components_1.React.createElement(TextInput, { title: 'Application Id', value: tempRPC.application_id, required: true, onChange: ((e) => appendRPC({ application_id: e })) }),
        components_1.React.createElement(TextInput, { title: 'Name', value: tempRPC.name, required: true, onChange: ((e) => appendRPC({ name: e })) }),
        components_1.React.createElement(TextInput, { title: 'Details', value: tempRPC.details, required: true, onChange: ((e) => appendRPC({ details: e })) }),
        components_1.React.createElement(TextInput, { title: 'State', value: tempRPC.state, onChange: ((e) => {
                if (tempRPC.type === UserActivity_1.ActivityType.Listening) {
                    appendRPC({ assets: { large_text: e } });
                    return;
                }
                appendRPC({ state: e });
            }) }),
        components_1.React.createElement(TextInput, { title: 'Large Image', value: tempRPC.assets?.large_image, onChange: ((e) => appendRPC({ assets: { large_image: e } })) }),
        components_1.React.createElement(TextInput, { title: 'Large Image Text', value: tempRPC.assets?.large_text, 
            // if listening the large image text is used instead, cringe limitation of cord.
            // iirc.
            disabled: tempRPC.type === UserActivity_1.ActivityType.Listening, onChange: ((e) => appendRPC({ assets: { large_text: e } })) }),
        components_1.React.createElement(TextInput, { title: 'Small Image', value: tempRPC.assets?.small_image, onChange: ((e) => appendRPC({ assets: { small_image: e } })) }),
        components_1.React.createElement(TextInput, { title: 'Small Image Text', value: tempRPC.assets?.small_text, onChange: ((e) => appendRPC({ assets: { small_text: e } })) }),
        components_1.React.createElement(Form_1.FormSwitch, { value: showTime, onChange: ((e) => setShowTime(e)) }, "Show Time"),
        components_1.React.createElement(TextInput, { title: 'Start', value: String(tempRPC.timestamps?.start ?? '0'), onChange: ((e) => appendRPC({ timestamps: { start: Number(e) } })), disabled: !showTime }),
        components_1.React.createElement(TextInput, { title: 'End', value: String(tempRPC.timestamps?.end ?? '0'), onChange: ((e) => appendRPC({ timestamps: { end: Number(e) } })), disabled: !showTime }),
        components_1.React.createElement(Radio_1.RadioItem, { title: 'Activity Type', options: Object.entries(UserActivity_1.ActivityType).map((v) => {
                return {
                    name: v[0],
                    value: v[1]
                };
            }), onChange: ((e) => appendRPC({ type: e.value })), value: tempRPC.type }),
        components_1.React.createElement(TextInput, { title: 'Twitch URL', placeholder: 'https://twitch.tv/...', onChange: ((e) => appendRPC({ url: e })), disabled: tempRPC.type !== UserActivity_1.ActivityType.Streaming }),
        components_1.React.createElement(Flex_1.default, { direction: Flex_1.default.Direction.HORIZONTAL },
            components_1.React.createElement(Button_1.default, { style: { marginRight: '15px' }, onClick: (() => save(tempRPC)) }, "Save"),
            components_1.React.createElement(Button_1.default, { onClick: () => back(), color: Button_1.default.Colors.YELLOW }, "Back"))));
}
exports["default"] = RPCEditor;


/***/ }),

/***/ 364:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RPC_DEFAULT = void 0;
const UserActivity_1 = __nccwpck_require__(335);
const AssetManager_1 = __importDefault(__nccwpck_require__(570));
const Settings_1 = __importDefault(__nccwpck_require__(544));
const config_json_1 = __importDefault(__nccwpck_require__(43));
const Dispatcher_1 = __importDefault(__nccwpck_require__(115));
const logger_1 = __importDefault(__nccwpck_require__(95));
// import styles from './style.css';
// @vercel/ncc limitation, they refuse to expose
// webpack internals (plugins), @vercel/ncc#549
// "There is no plan to expose webpack internals/plugins because that would make it near impossible to migrate from webpack to the successor, turbopack. See https://turbo.build/pack"
// so we have to embed it like this.
// hate it, but i cant be bothered to rewrite the build system.
const styles = `
/** totally not skidded, i love you */
/** https://github.com/E-boi/replugged-plugins/blob/main/plugins/customrpc/style.css */
.bd-rpc-activities {
    background-color: var(--profile-body-background-color);
    border-radius: 8px;
    height: 120px;
    /** width: 400px; */
}

.bd-rpc-activities>div::-webkit-scrollbar {
    display: none;
}

.bd-rpc-activity {
    background-color: var(--profile-body-background-color);
    width: 100%;
    position: relative;
    padding: 16px;
}

.bd-rpc-single-select {
    flex: 1 1 40%
}

`.trim();
exports.RPC_DEFAULT = {
    application_id: '0',
    name: 'RPC!',
    details: 'This is a default',
    state: 'RPC provided!',
    flags: 1,
    type: UserActivity_1.ActivityType.Playing,
};
const discordRegex = /https:\/\/(?:media|cdn)\.discordapp.(?:net|com)\/(.+)/g;
class CustomRPC {
    constructor() {
        this.rpcs = void 0;
        this.logger = new logger_1.default(config_json_1.default);
    }
    static async fetchAsset(id, key) {
        return (await AssetManager_1.default.fetchAssetIds(id, [key, undefined]))[0];
    }
    static async parseRPC(rpc) {
        const newRPC = JSON.parse(JSON.stringify(rpc));
        if (rpc?.assets?.large_image) {
            if (discordRegex.test(rpc.assets.large_image))
                newRPC.assets.large_image = 'mp:'.concat(rpc.assets.large_image.split(discordRegex)[1]);
            else
                newRPC.assets.large_image = await this.fetchAsset(rpc.application_id, rpc.assets.large_image);
        }
        if (rpc?.assets?.small_image) {
            if (discordRegex.test(rpc.assets.small_image))
                newRPC.assets.small_image = 'mp:'.concat(rpc.assets.large_image.split(discordRegex)[1]);
            else
                newRPC.assets.small_image = await this.fetchAsset(rpc.application_id, rpc.assets.small_image);
        }
        return newRPC;
    }
    static async setRPC(rpc) {
        if (rpc) {
            rpc = await this.parseRPC(rpc);
        }
        Dispatcher_1.default.dispatch({
            type: 'LOCAL_ACTIVITY_UPDATE',
            pid: 6969,
            socketId: 'oh-my-god-bd-plugin',
            activity: rpc
        });
    }
    start() {
        this.logger.log('Enabled plugin');
        this.rpcs = BdApi.Data.load(config_json_1.default.name, 'rpcs');
        if (!this.rpcs?.length || this.rpcs?.length < 1) {
            this.rpcs = [exports.RPC_DEFAULT];
        }
        let selectedRPCTemp = BdApi.Data.load(config_json_1.default.name, 'settings')?.selRPC;
        if (!selectedRPCTemp && selectedRPCTemp !== 0) {
            selectedRPCTemp = -1;
        }
        CustomRPC.selRPC = selectedRPCTemp;
        // for cleanup
        selectedRPCTemp = void 0;
        this.logger.log('Loaded configuration');
        this.logger.log('Added styles component');
        BdApi.DOM.addStyle(config_json_1.default.name, styles);
        // const connectionOpen = () => {
        //     if(this.selRPC === -1 || !this.rpcs) {
        //         Dispatcher.unsubscribe('CONNECTION_OPEN', connectionOpen);
        //         return;
        //     }
        //     const rpc = this.rpcs[this.selRPC];
        //     setTimeout(() => rpc && Dispatcher.dispatch({ type: 'LOCAL_ACTIVITY_UPDATE', pid: 6969, socketId: 'oh-my-god-bd-plugin', activity: rpc }), 1000);
        //     Dispatcher.unsubscribe('CONNECTION_OPEN', connectionOpen);
        // };
        // Dispatcher.subscribe('CONNECTION_OPEN', connectionOpen);
    }
    stop() {
        this.logger.log('Saving configuration settings, rpc, settings', this.rpcs, { selRPC: CustomRPC.selRPC });
        BdApi.Data.save(config_json_1.default.name, 'rpcs', this.rpcs);
        BdApi.Data.save(config_json_1.default.name, 'settings', { selRPC: CustomRPC.selRPC });
        this.rpcs = void 0;
        this.logger.log('Resetting RPC');
        void CustomRPC.setRPC(void 0);
        this.logger.log('Disabled.');
    }
    getSettingsPanel() {
        return Settings_1.default.bind(this);
    }
}
CustomRPC.selRPC = -1;
exports["default"] = CustomRPC;


/***/ }),

/***/ 43:
/***/ ((module) => {

module.exports = JSON.parse('{"$schema":"../../config_schema.json","name":"CustomRPC","description":"Pretty decent RPC plugin.","author":"ace.","version":"1.3.0-RC","source":"https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/CustomRPC/CustomRPC.plugin.js","authorLink":"https://github.com/AceLikesGhosts/bd-plugins","authorId":"327639826075484162"}');

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
/******/ 	var __webpack_exports__ = __nccwpck_require__(364);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;