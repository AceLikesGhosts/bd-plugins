/**
* @name ADiscordBypasses
* @description A simple rewrite of Tharki's DiscordBypasses.
* @author ace.
* @version 2.0.3
* @source https://raw.githubusercontent.com/AceLikesGhosts/a-bd-plugins/master/dist/ADiscordBypasses/ADiscordBypasses.plugin.js
* @authorLink https://github.com/AceLikesGhosts/a-bd-plugins
* @website https://github.com/AceLikesGhosts/a-bd-plugins
* @updateLink https://github.com/AceLikesGhosts/a-bd-plugins
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

/***/ 210:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const _1 = __nccwpck_require__(799);
/**
 * MIT License
 *
 * Copyright (c) 2022 - Present Replugged
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
 * NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES
 * OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
const Kind = {
    MESSAGE: 0,
    SUCCESS: 1,
    FAILURE: 2,
    CUSTOM: 3,
    CLIP: 4,
};
const Position = {
    TOP: 0,
    BOTTOM: 1,
};
const toast = (content, kind = Kind.SUCCESS, opts = undefined) => {
    const props = _1.RawComponents.createToast(content, kind, opts);
    _1.RawComponents.showToast(props);
};
exports["default"] = {
    toast,
    Kind,
    Position,
};


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

/***/ 895:
/***/ ((__unused_webpack_module, exports) => {


/**
 * TODO: GO BACK AND FIX
 */
// export default /** @__PURE__ */ BdApi.Webpack.getByKeys('MAX_ACCOUNTS') as { MAX_ACCOUNTS: number; };
Object.defineProperty(exports, "__esModule", ({ value: true }));
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
exports["default"] = BdApi.Webpack.getModule(m => Object.values(m)?.includes('multiaccount_cta_tooltip_seen'));


/***/ }),

/***/ 993:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = BdApi.Webpack.getByKeys('setBadge');


/***/ }),

/***/ 643:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = BdApi.Webpack.getByPrototypeKeys('start', 'stop', 'isStarted', { searchExports: true });


/***/ }),

/***/ 833:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = BdApi.Webpack.getStore('ApplicationStreamPreviewStore');


/***/ }),

/***/ 867:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = BdApi.Webpack.getStore('IdleStore');


/***/ }),

/***/ 111:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Permissions = void 0;
exports.Permissions = BdApi.Webpack.getByKeys('MUTE_MEMBERS', 'VIEW_CHANNEL', { searchExports: true });
exports["default"] = BdApi.Webpack.getStore('PermissionStore');


/***/ }),

/***/ 716:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = BdApi.Webpack.getStore('SpotifyStore');


/***/ }),

/***/ 682:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = BdApi.Webpack.getStore('UserStore');


/***/ }),

/***/ 898:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


/**
 * Copyright TharkiGod
 *
 * This is free and unencumbered software released into the public domain.
 *
 * Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.
 *
 * In jurisdictions that recognize copyright laws, the author or authors of this software dedicate any and all copyright interest in the software to the public domain. We make this dedication for the benefit of the public at large and to the detriment of our heirs and successors. We intend this dedication to be an overt act of relinquishment in perpetuity of all present and future rights to this software under copyright law.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * For more information, please refer to https://unlicense.org
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CloseButton = void 0;
const components_1 = __nccwpck_require__(799);
class CloseButton extends components_1.React.Component {
    constructor(props) {
        super(props);
        props.size = props.size || '16px';
        props.style = props.style || {};
        props.className = props.className || '';
    }
    render() {
        return (components_1.React.createElement("svg", { className: this.props.className,
            fill: 'currentColor',
            viewBox: '0 0 24 24',
            style: { width: this.props.size, height: this.props.size, ...this.props.style },
            onClick: this.props.onClick },
            components_1.React.createElement("path", { d: 'M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z' })));
    }
}
exports.CloseButton = CloseButton;


/***/ }),

/***/ 749:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


