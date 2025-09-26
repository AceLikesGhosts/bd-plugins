/**
* @name ADiscordBypasses
* @description A simple rewrite of Tharki's DiscordBypasses.
* @author ace.
* @version 2.0.8
* @source https://raw.githubusercontent.com/AceLikesGhosts/a-bd-plugins/master/dist/ADiscordBypasses/ADiscordBypasses.plugin.js
* @authorLink https://github.com/AceLikesGhosts/a-bd-plugins
* @website https://github.com/AceLikesGhosts/a-bd-plugins
* @updateLink https://github.com/AceLikesGhosts/a-bd-plugins
* @authorId 327639826075484162
*/
    
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// plugins/ADiscordBypasses/index.tsx
var index_exports = {};
__export(index_exports, {
  DefaultSettings: () => DefaultSettings,
  default: () => ADiscordBypasses
});
module.exports = __toCommonJS(index_exports);

// lib/logger/index.ts
var DefaultColors = {
  PLUGIN_NAME: "color: purple; font-weight: bold;",
  PLUGIN_VERSION: "color: gray; font-size: 10px;"
};
function isError(err) {
  return err instanceof Error;
}
function getErrorMessage(error) {
  return `${error.name}: ${error.message}
At: ${error.stack}`;
}
var Logger = class {
  constructor(meta, colors = DefaultColors) {
    this._meta = meta;
    this._colors = colors;
  }
  print(type, message, ...data) {
    console[type](
      `%c[${this._meta.name}]%c(v${this._meta.version})`,
      this._colors.PLUGIN_NAME,
      this._colors.PLUGIN_VERSION,
      message,
      ...data
    );
  }
  debug(message, ...data) {
    return this.print("debug", message, ...data);
  }
  log(message, ...data) {
    return this.info(message, ...data);
  }
  info(message, ...data) {
    return this.print("log", isError(message) ? getErrorMessage(message) : message, ...data);
  }
  warn(message, ...data) {
    return this.print("warn", isError(message) ? getErrorMessage(message) : message, ...data);
  }
  error(message, ...data) {
    return this.critical(message, ...data);
  }
  critical(message, ...data) {
    return this.print("error", isError(message) ? getErrorMessage(message) : message, ...data);
  }
};

// lib/modules/AccountSwitcher.ts
var AccountSwitcher_default = BdApi.Webpack.getModule((m) => Object.values(m)?.includes("multiaccount_cta_tooltip_seen"));

// plugins/ADiscordBypasses/patches/AccountSwitcher.ts
var AccountSwitcher_default2 = (main) => {
  main.logger.warn("Patching AccountSwitcher || UNIMPLEMENTED.");
  let maxAccountsKey;
  for (const key in AccountSwitcher_default) {
    const v = AccountSwitcher_default[key];
    if (typeof v === "number") maxAccountsKey = key;
  }
  if (!maxAccountsKey) {
    main.logger.critical(`Failed to locate maxAccountsKey`, maxAccountsKey, AccountSwitcher_default);
    return;
  }
  Object.defineProperty(AccountSwitcher_default, maxAccountsKey, {
    get: () => {
      return ADiscordBypasses.settings?.MaxAccounts ? Infinity : 5;
    },
    configurable: true,
    enumerable: true
  });
};

// plugins/ADiscordBypasses/patches/GuildVerification.ts
var GuildVerification_default = (main) => {
  main.logger.info("Patching DiscordConstants (Verification).");
  const [test, key] = BdApi.Webpack.getWithKey(BdApi.Webpack.Filters.byKeys("ACCOUNT_AGE", "MEMBER_AGE"));
  Object.defineProperty(test, key, {
    get: () => {
      return ADiscordBypasses.settings?.Verification ? { ACCOUNT_AGE: 0, MEMBER_AGE: 0 } : { ACCOUNT_AGE: 5, MEMBER_AGE: 10 };
    },
    configurable: true,
    enumerable: true
  });
};

// plugins/ADiscordBypasses/config.json
var config_default = {
  $schema: "../../config_schema.jsonc",
  name: "ADiscordBypasses",
  description: "A simple rewrite of Tharki's DiscordBypasses.",
  author: "ace.",
  version: "2.0.8",
  source: "https://raw.githubusercontent.com/AceLikesGhosts/a-bd-plugins/master/dist/ADiscordBypasses/ADiscordBypasses.plugin.js",
  authorLink: "https://github.com/AceLikesGhosts/a-bd-plugins",
  website: "https://github.com/AceLikesGhosts/a-bd-plugins",
  updateLink: "https://github.com/AceLikesGhosts/a-bd-plugins",
  authorId: "327639826075484162"
};

