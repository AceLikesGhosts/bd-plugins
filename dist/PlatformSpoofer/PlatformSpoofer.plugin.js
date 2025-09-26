/**
* @name PlatformSpoofer
* @description Allows for spoofing what device you are using to Discord's WebSocket.
* @author ace.
* @version 3.0.6
* @source https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/PlatformSpoofer/PlatformSpoofer.plugin.js
* @authorLink https://github.com/AceLikesGhosts/bd-plugins
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

// plugins/PlatformSpoofer/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => PlatformSpoofer,
  logger: () => logger,
  meta: () => config_default
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

// plugins/PlatformSpoofer/config.json
var config_default = {
  $schema: "../../config_schema.jsonc",
  name: "PlatformSpoofer",
  description: "Allows for spoofing what device you are using to Discord's WebSocket.",
  author: "ace.",
  version: "3.0.6",
  source: "https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/PlatformSpoofer/PlatformSpoofer.plugin.js",
  authorLink: "https://github.com/AceLikesGhosts/bd-plugins",
  authorId: "327639826075484162"
};

// plugins/PlatformSpoofer/utils.ts
var PropertiesToSpoofAs = {
  ios: { browser: "Discord iOS", os: "iOS" },
  android: { browser: "Discord Android", os: "Android" },
  web: { browser: "Discord Web", os: "Other" },
  linux: { browser: "Discord Client", os: "Linux" },
  win32: { browser: "Discord Client", os: "Windows" },
  darwin: { browser: "Discord Client", os: "Mac OS X" },
  xbox: { browser: "Discord Embedded", os: "Xbox" },
  playstation: { browser: "Discord Embedded", os: "Playstation" }
};
var propertyStuff = BdApi.Webpack.getByKeys("getSuperProperties", "getSuperPropertiesBase64", { searchExports: true });
var gameConsoleManager = BdApi.Webpack.getByKeys("actions", "handleAudioStateToggle", "handleSessionsChanged");
var socket = BdApi.Webpack.getByKeys("socket", "state", { searchExports: true }).socket;

// plugins/PlatformSpoofer/patches/PropertyManager.ts
var PropertyManager_default = () => {
  logger.log("Patching PropertyManager (getSuperProperties");
  BdApi.Patcher.instead(config_default.name, propertyStuff, "getSuperProperties", (context, args, orig) => {
    const data = orig.apply(context, args);
    return {
      ...data,
      browser: PropertiesToSpoofAs[PlatformSpoofer.settings?.type]?.browser,
      os: PropertiesToSpoofAs[PlatformSpoofer.settings?.type]?.os
    };
  });
};

// lib/components/index.ts
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

// lib/components/Radio.tsx
var RawRadioGroup = BdApi.Webpack.getByStrings("itemInfoClassName:", "radioItemClassName", "titleId", { searchExports: true });
function RadioItem(props) {
  return /* @__PURE__ */ React.createElement(
    FormItem,
    {
      ...props
    },
    /* @__PURE__ */ React.createElement(RawRadioGroup, { ...props })
  );
}

// lib/components/Flex.tsx
var Flex_default = /* @__PURE__ */ BdApi.Webpack.getByKeys("Child", "Justify");

// lib/components/Button.tsx
var Button_default = BdApi.Webpack.getByStrings(".FILLED", "MEDIUM", "disabledButtonOverlay", { searchExports: true });

// plugins/PlatformSpoofer/components/Settings.tsx
function Settings() {
  const [type, setType] = React.useState(PlatformSpoofer.settings.type);
  const [isSocketOpen, setSocketOpen] = React.useState(socket?.isConnected() ?? false);
  React.useEffect(() => {
    PlatformSpoofer.settings.type = type;
  }, [type]);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
    RadioItem,
    {
      title: "Platform",
      options: Object.keys(PropertiesToSpoofAs).map((v) => ({
        name: v,
        value: v
      })),
      onChange: (e) => setType(e.value),
      value: type
    }
  ), /* @__PURE__ */ React.createElement(Flex_default, { align: Flex_default.Direction.HORIZONTAL }, /* @__PURE__ */ React.createElement(
    Button_default,
    {
      color: isSocketOpen ? Button_default.Colors.RED : Button_default.Colors.PRIMARY,
      onClick: () => {
        if (isSocketOpen) {
          setSocketOpen(false);
          socket?.close();
          BdApi.UI.showToast("Closed WebSocket", { type: "warn" });
          return;
        }
        setSocketOpen(true);
        socket?.connect();
        BdApi.UI.showToast("Opened WebSocket", { type: "success" });
      }
    },
    isSocketOpen ? "Disconnect From WebSocket" : "Connect To WebSocket"
  )));
}

// plugins/PlatformSpoofer/patches/GameManager.ts
var GameManager_default = () => {
  logger.log("patching consoleGameStore so that console types can be used");
  const remove = (key) => BdApi.Patcher.instead(config_default.name, gameConsoleManager, key, () => void 0);
  remove("awaitRemoteTimeout");
  remove("handleAudioStateToggle");
  remove("handleConsoleCommandUpdate");
  remove("handleSessionsChanged");
  remove("handleVoiceStateUpdates");
  remove("handleWaitForRemoteSession");
  remove("maybeConnect");
};

// plugins/PlatformSpoofer/index.ts
var DefaultSettings = {
  type: "win32"
};
var logger = new Logger(config_default);
var PlatformSpoofer = class _PlatformSpoofer {
  start() {
    logger.log("started");
    _PlatformSpoofer.settings = {
      ...DefaultSettings,
      ...BdApi.Data.load(config_default.name, "settings")
    };
    PropertyManager_default();
    GameManager_default();
  }
  stop() {
    BdApi.Patcher.unpatchAll(config_default.name);
    BdApi.Data.save(config_default.name, "settings", _PlatformSpoofer.settings);
    BdApi.UI.showConfirmationModal("Refresh Client", "In order to fully disable PlatformSpoofer you are required to reload your Discord client.", {
      onConfirm() {
        window.location.reload();
      }
    });
  }
  getSettingsPanel() {
    return Settings.bind(this);
  }
};