/**
 * Copyright TharkiGod
 *
 * This is free and unencumbered software released into the public domain.
 *
 * Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.
 *
 * In jurisdictions that recognize copyright laws, the author or authors of this software dedicate any and all copyright interest in the software to the public domain. We make this dedication for the benefit of the public at large and to the detriment of our heirs and successors. We intend this dedication to be an overt act of relinquishment in perpetuity of all present and future rights to this software under copyright law.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * For more information, please refer to https://unlicense.org
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImagePickerItem = void 0;
const components_1 = __nccwpck_require__(799);
const Toasts_1 = __importDefault(__nccwpck_require__(210));
const Form_1 = __nccwpck_require__(281);
const CloseButton_1 = __nccwpck_require__(898);
class ImagePickerItem extends components_1.React.Component {
    constructor(props) {
        super(props);
        this.state = { img: this.props.value, showClearButton: false };
        this.clear = this.clear.bind(this);
    }
    clear() {
        this.setState({ img: '' });
        this.props.onChange('');
    }
    async getBase64(url) {
        const reader = new FileReader();
        const data = await fetch(url);
        const blob = await data.blob();
        return new Promise((resolve) => {
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                resolve(reader.result);
            };
        });
    }
    render() {
        return (components_1.React.createElement(Form_1.FormItem, { title: this.props.title ?? this.props.children,
            note: this.props.note,
            notePosition: 'after',
            divider: true,
            style: { marginBottom: 20 } },
            components_1.React.createElement("div", { style: { position: 'relative', color: '#F1F1F1' } },
                components_1.React.createElement("div", null,
                    components_1.React.createElement("input", { disabled: this.props.disabled,
                        ref: 'file',
                        id: 'actual-btn',
                        type: 'file',
                        multiple: false,
                        accept: 'image/png, image/jpeg, image/webp',
                        style: {
                            display: 'none',
                        },
                        onChange: async (e) => {
                            const file = e.target.files[0];
                            if (file?.size / 1024 > 200) {
                                Toasts_1.default.toast('File Must be under 200kb.', Toasts_1.default.Kind.SUCCESS);
                                return;
                            }
                            const url = URL.createObjectURL(file);
                            const base64 = await this.getBase64(url);
                            this.props.onChange(base64);
                            this.setState({ img: base64 });
                        } }),
                    components_1.React.createElement("div", { style: {
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                        } },
                        components_1.React.createElement("div", { onMouseEnter: () => this.setState({ showClearButton: true }),
                            onMouseLeave: () => this.setState({ showClearButton: false }),
                            style: { position: 'relative', display: 'inline-block' } },
                            this.state.img && this.state.showClearButton && (components_1.React.createElement(CloseButton_1.CloseButton, { className: 'image-clear',
                                onClick: this.clear,
                                size: '16px',
                                style: {
                                    position: 'absolute',
                                    right: '0px',
                                    top: '0px',
                                    borderRadius: '50%',
                                    backgroundColor: 'black',
                                    cursor: 'pointer',
                                } })),
                            components_1.React.createElement("label", { for: 'actual-btn',
                                style: {
                                    padding: '0.5rem',
                                    cursor: 'pointer',
                                    margin: 'auto',
                                } },
                                this.state.img ? (components_1.React.createElement("img", { src: this.state.img,
                                    style: {
                                        margin: 'auto',
                                        maxWidth: '250px',
                                        maxHeight: '150px',
                                    } })) : (components_1.React.createElement("svg", { width: '250px',
                                    height: '150px',
                                    viewBox: '0 0 24 24',
                                    fill: 'currentColor',
                                    style: {
                                        margin: 'auto',
                                        color: this.props.disabled ? 'gray' : 'white'
                                    } },
                                    components_1.React.createElement("path", { d: 'M18.75 4C20.5449 4 22 5.45507 22 7.25V18.75C22 20.5449 20.5449 22 18.75 22H7.25C5.45507 22 4 20.5449 4 18.75V12.5019C4.47425 12.6996 4.97687 12.8428 5.50009 12.9236L5.5 18.75C5.5 18.9584 5.53643 19.1583 5.60326 19.3437L11.4258 13.643C12.2589 12.8273 13.5675 12.7885 14.4458 13.5266L14.5742 13.6431L20.3964 19.3447C20.4634 19.159 20.5 18.9588 20.5 18.75V7.25C20.5 6.2835 19.7165 5.5 18.75 5.5L12.9236 5.50009C12.8428 4.97687 12.6996 4.47425 12.5019 4H18.75ZM12.5588 14.644L12.4752 14.7148L6.66845 20.4011C6.8504 20.4651 7.04613 20.5 7.25 20.5H18.75C18.9535 20.5 19.1489 20.4653 19.3305 20.4014L13.5247 14.7148C13.2596 14.4553 12.8501 14.4316 12.5588 14.644ZM16.2521 7.5C17.4959 7.5 18.5042 8.50831 18.5042 9.75212C18.5042 10.9959 17.4959 12.0042 16.2521 12.0042C15.0083 12.0042 14 10.9959 14 9.75212C14 8.50831 15.0083 7.5 16.2521 7.5ZM6.5 1C9.53757 1 12 3.46243 12 6.5C12 9.53757 9.53757 12 6.5 12C3.46243 12 1 9.53757 1 6.5C1 3.46243 3.46243 1 6.5 1ZM16.2521 9C15.8367 9 15.5 9.33673 15.5 9.75212C15.5 10.1675 15.8367 10.5042 16.2521 10.5042C16.6675 10.5042 17.0042 10.1675 17.0042 9.75212C17.0042 9.33673 16.6675 9 16.2521 9ZM6.5 2.99923L6.41012 3.00729C6.20603 3.04433 6.0451 3.20527 6.00806 3.40936L6 3.49923L5.99965 5.99923L3.49765 6L3.40777 6.00806C3.20368 6.0451 3.04275 6.20603 3.00571 6.41012L2.99765 6.5L3.00571 6.58988C3.04275 6.79397 3.20368 6.9549 3.40777 6.99194L3.49765 7L6.00065 6.99923L6.00111 9.50348L6.00916 9.59336C6.04621 9.79745 6.20714 9.95839 6.41123 9.99543L6.50111 10.0035L6.59098 9.99543C6.79508 9.95839 6.95601 9.79745 6.99305 9.59336L7.00111 9.50348L7.00065 6.99923L9.50457 7L9.59444 6.99194C9.79853 6.9549 9.95947 6.79397 9.99651 6.58988L10.0046 6.5L9.99651 6.41012C9.95947 6.20603 9.79853 6.0451 9.59444 6.00806L9.50457 6L6.99965 5.99923L7 3.49923L6.99194 3.40936C6.9549 3.20527 6.79397 3.04433 6.58988 3.00729L6.5 2.99923Z' }))),
                                components_1.React.createElement("div", { for: 'actual-btn',
                                    style: {
                                        color: 'white',
                                        cursor: 'pointer',
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        marginTop: '1rem',
                                        textAlign: 'center',
                                    } }, this.state.img ? 'Change Image' : 'Add Image'))))))));
    }
}
exports.ImagePickerItem = ImagePickerItem;


/***/ }),