// lib/stores/IdleStore.ts
var IdleStore_default = BdApi.Webpack.getStore("IdleStore");

// plugins/ADiscordBypasses/patches/Idle.ts
function Idle() {
  BdApi.Patcher.instead(
    config_default.name,
    IdleStore_default,
    "getIdleSince",
    (_, args, res) => ADiscordBypasses.settings?.Idle ? null : res(...args)
  );
  BdApi.Patcher.instead(
    config_default.name,
    IdleStore_default,
    "isAFK",
    (_, args, res) => ADiscordBypasses.settings?.Idle ? false : res(...args)
  );
  BdApi.Patcher.instead(
    config_default.name,
    IdleStore_default,
    "isIdle",
    (_, args, res) => ADiscordBypasses.settings?.Idle ? false : res(...args)
  );
}

// lib/stores/UserStore.ts
var UserStore_default = /* @__PURE__ */ BdApi.Webpack.getStore("UserStore");

// plugins/ADiscordBypasses/patches/NSFWPatch.ts
var NSFWPatch_default = (main) => {
  main.logger.info("Patching NSFW state.");
  BdApi.Patcher.after("ADiscordBypasses", UserStore_default, "getCurrentUser", (_, __, res) => {
    if (res?.nsfwAllowed === false)
      res.nsfwAllowed = ADiscordBypasses.settings.NSFW ?? res?.nsfwAllowed;
    return res;
  });
};

// lib/stores/PermissionStore.ts
var Permissions = BdApi.Webpack.getByKeys("MUTE_MEMBERS", "VIEW_CHANNEL", { searchExports: true });
var PermissionStore_default = /* @__PURE__ */ BdApi.Webpack.getStore("PermissionStore");

// plugins/ADiscordBypasses/patches/PTT.ts
var PTT_default = (main) => {
  main.logger.info("Patching PerimssionStore (PTT)");
  const [PermissionsModule, PermissionKey] = BdApi.Webpack.getWithKey(BdApi.Webpack.Filters.byKeys("USE_VAD", "ADMINISTRATOR"));
  BdApi.Patcher.after("ADiscordBypasses", PermissionStore_default, "can", (_, args, res) => {
    if (args[0] === PermissionsModule[PermissionKey].USE_VAD && ADiscordBypasses.settings?.PTT)
      return true;
    return res;
  });
};

// lib/modules/ElectronModule.ts
var ElectronModule_default = /* @__PURE__ */ BdApi.Webpack.getByKeys("setBadge");

// plugins/ADiscordBypasses/patches/setBadge.ts
function setBadge() {
  if (!ADiscordBypasses.settings?.electronBadge) return;
  ElectronModule_default.setBadge(0);
  ElectronModule_default.setSystemTrayIcon("DEFAULT");
  BdApi.Patcher.before(config_default.name, ElectronModule_default, "setBadge", (_, args) => {
    if (ADiscordBypasses.settings?.electronBadge) args[0] = 0;
    return args;
  });
  BdApi.Patcher.before(config_default.name, ElectronModule_default, "setSystemTrayIcon", (_, args) => {
    if (ADiscordBypasses.settings?.electronBadge && args[0] === "UNREAD") args[0] = "DEFAULT";
    return args;
  });
}

// lib/stores/SpotifyStore.ts
var SpotifyStore_default = /* @__PURE__ */ BdApi.Webpack.getStore("SpotifyStore");

// plugins/ADiscordBypasses/patches/SpotifyPremium.ts
var SpotifyPremium_default = (main) => {
  main.logger.info("Patching Spotify Premium");
  BdApi.Patcher.after("ADiscordBypasses", SpotifyStore_default, "getActiveSocketAndDevice", (_, __, ret) => {
    if (!ADiscordBypasses.settings?.SpotifyPremium) return ret;
    if (ret && ret?.socket) ret.socket.isPremium = true;
    return ret;
  });
};

// lib/stores/ApplicationStreamPreviewStore.ts
var ApplicationStreamPreviewStore_default = /* @__PURE__ */ BdApi.Webpack.getStore("ApplicationStreamPreviewStore");

