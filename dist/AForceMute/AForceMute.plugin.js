/**
* @name AForceMute
* @description In God we trust.
* @author ace.
* @version 0.0.4
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
  forceDeafenCache: () => forceDeafenCache,
  forceDisconnectCache: () => forceDisconnectCache,
  forceMuteCache: () => forceMuteCache,
  forceUndeafenCache: () => forceUndeafenCache,
  forceUnmuteCache: () => forceUnmuteCache,
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
  version: "0.0.4"
};

// lib/stores/UserStore.ts
var UserStore_default = /* @__PURE__ */ BdApi.Webpack.getStore("UserStore");

// lib/stores/VoiceStateStore.ts
var VoiceStateStore_default = BdApi.Webpack.getByKeys("getVoiceStateForUser");

// lib/stores/UserUpdates.ts
var UserUpdates_default = BdApi.Webpack.getByKeys("setServerMute");

// lib/components/index.ts
var React = BdApi.React;
var ReactDom = BdApi.ReactDOM || BdApi.Webpack.getByKeys("createRoot");

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
      const isUs = id === us;
      if (props.channel.type !== 2 /* VOICE */) return;
      if (!PermissionStore_default.canWithPartialContext(Permissions.VIEW_CHANNEL, { channelId: props.channel.id }) || !PermissionStore_default.canWithPartialContext(Permissions.MUTE_MEMBERS, { channelId: props.channel.id })) {
        logger.debug("missing VIEW_CHANNEL or MUTE_MEMBERS permissions not displaying");
        return;
      }
      const [forceMuteActive, setForceMuteActive] = React.useState(forceMuteCache[id] || false);
      const forceMuteButton = /* @__PURE__ */ React.createElement(
        CheckboxItem,
        {
          label: "Force Server Mute",
          id: "user-context-force-server-mute",
          key: "user-context-force-server-mute",
          color: "danger",
          checked: forceMuteActive,
          action: () => {
            const newState = !forceMuteActive;
            setForceMuteActive(newState);
            forceMuteCache[id] = newState;
            logger.log(`Force mute ${newState ? "enabled" : "disabled"} for ${id}`);
            if (!VoiceStateStore_default.getVoiceStateForUser(id)?.mute) {
              logger.log(`Force muting ${id} (toggle pressed)`);
              UserUpdates_default.setServerMute(props.channel.guild_id, id, true);
            }
          }
        }
      );
      const [forceUnmuteActive, setForceUnmuteActive] = React.useState(forceUnmuteCache[id] || false);
      const forceUnmuteButton = /* @__PURE__ */ React.createElement(
        CheckboxItem,
        {
          label: "Force Server Unmute",
          id: "user-context-force-server-unmute",
          key: "user-context-force-server-unmute",
          color: "danger",
          checked: forceUnmuteActive,
          action: () => {
            const newState = !forceUnmuteActive;
            setForceUnmuteActive(newState);
            forceUnmuteCache[id] = newState;
            logger.log(`Force unmute ${newState ? "enabled" : "disabled"} for ${id}`);
            if (VoiceStateStore_default.getVoiceStateForUser(id)?.mute) {
              logger.log(`Force unmuting ${id} (toggle pressed)`);
              UserUpdates_default.setServerMute(props.channel.guild_id, id, false);
            }
          }
        }
      );
      const [forceDeafenActive, setForceDeafenActive] = React.useState(forceDeafenCache[id] || false);
      const forceDeafenButton = /* @__PURE__ */ React.createElement(
        CheckboxItem,
        {
          label: "Force Server Deaf",
          id: "user-context-force-server-deaf",
          key: "user-context-force-server-deaf",
          color: "danger",
          checked: forceDeafenActive,
          action: () => {
            const newState = !forceDeafenActive;
            setForceDeafenActive(newState);
            forceDeafenCache[id] = newState;
            logger.log(`Force unmute ${newState ? "enabled" : "disabled"} for ${id}`);
            if (!VoiceStateStore_default.getVoiceStateForUser(id)?.deaf) {
              logger.log(`Force deafening ${id} (toggle pressed)`);
              UserUpdates_default.setServerDeaf(props.channel.guild_id, id, true);
            }
          }
        }
      );
      const [forceUndeafenActive, setForceUndeafenActive] = React.useState(forceUndeafenCache[id] || false);
      const forceUndeafenButton = /* @__PURE__ */ React.createElement(
        CheckboxItem,
        {
          label: "Force Undeafen",
          id: "user-context-force-undeafen",
          key: "user-context-force-undeafen",
          color: "danger",
          checked: forceUndeafenActive,
          action: () => {
            const newState = !forceUndeafenActive;
            setForceUndeafenActive(newState);
            forceUndeafenCache[id] = newState;
            logger.log(`Force undeafen ${newState ? "enabled" : "disabled"} for ${id}`);
            if (VoiceStateStore_default.getVoiceStateForUser(id)?.deaf) {
              logger.log(`Force undeafening ${id} (toggle pressed)`);
              UserUpdates_default.setServerDeaf(props.channel.guild_id, id, false);
            }
          }
        }
      );
      const [forceDisconnectActive, setForceDisconnectActive] = React.useState(forceDisconnectCache[id] || false);
      const forceDisconnect = /* @__PURE__ */ React.createElement(
        CheckboxItem,
        {
          label: "Force Disconnect",
          id: "user-context-force-disconnect",
          key: "user-context-force-disconnect",
          color: "danger",
          checked: forceDisconnectActive,
          action: () => {
            const newState = !forceDisconnectActive;
            setForceDisconnectActive(newState);
            forceDisconnectCache[id] = newState;
            logger.log(`Force disconnect ${newState ? "enabled" : "disabled"} for ${id}`);
            if (VoiceStateStore_default.isInChannel(id)) {
              UserUpdates_default.setChannel(props.channel.guild_id, id, null);
            }
          }
        }
      );
      if (!isUs) {
        const insertWasSuccessful = insertIntoTree(
          res.props.children,
          (node) => node?.key === "voice-mute",
          forceMuteButton
        );
        if (!insertWasSuccessful) {
          logger.error("Failed to insert in tree, inserting at last element");
          res.props.children.push(forceMuteButton);
        }
        const insertForceDefeanWasSuccessful = insertIntoTree(
          res.props.children,
          (node) => node?.key === "voice-deafen",
          forceDeafenButton
        );
        if (!insertForceDefeanWasSuccessful) {
          logger.error("Failed to insert force deafen in tree, inserting at last element");
          res.props.children.push(forceDeafenButton);
        }
        const insertForceDisconnectWasSuccessful = insertIntoTree(
          res.props.children,
          (node) => node?.key === "voice-disconnect",
          forceDisconnect
        );
        if (!insertForceDisconnectWasSuccessful) {
          logger.error("Failed to insert force disconnect in tree, inserting at last element");
          res.props.children.push(forceDisconnect);
        }
      }
      const insertForceUnmuteWasSuccessful = insertIntoTree(
        res.props.children,
        (node) => node?.key === "user-context-force-server-mute",
        forceUnmuteButton
      );
      if (!insertForceUnmuteWasSuccessful) {
        logger.error("Failed to insert force deafen in tree, inserting at last element");
        res.props.children.push(forceUnmuteButton);
      }
      const insertForceUndefeanWasSuccessful = insertIntoTree(
        res.props.children,
        (node) => node?.key === "user-context-force-server-deaf",
        forceUndeafenButton
      );
      if (!insertForceUndefeanWasSuccessful) {
        logger.error("Failed to insert force undeafen in tree, inserting at last element");
        res.props.children.push(forceUndeafenButton);
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
    if (!PermissionStore_default.canWithPartialContext(Permissions.VIEW_CHANNEL, { channelId: voiceState.channelId }) || !PermissionStore_default.canWithPartialContext(Permissions.MUTE_MEMBERS, { channelId: voiceState.channelId })) {
      logger.log("missing permissions, not automatically remuting - missing VIEW_CHANNEL or MUTE_MEMBERS");
      return;
    }
    if (!voiceState.channelId && !voiceState.oldChannelId) {
      logger.log("failed to find channel id in channelId and oldChannelId");
      return;
    }
    const channel = ChannelStore_default.getChannel(voiceState.channelId ?? voiceState.oldChannelId);
    const isForceUnmuted = forceUnmuteCache[voiceState.userId];
    const isForceMuted = forceMuteCache[voiceState.userId];
    if (isForceMuted && isForceUnmuted) {
      logger.log(`${voiceState.userId} is force muted and unmuted`);
      return;
    }
    if (isForceMuted && !voiceState.mute) {
      UserUpdates_default.setServerMute(channel.guild_id, voiceState.userId, true);
    }
    if (isForceUnmuted && voiceState.mute) {
      UserUpdates_default.setServerMute(channel.guild_id, voiceState.userId, false);
    }
    const isForceDeafened = forceDeafenCache[voiceState.userId];
    const isForceUndeafened = forceUndeafenCache[voiceState.userId];
    if (isForceDeafened && isForceUndeafened) {
      logger.log(`${voiceState.userId} is force deafened and undeafened`);
      return;
    }
    if (isForceDeafened && !voiceState.deaf) {
      UserUpdates_default.setServerDeaf(channel.guild_id, voiceState.userId, true);
    }
    if (isForceUndeafened && voiceState.deaf) {
      UserUpdates_default.setServerDeaf(channel.guild_id, voiceState.userId, false);
    }
    if (forceDisconnectCache[voiceState.userId] && voiceState.channelId) {
      logger.log(`disconnecting ${voiceState.userId}`);
      UserUpdates_default.setChannel(channel.guild_id, voiceState.userId, null);
    }
  }
}

// plugins/AForceMute/index.ts
var logger = new Logger(config_default);
var forceMuteCache = {};
var forceUnmuteCache = {};
var forceDeafenCache = {};
var forceUndeafenCache = {};
var forceDisconnectCache = {};
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