/***/ 169:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const components_1 = __nccwpck_require__(799);
const logger_1 = __importDefault(__nccwpck_require__(95));
const ImagePicker_1 = __nccwpck_require__(749);
const Form_1 = __nccwpck_require__(281);
const UserStore_1 = __importDefault(__nccwpck_require__(682));
const NSFWPatch_1 = __importDefault(__nccwpck_require__(192));
const SpotifyPremium_1 = __importDefault(__nccwpck_require__(931));
const Timeout_1 = __importDefault(__nccwpck_require__(790));
const GuildVerification_1 = __importDefault(__nccwpck_require__(757));
const StreamPreview_1 = __importDefault(__nccwpck_require__(955));
const PTT_1 = __importDefault(__nccwpck_require__(989));
const AccountSwitcher_1 = __importDefault(__nccwpck_require__(844));
const Idle_1 = __importDefault(__nccwpck_require__(940));
const setBadge_1 = __importDefault(__nccwpck_require__(644));
class ADiscordBypasses {
    constructor(meta) {
        this.settings = void 0;
        this.defaultSettings = {
            PTT: false,
            CallTimeout: false,
            NSFW: false,
            StreamPreview: false,
            CustomPreviewImage: '',
            SpotifyPremium: false,
            SpotifyPause: false,
            Verification: false,
            MaxAccounts: false,
            Idle: false,
            electronBadge: false
        };
        this.logger = new logger_1.default(meta);
    }
    start() {
        this.logger.log('started');
        this.settings = BdApi.Data.load('ADiscordBypasses', 'settings') || this.defaultSettings;
        (0, NSFWPatch_1.default)(this);
        (0, SpotifyPremium_1.default)(this);
        (0, Timeout_1.default)(this);
        (0, GuildVerification_1.default)(this);
        (0, StreamPreview_1.default)(this);
        (0, PTT_1.default)(this);
        (0, AccountSwitcher_1.default)(this);
        (0, Idle_1.default)(this);
        (0, setBadge_1.default)(this);
    }
    stop() {
        this.logger.log('stopped');
        BdApi.Data.save('ADiscordBypasses', 'settings', this.settings);
        BdApi.Patcher.unpatchAll('ADiscordBypasses');
        delete this.settings;
    }
    getSettingsPanel() {
        return DiscordBypassSettings.bind(this);
    }
}
exports["default"] = ADiscordBypasses;
function DiscordBypassSettings() {
    const [nsfw, setNSFW] = components_1.React.useState(this.settings.NSFW);
    const [callTimeout, setCallTimeout] = components_1.React.useState(this.settings.CallTimeout);
    const [PTT, setPTT] = components_1.React.useState(this.settings.PTT);
    const [streamPreview, setStreamPreview] = components_1.React.useState(this.settings.StreamPreview);
    const [customPreviewImage, setCustomImagePreview] = components_1.React.useState(this.settings.CustomPreviewImage);
    const [isPremium, setSpotifyPremium] = components_1.React.useState(this.settings.SpotifyPremium);
    const [spotifyPause, setSpotifyPause] = components_1.React.useState(this.settings.SpotifyPause);
    const [Verification, setVerification] = components_1.React.useState(this.settings.Verification);
    const [maxAccounts, setMaxAccounts] = components_1.React.useState(this.settings.MaxAccounts);
    const [Idle, setIdle] = components_1.React.useState(this.settings.Idle);
    const [electronBadge, setElectronBadge] = components_1.React.useState(this.settings.electronBadge);
    components_1.React.useEffect(() => {
        this.settings = {
            NSFW: nsfw,
            CallTimeout: callTimeout,
            PTT,
            SpotifyPremium: isPremium,
            SpotifyPause: spotifyPause,
            MaxAccounts: maxAccounts,
            StreamPreview: streamPreview,
            CustomPreviewImage: customPreviewImage,
            Verification,
            Idle,
            electronBadge
        };
    }, [
        nsfw,
        callTimeout,
        PTT,
        streamPreview,
        customPreviewImage,
        isPremium,
        spotifyPause,
        Verification,
        maxAccounts,
        Idle,
        electronBadge
    ]);
    return (components_1.React.createElement("div", null,
        components_1.React.createElement(Form_1.FormSwitch, { disabled: UserStore_1.default?.getCurrentUser()?.nsfwAllowed && !this.settings?.NSFW, note: `Bypasses the channel restriction when you're too young to enter channels marked as NSFW.`, value: nsfw, onChange: ((v) => setNSFW(v)) }, "NSFW Bypass"),
        components_1.React.createElement(Form_1.FormSwitch, { note: 'Lets you stay alone in a call for longer than 5 minutes.', value: callTimeout, onChange: ((v) => setCallTimeout(v)) }, "Call timeout"),
        components_1.React.createElement(Form_1.FormSwitch, { note: 'Lets you use voice activity in channels that enforce the use of push-to-talk.', value: PTT, onChange: ((v) => setPTT(v)) }, "No push-to-talk."),
        components_1.React.createElement(Form_1.FormSwitch, { note: 'Stops your stream preview from being rendered. If an image is provided, the image given will be rendered.', value: streamPreview, onChange: ((v) => setStreamPreview(v)) }, "Custom stream preview"),
        components_1.React.createElement(ImagePicker_1.ImagePickerItem, { title: 'Custom Preview Image', note: 'Image to render as stream preview. (Must be under 200kb. If no image is provided, no stream preview will be shown.) Requires reloading the plugin.', disabled: !streamPreview, value: customPreviewImage, onChange: ((v) => setCustomImagePreview(v)) }),
        components_1.React.createElement(Form_1.FormSwitch, { note: 'Allows using the Spotify listen along feature on Discord without premium.', value: isPremium, onChange: ((v) => setSpotifyPremium(v)) }, "Spotify Listen Along"),
        components_1.React.createElement(Form_1.FormSwitch, { note: 'Prevents Discord from pausing your Spotify when streaming or gaming.', value: spotifyPause, onChange: ((v) => setSpotifyPause(v)) }, "Spotify Pause"),
        components_1.React.createElement(Form_1.FormSwitch, { note: 'Removes the 10 minutes wait before being able to join voice channels in newly joined guilds.', value: Verification, onChange: ((v) => setVerification(v)) }, "Guild verification bypass"),
        components_1.React.createElement(Form_1.FormSwitch, { note: `Removes the maximum account limit in Discord's built-in account switcher.`, value: maxAccounts, onChange: ((v) => setMaxAccounts(v)) }, "Max account limit bypass"),
        components_1.React.createElement(Form_1.FormSwitch, { note: 'Stops Discord from setting your presence to idle when you leave Discord alone.', value: Idle, onChange: (v) => setIdle(v) }, "Anti Idle"),
        components_1.React.createElement(Form_1.FormSwitch, { note: 'Stops Discord from displaying different badge icons (i.e. missed messages, and friend requests). Requires reloading the plugin.', value: electronBadge, onChange: (v) => setElectronBadge(v) }, "Missed Messages Badge")));
}