// plugins/ADiscordBypasses/patches/StreamPreview.ts
var StreamPreview_default = (main) => {
  main.logger.info("Patching StreamPreview");
  BdApi.Patcher.instead("ADiscordBypasses", ElectronModule_default, "makeChunkedRequest", (_, args, res) => {
    if (!ADiscordBypasses.settings?.StreamPreview) return;
    const replaceWith = ADiscordBypasses.settings.CustomPreviewImage !== "" ? ADiscordBypasses.settings.CustomPreviewImage : null;
    if (args[2].method !== "POST" && !args[0].includes("preview") || !ADiscordBypasses.settings?.StreamPreview) {
      return res(...args);
    }
    if (!replaceWith) return;
    return res(args[0], { thumbnail: replaceWith }, args[2]);
  });
  BdApi.Patcher.after("ADiscordBypasses", ApplicationStreamPreviewStore_default, "getPreviewURL", (_, args, res) => {
    if (!ADiscordBypasses.settings?.StreamPreview) return;
    const replaceWith = ADiscordBypasses.settings.CustomPreviewImage !== "" ? ADiscordBypasses.settings.CustomPreviewImage : null;
    if (args[2] === UserStore_default.getCurrentUser()?.id && ADiscordBypasses.settings?.StreamPreview && !res?.startsWith("https://")) {
      return replaceWith;
    }
    return res;
  });
};

// lib/modules/TimeoutManager.ts
var TimeoutManager_default = /* @__PURE__ */ BdApi.Webpack.getByPrototypeKeys("start", "stop", "isStarted", { searchExports: true });

// plugins/ADiscordBypasses/patches/Timeout.ts
var Timeout_default = (main) => {
  main.logger.info("Patching Timeout (Idle kick/Spotify pause).");
  BdApi.Patcher.instead(
    "ADiscordBypasses",
    TimeoutManager_default.prototype,
    "start",
    (instance, args, res) => {
      const name = args[1]?.toString();
      if (name?.includes("BOT_CALL_IDLE_DISCONNECT") && ADiscordBypasses.settings?.CallTimeout || name?.includes("SPOTIFY_AUTO_PAUSED") && ADiscordBypasses.settings?.SpotifyPause) {
        instance.start = () => null;
        instance.stop();
        return null;
      }
      return res.call(instance, ...args);
    }
  );
};

// lib/components/index.ts
var RawComponents = /* @__PURE__ */ BdApi.Webpack.getByKeys("ConfirmModal", "ToastPosition", "Text");
var React = BdApi.React;
var ReactDom = BdApi.ReactDOM || BdApi.Webpack.getByKeys("createRoot");

// lib/components/Form.tsx
var FormTitle = BdApi.Webpack.getByStrings('["defaultMargin".concat', '="h5"', { searchExports: true });
var Text = BdApi.Webpack.getBySource('case"always-white"', { searchExports: true });
var FormSection = BdApi.Webpack.getBySource(".titleId)&&", { searchExports: true });
var FormSwitch = BdApi.Webpack.getByStrings(".labelRow", "useId", "DESCRIPTION", { searchExports: true });
var FormItem = BdApi.Webpack.getModule((x) => x.render.toString?.().includes(".fieldWrapper"), { searchExports: true });
var FormNotice = BdApi.Webpack.getByStrings(".Types.DANGER", ".formNotice", { searchExports: true });
var FormDivider = BdApi.Webpack.getBySource(".divider", ",style:", '"div"', "dividerDefault", { searchExports: true });

// lib/components/Toasts.ts
var Kind = {
  MESSAGE: 0,
  SUCCESS: 1,
  FAILURE: 2,
  CUSTOM: 3,
  CLIP: 4
};
var Position = {
  TOP: 0,
  BOTTOM: 1
};
var toast = (content, kind = Kind.SUCCESS, opts = void 0) => {
  const props = RawComponents.createToast(content, kind, opts);
  RawComponents.showToast(props);
};
var Toasts_default = {
  toast,
  Kind,
  Position
};

// plugins/ADiscordBypasses/components/CloseButton.tsx
var CloseButton = class extends React.Component {
  constructor(props) {
    super(props);
    props.size = props.size || "16px";
    props.style = props.style || {};
    props.className = props.className || "";
  }
  render() {
    return /* @__PURE__ */ React.createElement(
      "svg",
      {
        ...{
          className: this.props.className,
          fill: "currentColor",
          viewBox: "0 0 24 24",
          style: { width: this.props.size, height: this.props.size, ...this.props.style },
          onClick: this.props.onClick
        }
      },
      /* @__PURE__ */ React.createElement(
        "path",
        {
          ...{
            d: "M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
          }
        }
      )
    );
  }
};

