/**
* @name ADiscordBypasses
* @description A simple rewrite of Tharki's DiscordBypasses.
* @author ace.
* @version 0.0.1-RC
* @source https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/ADiscordBypasses/ADiscordBypasses.plugin.js
* @authorLink https://github.com/AceLikesGhosts/bd-plugins
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

/***/ 693:
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

/***/ 171:
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
const CloseButton_1 = __nccwpck_require__(693);
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const Form_1 = __nccwpck_require__(281);
const ImagePicker_1 = __nccwpck_require__(171);
const { React } = BdApi;
class ADiscordBypasses {
    constructor() {
        this.settings = void 0;
        this.defaultSettings = {
            PTT: false,
            CallTimeout: false,
            NSFW: false,
            StreamPreview: false,
            CustomPreviewImage: ''
        };
        this.UserStore = BdApi.Webpack.getStore('UserStore');
    }
    start() {
        this.settings = BdApi.Data.load('ADiscordBypasses', 'settings') || this.defaultSettings;
    }
    stop() {
        BdApi.Data.save('ADiscordBypasses', 'settings', this.settings);
        delete this.settings;
    }
    getSettingsPanel() {
        return DiscordBypassSettings.bind(this);
    }
}
exports["default"] = ADiscordBypasses;
function DiscordBypassSettings() {
    const [nsfw, setNSFW] = React.useState(this.settings.NSFW);
    const [callTimeout, setCallTimeout] = React.useState(this.settings.CallTimeout);
    const [PTT, setPTT] = React.useState(this.settings.PTT);
    const [streamPreview, setStreamPreview] = React.useState(this.settings.StreamPreview);
    const [customPreviewImage, setCustomImagePreview] = React.useState(this.settings.CustomPreviewImage);
    return (React.createElement("div", null,
        React.createElement(Form_1.FormSwitch, { disabled: this.UserStore?.getCurrentUser()?.nsfwAllowed && !this.settings?.NSFW, note: `Bypasses the channel restriction when you're too young to enter channels marked as NSFW.`, value: nsfw, onChange: ((v) => setNSFW(v)) }, "NSFW Bypass"),
        React.createElement(Form_1.FormSwitch, { note: 'Lets you stay alone in a call for longer than 5 minutes.', value: callTimeout, onChange: ((v) => setCallTimeout(v)) }, "Call timeout"),
        React.createElement(Form_1.FormSwitch, { note: 'Lets you use voice activity in channels that enforce the use of push-to-talk.', value: PTT, onChange: ((v) => setPTT(v)) }, "No push-to-talk."),
        React.createElement(Form_1.FormSwitch, { note: 'Stops your stream preview from being rendered. If an image is provided, the image given will be rendered.', value: streamPreview, onChange: ((v) => setStreamPreview(v)) }, "Custom stream preview"),
        React.createElement(ImagePicker_1.ImagePickerItem, { title: 'Custom Preview Iamge', note: 'Image to render as stream preview. (Must be under 200kb. If no image is provided, no stream preview will be shown.)', disabled: !streamPreview, value: customPreviewImage, onChange: ((v) => setCustomImagePreview(v)) })));
}

})();

module.exports = __webpack_exports__;
/******/ })()
;