/***/ }),

/***/ 844:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const AccountSwitcher_1 = __importDefault(__nccwpck_require__(895));
exports["default"] = (main) => {
    main.logger.warn('Patching AccountSwitcher || UNIMPLEMENTED.');
    let maxAccountsKey;
    for (const key in AccountSwitcher_1.default) {
        const v = AccountSwitcher_1.default[key];
        if (typeof v === 'number')
            maxAccountsKey = key;
    }
    if (!maxAccountsKey) {
        main.logger.critical(`Failed to locate maxAccountsKey`, maxAccountsKey, AccountSwitcher_1.default);
        return;
    }
    Object.defineProperty(AccountSwitcher_1.default, maxAccountsKey, {
        get: () => {
            return main.settings?.MaxAccounts ? Infinity : 5;
        },
        configurable: true,
        enumerable: true,
    });
};


/***/ }),

/***/ 757:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
// import { VerificationModule,VerificationCriteriaKey } from '@lib/modules/VerificationCritera';
// import Verification from '@lib/modules/VerificationCritera';
exports["default"] = (main) => {
    main.logger.info('Patching DiscordConstants (Verification).');
    // main.logger.info(Verification[0], Verification[1]);
    // main.logger.info([...]);
    const [test, key] = BdApi.Webpack.getWithKey(BdApi.Webpack.Filters.byKeys('ACCOUNT_AGE', 'MEMBER_AGE'));
    Object.defineProperty(test, key, {
        get: () => {
            return main.settings?.Verification
                ? { ACCOUNT_AGE: 0, MEMBER_AGE: 0 }
                : { ACCOUNT_AGE: 5, MEMBER_AGE: 10 };
        },
        configurable: true,
        enumerable: true,
    });
};