// plugins/ADiscordBypasses/components/ImagePicker.tsx
var ImagePickerItem = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { img: this.props.value, showClearButton: false };
    this.clear = this.clear.bind(this);
    this.fileInputRef = React.createRef();
  }
  clear() {
    this.setState({ img: "" });
    this.props.onChange("");
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
    return /* @__PURE__ */ React.createElement(
      FormItem,
      {
        ...{
          title: this.props.title ?? this.props.children,
          note: this.props.note,
          notePosition: "after",
          divider: true,
          style: { marginBottom: 20 }
        }
      },
      /* @__PURE__ */ React.createElement(
        "div",
        {
          ...{
            style: { position: "relative", color: "#F1F1F1" }
          }
        },
        /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
          "input",
          {
            ...{
              disabled: this.props.disabled,
              ref: this.fileInputRef,
              id: "actual-btn",
              type: "file",
              multiple: false,
              accept: "image/png, image/jpeg, image/webp",
              style: {
                display: "none"
              },
              onChange: async (e) => {
                const file = e.target.files[0];
                if (file?.size / 1024 > 200) {
                  Toasts_default.toast("File Must be under 200kb.", Toasts_default.Kind.SUCCESS);
                  return;
                }
                const url = URL.createObjectURL(file);
                const base64 = await this.getBase64(url);
                this.props.onChange(base64);
                this.setState({ img: base64 });
              }
            }
          }
        ), /* @__PURE__ */ React.createElement(
          "div",
          {
            ...{
              style: {
                display: "flex",
                flexDirection: "row",
                justifyContent: "center"
              }
            }
          },
          /* @__PURE__ */ React.createElement(
            "div",
            {
              ...{
                onMouseEnter: () => this.setState({ showClearButton: true }),
                onMouseLeave: () => this.setState({ showClearButton: false }),
                style: { position: "relative", display: "inline-block" }
              }
            },
            this.state.img && this.state.showClearButton && /* @__PURE__ */ React.createElement(
              CloseButton,
              {
                ...{
                  className: "image-clear",
                  onClick: this.clear,
                  size: "16px",
                  style: {
                    position: "absolute",
                    right: "0px",
                    top: "0px",
                    borderRadius: "50%",
                    backgroundColor: "black",
                    cursor: "pointer"
                  }
                }
              }
            ),
            /* @__PURE__ */ React.createElement(
              "label",
              {
                ...{
                  for: "actual-btn",
                  style: {
                    padding: "0.5rem",
                    cursor: "pointer",
                    margin: "auto"
                  }
                }
              },
              this.state.img ? /* @__PURE__ */ React.createElement(
                "img",
                {
                  ...{
                    src: this.state.img,
                    style: {
                      margin: "auto",
                      maxWidth: "250px",
                      maxHeight: "150px"
                    }
                  }
                }
              ) : /* @__PURE__ */ React.createElement(
                "svg",
                {
                  ...{
                    width: "250px",
                    height: "150px",
                    viewBox: "0 0 24 24",
                    fill: "currentColor",
                    style: {
                      margin: "auto",
                      color: this.props.disabled ? "gray" : "white"
                    }
                  }
                },
                /* @__PURE__ */ React.createElement(
                  "path",
                  {
                    ...{
                      d: "M18.75 4C20.5449 4 22 5.45507 22 7.25V18.75C22 20.5449 20.5449 22 18.75 22H7.25C5.45507 22 4 20.5449 4 18.75V12.5019C4.47425 12.6996 4.97687 12.8428 5.50009 12.9236L5.5 18.75C5.5 18.9584 5.53643 19.1583 5.60326 19.3437L11.4258 13.643C12.2589 12.8273 13.5675 12.7885 14.4458 13.5266L14.5742 13.6431L20.3964 19.3447C20.4634 19.159 20.5 18.9588 20.5 18.75V7.25C20.5 6.2835 19.7165 5.5 18.75 5.5L12.9236 5.50009C12.8428 4.97687 12.6996 4.47425 12.5019 4H18.75ZM12.5588 14.644L12.4752 14.7148L6.66845 20.4011C6.8504 20.4651 7.04613 20.5 7.25 20.5H18.75C18.9535 20.5 19.1489 20.4653 19.3305 20.4014L13.5247 14.7148C13.2596 14.4553 12.8501 14.4316 12.5588 14.644ZM16.2521 7.5C17.4959 7.5 18.5042 8.50831 18.5042 9.75212C18.5042 10.9959 17.4959 12.0042 16.2521 12.0042C15.0083 12.0042 14 10.9959 14 9.75212C14 8.50831 15.0083 7.5 16.2521 7.5ZM6.5 1C9.53757 1 12 3.46243 12 6.5C12 9.53757 9.53757 12 6.5 12C3.46243 12 1 9.53757 1 6.5C1 3.46243 3.46243 1 6.5 1ZM16.2521 9C15.8367 9 15.5 9.33673 15.5 9.75212C15.5 10.1675 15.8367 10.5042 16.2521 10.5042C16.6675 10.5042 17.0042 10.1675 17.0042 9.75212C17.0042 9.33673 16.6675 9 16.2521 9ZM6.5 2.99923L6.41012 3.00729C6.20603 3.04433 6.0451 3.20527 6.00806 3.40936L6 3.49923L5.99965 5.99923L3.49765 6L3.40777 6.00806C3.20368 6.0451 3.04275 6.20603 3.00571 6.41012L2.99765 6.5L3.00571 6.58988C3.04275 6.79397 3.20368 6.9549 3.40777 6.99194L3.49765 7L6.00065 6.99923L6.00111 9.50348L6.00916 9.59336C6.04621 9.79745 6.20714 9.95839 6.41123 9.99543L6.50111 10.0035L6.59098 9.99543C6.79508 9.95839 6.95601 9.79745 6.99305 9.59336L7.00111 9.50348L7.00065 6.99923L9.50457 7L9.59444 6.99194C9.79853 6.9549 9.95947 6.79397 9.99651 6.58988L10.0046 6.5L9.99651 6.41012C9.95947 6.20603 9.79853 6.0451 9.59444 6.00806L9.50457 6L6.99965 5.99923L7 3.49923L6.99194 3.40936C6.9549 3.20527 6.79397 3.04433 6.58988 3.00729L6.5 2.99923Z"
                    }
                  }
                )
              ),
              /* @__PURE__ */ React.createElement(
                "div",
                {
                  ...{
                    for: "actual-btn",
                    style: {
                      color: "white",
                      cursor: "pointer",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: "1rem",
                      textAlign: "center"
                    }
                  }
                },
                this.state.img ? "Change Image" : "Add Image"
              )
            )
          )
        ))
      )
    );
  }
};

