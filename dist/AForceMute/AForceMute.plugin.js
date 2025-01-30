/**
* @name AForceMute
* @description In God we trust.
* @author ace.
* @version 0.0.2
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

// plugins/AForceMute/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => AForceMute,
  forceMuteCache: () => forceMuteCache,
  logger: () => logger
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

// plugins/AForceMute/config.json
var config_default = {
  $schema: "../../config_schema.jsonc",
  name: "AForceMute",
  description: "In God we trust.",
  author: "ace.",
  version: "0.0.2"
};

// lib/stores/UserStore.ts
var UserStore_default = /* @__PURE__ */ BdApi.Webpack.getStore("UserStore");

// lib/stores/VoiceStateStore.ts
var VoiceStateStore_default = BdApi.Webpack.getByKeys("getVoiceStateForUser");

// lib/stores/UserUpdates.ts
var UserUpdates_default = BdApi.Webpack.getByKeys("setServerMute");

// lib/components/index.ts
var React = BdApi.React;

// lib/stores/ChannelStore.ts
var ChannelStore_default = BdApi.Webpack.getStore("ChannelStore");

// lib/stores/PermissionStore.ts
var Permissions = BdApi.Webpack.getByKeys("MUTE_MEMBERS", "VIEW_CHANNEL", { searchExports: true });
var PermissionStore_default = /* @__PURE__ */ BdApi.Webpack.getStore("PermissionStore");

// plugins/AForceMute/patches/userContext.tsx
var { CheckboxItem } = BdApi.ContextMenu;
function insertIntoTree(children, search, insert) {
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (search(child)) {
      children.splice(i + 1, 0, insert);
      return true;
    }
    if (child === null || typeof child !== "object") {
      continue;
    }
    if ("props" in child) {
      if (insertIntoTree([child.props], search, insert)) {
        return true;
      }
    }
    if ("children" in child && child.children) {
      if (insertIntoTree(child.children, search, insert)) {
        return true;
      }
    }
  }
  return false;
}
function PatchUserContext() {
  return BdApi.ContextMenu.patch(
    "user-context",
    (res, props) => {
      const us = UserStore_default.getCurrentUser().id;
      const id = props.user.id;
      if (us === id) return;
      if (props.channel.type !== 2 /* VOICE */) return;
      if (!PermissionStore_default.canWithPartialContext(Permissions.VIEW_CHANNEL, { channelId: props.channel.id }) || !PermissionStore_default.canWithPartialContext(Permissions.MUTE_MEMBERS, { channelId: props.channel.id })) {
        logger.debug("missing VIEW_CHANNEL or MUTE_MEMBERS permissions not displaying");
        return;
      }
      const [active, setActive] = React.useState(forceMuteCache[id] || false);
      const forceMuteButton = /* @__PURE__ */ React.createElement(
        CheckboxItem,
        {
          label: "Force Server Mute",
          id: "user-context-force-server-mute",
          color: "danger",
          checked: active,
          action: () => {
            const newState = !active;
            setActive(newState);
            forceMuteCache[id] = newState;
            logger.log(`Force mute ${newState ? "enabled" : "disabled"} for ${id}`);
            if (!VoiceStateStore_default.getVoiceStateForUser(id)?.mute) {
              logger.log(`Force muting ${id} (toggle pressed)`);
              UserUpdates_default.setServerMute(props.channel.guild_id, id, true);
            }
          }
        }
      );
      const insertWasSuccessful = insertIntoTree(
        res.props.children,
        (node) => node?.key === "voice-mute",
        forceMuteButton
      );
      if (!insertWasSuccessful) {
        logger.error("Failed to insert in tree, inserting at last element");
        res.props.children.push(forceMuteButton);
        return;
      }
    }
  );
}

// lib/modules/Dispatcher.ts
var Dispatcher_default = /* @__PURE__ */ BdApi.Webpack.getByKeys("dispatch", "subscribe", "register");

// plugins/AForceMute/listeners/onVoiceUpdate.ts
function onVoiceStateUpdate(event) {
  if (event.type !== "VOICE_STATE_UPDATES") return;
  for (const voiceState of event.voiceStates) {
    if (!forceMuteCache[voiceState.userId]) return;
    if (voiceState.mute) {
      logger.log(`${voiceState.userId} was already muted`);
      return;
    }
    if (!PermissionStore_default.canWithPartialContext(Permissions.VIEW_CHANNEL, { channelId: voiceState.channelId }) || !PermissionStore_default.canWithPartialContext(Permissions.MUTE_MEMBERS, { channelId: voiceState.channelId })) {
      logger.log("missing permissions, not automatically remuting - missing VIEW_CHANNEL or MUTE_MEMBERS");
      return;
    }
    if (!voiceState.channelId && !voiceState.oldChannelId) {
      logger.log("failed to find channel id in channelId and oldChannelId");
      return;
    }
    logger.log(`remuting ${voiceState.userId}`);
    const channel = ChannelStore_default.getChannel(voiceState.channelId ?? voiceState.oldChannelId);
    UserUpdates_default.setServerMute(channel.guild_id, voiceState.userId, true);
  }
}

// plugins/AForceMute/index.ts
var logger = new Logger(config_default);
var forceMuteCache = {};
var AForceMute = class {
  constructor() {
    this.userContextCancel = null;
  }
  start() {
    logger.info("Patching User-Context");
    this.userContextCancel = PatchUserContext();
    logger.info("Subscribing to VOICE_STATE_UPDATES");
    Dispatcher_default.subscribe("VOICE_STATE_UPDATES", onVoiceStateUpdate);
  }
  stop() {
    logger.info("Cancelling User-Context patch");
    this.userContextCancel?.();
    logger.info("Unsubscribing to VOICE_STATE_UPDATES");
    Dispatcher_default.unsubscribe("VOICE_STATE_UPDATES", onVoiceStateUpdate);
  }
};