/***/ }),

/***/ 940:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_json_1 = __importDefault(__nccwpck_require__(457));
const IdleStore_1 = __importDefault(__nccwpck_require__(867));
function Idle(main) {
    BdApi.Patcher.instead(config_json_1.default.name, IdleStore_1.default, 'getIdleSince', (_, args, res) => main.settings?.Idle ? null : res(...args));
    BdApi.Patcher.instead(config_json_1.default.name, IdleStore_1.default, 'isAFK', (_, args, res) => main.settings?.Idle ? false : res(...args));
    BdApi.Patcher.instead(config_json_1.default.name, IdleStore_1.default, 'isIdle', (_, args, res) => main.settings?.Idle ? false : res(...args));
}
exports["default"] = Idle;


/***/ }),

/***/ 192:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const UserStore_1 = __importDefault(__nccwpck_require__(682));
exports["default"] = (main) => {
    main.logger.info('Patching NSFW state.');
    BdApi.Patcher.after('ADiscordBypasses', UserStore_1.default, 'getCurrentUser', (_, __, res) => {
        if (res?.nsfwAllowed === false)
            res.nsfwAllowed = main.settings.NSFW ?? res?.nsfwAllowed;
        return res;
    });
};


/***/ }),

/***/ 989:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const PermissionStore_1 = __importDefault(__nccwpck_require__(111));
exports["default"] = (main) => {
    main.logger.info('Patching PerimssionStore (PTT)');
    const [PermissionsModule, PermissionKey] = BdApi.Webpack.getWithKey(BdApi.Webpack.Filters.byKeys('USE_VAD', 'ADMINISTRATOR'));
    BdApi.Patcher.after('ADiscordBypasses', PermissionStore_1.default, 'can', (_, args, res) => {
        if (args[0] === PermissionsModule[PermissionKey].USE_VAD && main.settings?.PTT)
            return true;
        return res;
    });
};