// plugins/ADiscordBypasses/components/Settings.tsx
function Settings() {
  const [nsfw, setNSFW] = React.useState(ADiscordBypasses.settings.NSFW);
  const [callTimeout, setCallTimeout] = React.useState(ADiscordBypasses.settings.CallTimeout);
  const [PTT, setPTT] = React.useState(ADiscordBypasses.settings.PTT);
  const [streamPreview, setStreamPreview] = React.useState(ADiscordBypasses.settings.StreamPreview);
  const [customPreviewImage, setCustomImagePreview] = React.useState(ADiscordBypasses.settings.CustomPreviewImage);
  const [isPremium, setSpotifyPremium] = React.useState(ADiscordBypasses.settings.SpotifyPremium);
  const [spotifyPause, setSpotifyPause] = React.useState(ADiscordBypasses.settings.SpotifyPause);
  const [Verification, setVerification] = React.useState(ADiscordBypasses.settings.Verification);
  const [maxAccounts, setMaxAccounts] = React.useState(ADiscordBypasses.settings.MaxAccounts);
  const [Idle2, setIdle] = React.useState(ADiscordBypasses.settings.Idle);
  const [electronBadge, setElectronBadge] = React.useState(ADiscordBypasses.settings.electronBadge);
  React.useEffect(() => {
    ADiscordBypasses.settings = {
      NSFW: nsfw,
      CallTimeout: callTimeout,
      PTT,
      SpotifyPremium: isPremium,
      SpotifyPause: spotifyPause,
      MaxAccounts: maxAccounts,
      StreamPreview: streamPreview,
      CustomPreviewImage: customPreviewImage,
      Verification,
      Idle: Idle2,
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
    Idle2,
    electronBadge
  ]);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
    FormSwitch,
    {
      disabled: UserStore_default?.getCurrentUser()?.nsfwAllowed && !ADiscordBypasses.settings?.NSFW,
      note: `Bypasses the channel restriction when you're too young to enter channels marked as NSFW.`,
      value: nsfw,
      onChange: (v) => setNSFW(v)
    },
    "NSFW Bypass"
  ), /* @__PURE__ */ React.createElement(
    FormSwitch,
    {
      note: "Lets you stay alone in a call for longer than 5 minutes.",
      value: callTimeout,
      onChange: (v) => setCallTimeout(v)
    },
    "Call timeout"
  ), /* @__PURE__ */ React.createElement(
    FormSwitch,
    {
      note: "Lets you use voice activity in channels that enforce the use of push-to-talk.",
      value: PTT,
      onChange: (v) => setPTT(v)
    },
    "No push-to-talk."
  ), /* @__PURE__ */ React.createElement(
    FormSwitch,
    {
      note: "Stops your stream preview from being rendered. If an image is provided, the image given will be rendered.",
      value: streamPreview,
      onChange: (v) => setStreamPreview(v)
    },
    "Custom stream preview"
  ), /* @__PURE__ */ React.createElement(
    ImagePickerItem,
    {
      title: "Custom Preview Image",
      note: "Image to render as stream preview. (Must be under 200kb. If no image is provided, no stream preview will be shown.) Requires reloading the plugin.",
      disabled: !streamPreview,
      value: customPreviewImage,
      onChange: (v) => setCustomImagePreview(v)
    }
  ), /* @__PURE__ */ React.createElement(
    FormSwitch,
    {
      note: "Allows using the Spotify listen along feature on Discord without premium.",
      value: isPremium,
      onChange: (v) => setSpotifyPremium(v)
    },
    "Spotify Listen Along"
  ), /* @__PURE__ */ React.createElement(
    FormSwitch,
    {
      note: "Prevents Discord from pausing your Spotify when streaming or gaming.",
      value: spotifyPause,
      onChange: (v) => setSpotifyPause(v)
    },
    "Spotify Pause"
  ), /* @__PURE__ */ React.createElement(
    FormSwitch,
    {
      note: "Removes the 10 minutes wait before being able to join voice channels in newly joined guilds.",
      value: Verification,
      onChange: (v) => setVerification(v)
    },
    "Guild verification bypass"
  ), /* @__PURE__ */ React.createElement(
    FormSwitch,
    {
      note: `Removes the maximum account limit in Discord's built-in account switcher.`,
      value: maxAccounts,
      onChange: (v) => setMaxAccounts(v)
    },
    "Max account limit bypass"
  ), /* @__PURE__ */ React.createElement(
    FormSwitch,
    {
      note: "Stops Discord from setting your presence to idle when you leave Discord alone.",
      value: Idle2,
      onChange: (v) => setIdle(v)
    },
    "Anti Idle"
  ), /* @__PURE__ */ React.createElement(
    FormSwitch,
    {
      note: "Stops Discord from displaying different badge icons (i.e. missed messages, and friend requests). Requires reloading the plugin.",
      value: electronBadge,
      onChange: (v) => setElectronBadge(v)
    },
    "Missed Messages Badge"
  ));
}

// plugins/ADiscordBypasses/index.tsx
var DefaultSettings = {
  PTT: false,
  CallTimeout: false,
  NSFW: false,
  StreamPreview: false,
  CustomPreviewImage: "",
  SpotifyPremium: false,
  SpotifyPause: false,
  Verification: false,
  MaxAccounts: false,
  Idle: false,
  electronBadge: false
};
var ADiscordBypasses = class _ADiscordBypasses {
  constructor(meta) {
    this.logger = new Logger(meta);
  }
  static {
    this.settings = void 0;
  }
  start() {
    this.logger.log("started");
    _ADiscordBypasses.settings = BdApi.Data.load("ADiscordBypasses", "settings") || DefaultSettings;
    NSFWPatch_default(this);
    SpotifyPremium_default(this);
    Timeout_default(this);
    GuildVerification_default(this);
    StreamPreview_default(this);
    PTT_default(this);
    AccountSwitcher_default2(this);
    Idle();
    setBadge();
  }
  stop() {
    this.logger.log("stopped");
    BdApi.Data.save("ADiscordBypasses", "settings", _ADiscordBypasses.settings);
    BdApi.Patcher.unpatchAll("ADiscordBypasses");
  }
  getSettingsPanel() {
    return Settings;
  }
};