/***/ }),

/***/ 931:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


// import type ADiscordBypasses from '..';
// import SpotifyProtocolStore from '@lib/stores/SpotifyProtocolStore';
// import SpotifyChecks from '@lib/modules/SpotifyChecks';
// import Dispatcher from '@lib/modules/Dispatcher';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const SpotifyStore_1 = __importDefault(__nccwpck_require__(716));
// export default (main: ADiscordBypasses): void => {
//     main.logger.info('Patching Spotify Premium');
//     BdApi.Patcher.instead('ADiscordBypasses', SpotifyProtocolStore, 'getProfile', (_, args, res) => {
//         main.settings?.SpotifyPremium ?
//             Dispatcher.dispatch({
//                 type: 'SPOTIY_PROFILE_UPDATE',
//                 accountId: args[0],
//                 isPremium: true
//             })
//             : res(...args);
//     });
//     BdApi.Patcher.instead(
//         'ADiscordBypasses',
//         SpotifyChecks,
//         'isSpotifyPremium',
//         (_, __, res) => main.settings?.SpotifyPremium || res
//     );
//     BdApi.Patcher.instead(
//         'ADiscordBypasses',
//         SpotifyChecks,
//         'ensureSpotifyPremium',
//         // eslint-disable-next-line @typescript-eslint/promise-function-async
//         (_, args, res) => main.settings?.SpotifyPremium
//             ? new Promise((res) => res(true))
//             : res(...args as unknown[])
//     );
// };
exports["default"] = (main) => {
    main.logger.info('Patching Spotify Premium');
    BdApi.Patcher.after('ADiscordBypasses', SpotifyStore_1.default, 'getActiveSocketAndDevice', (_, __, ret) => {
        if (!main.settings?.SpotifyPremium)
            return ret;
        if (ret === null)
            return ret;
        if (!ret.socket)
            return ret;
        ret.socket.isPremium = true;
        return ret;
    });
};


/***/ }),

/***/ 955:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const ElectronModule_1 = __importDefault(__nccwpck_require__(993));
const ApplicationStreamPreviewStore_1 = __importDefault(__nccwpck_require__(833));
const UserStore_1 = __importDefault(__nccwpck_require__(682));
exports["default"] = (main) => {
    main.logger.info('Patching StreamPreview');
    BdApi.Patcher.instead('ADiscordBypasses', ElectronModule_1.default, 'makeChunkedRequest', (_, args, res) => {
        if (!main.settings?.StreamPreview)
            return;
        const replaceWith = main.settings.CustomPreviewImage !== '' ?
            main.settings.CustomPreviewImage
            : null;
        if ((args[2].method !== 'POST' && !args[0].includes('preview')) || !main.settings?.StreamPreview) {
            return res(...args);
        }
        if (!replaceWith)
            return;
        return res(args[0], { thumbnail: replaceWith }, args[2]);
    });
    BdApi.Patcher.after('ADiscordBypasses', ApplicationStreamPreviewStore_1.default, 'getPreviewURL', (_, args, res) => {
        if (!main.settings?.StreamPreview)
            return;
        const replaceWith = main.settings.CustomPreviewImage !== '' ?
            main.settings.CustomPreviewImage
            : null;
        if (args[2] === UserStore_1.default.getCurrentUser()?.id &&
            main.settings?.StreamPreview &&
            !res?.startsWith('https://')) {
            return replaceWith;
        }
        return res;
    });
};


/***/ }),

/***/ 790:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const TimeoutManager_1 = __importDefault(__nccwpck_require__(643));
exports["default"] = (main) => {
    main.logger.info('Patching Timeout (Idle kick/Spotify pause).');
    BdApi.Patcher.instead('ADiscordBypasses', TimeoutManager_1.default.prototype, 'start', (instance, args, res) => {
        // @ts-expect-error idc
        const name = args[1]?.toString();
        if ((name?.includes('BOT_CALL_IDLE_DISCONNECT') && main.settings?.CallTimeout) ||
            (name?.includes('SPOTIFY_AUTO_PAUSED') && main.settings?.SpotifyPause)) {
            // @ts-expect-error idc
            instance.start = () => null;
            // @ts-expect-error idc
            instance.stop();
            return null;
        }
        return res.call(instance, ...args);
    });
};


/***/ }),

/***/ 644:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const ElectronModule_1 = __importDefault(__nccwpck_require__(993));
const config_json_1 = __importDefault(__nccwpck_require__(457));
function setBadge(main) {
    if (!main.settings?.electronBadge)
        return;
    ElectronModule_1.default.setBadge(0);
    ElectronModule_1.default.setSystemTrayIcon('DEFAULT');
    BdApi.Patcher.before(config_json_1.default.name, ElectronModule_1.default, 'setBadge', (_, args) => {
        if (main.settings?.electronBadge)
            args[0] = 0;
        return args;
    });
    BdApi.Patcher.before(config_json_1.default.name, ElectronModule_1.default, 'setSystemTrayIcon', (_, args) => {
        if (main.settings?.electronBadge && args[0] === 'UNREAD')
            args[0] = 'DEFAULT';
        return args;
    });
}
exports["default"] = setBadge;


/***/ }),

/***/ 457:
/***/ ((module) => {

module.exports = JSON.parse('{"$schema":"../../config_schema.jsonc","name":"ADiscordBypasses","description":"A simple rewrite of Tharki\'s DiscordBypasses.","author":"ace.","version":"2.0.3","source":"https://raw.githubusercontent.com/AceLikesGhosts/a-bd-plugins/master/dist/ADiscordBypasses/ADiscordBypasses.plugin.js","authorLink":"https://github.com/AceLikesGhosts/a-bd-plugins","website":"https://github.com/AceLikesGhosts/a-bd-plugins","updateLink":"https://github.com/AceLikesGhosts/a-bd-plugins","authorId":"327639826075484162"}');

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
/******/ 	var __webpack_exports__ = __nccwpck_require__(169);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;