/**
* @name AVCStalker
* @description In God we trust.
* @author ace.
* @version 4.2.6
* @source https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/AVCStalker/AVCStalker.plugin.js
* @authorLink https://github.com/AceLikesGhosts/bd-plugins
* @website https://github.com/AceLikesGhosts/bd-plugins
* @updateLink https://github.com/AceLikesGhosts/bd-plugins
* @authorId 327639826075484162
*/
    
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// plugins/AVCStalker/index.tsx
var index_exports = {};
__export(index_exports, {
  DefaultSettings: () => DefaultSettings,
  Icons: () => Icons,
  config: () => config_default,
  default: () => AVCStalker,
  logger: () => logger
});
module.exports = __toCommonJS(index_exports);

// plugins/AVCStalker/config.json
var config_default = {
  $schema: "../../config_schema.jsonc",
  name: "AVCStalker",
  description: "In God we trust.",
  author: "ace.",
  version: "4.2.6",
  source: "https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/AVCStalker/AVCStalker.plugin.js",
  authorLink: "https://github.com/AceLikesGhosts/bd-plugins",
  website: "https://github.com/AceLikesGhosts/bd-plugins",
  updateLink: "https://github.com/AceLikesGhosts/bd-plugins",
  authorId: "327639826075484162"
};

// lib/components/index.ts
var Margins = /* @__PURE__ */ BdApi.Webpack.getByKeys("marginBottom40", "marginTop4");
var React = BdApi.React;
var ReactDom = BdApi.ReactDOM || /* @__PURE__ */ BdApi.Webpack.getByKeys("createRoot");

// lib/stores/VoiceStateStore.ts
var VoiceStateStore_default = BdApi.Webpack.getByKeys("getVoiceStateForUser");

// lib/stores/ChannelStore.ts
var ChannelStore_default = BdApi.Webpack.getStore("ChannelStore");

// lib/modules/Transitions.ts
var Transitions_default = BdApi.Webpack.getByStrings("transitionToGuild - Transitioning to", { searchExports: true });

// lib/stores/StoreUtils.ts
var StoreUtils_default = /* @__PURE__ */ BdApi.Webpack.getByStrings("useStateFromStores", { searchExports: true });

// plugins/AVCStalker/components/JoinVcIcon.tsx
var DiscordTooltip = BdApi.Components.Tooltip;
function JoinVcIcon({ userId }) {
  const voiceData = StoreUtils_default([VoiceStateStore_default], () => [VoiceStateStore_default.getVoiceStateForUser(userId)]);
  const [channel, setChannel] = React.useState(ChannelStore_default.getChannel(voiceData[0]?.channelId ?? "0"));
  const [peopleInVC, setGuildChannelLength] = React.useState(1);
  React.useEffect(() => {
    setGuildChannelLength(Object.keys(VoiceStateStore_default.getVoiceStatesForChannel(voiceData[0]?.channelId) ?? { hi: "u-shouldnt-see-this" }).length);
    setChannel(ChannelStore_default.getChannel(voiceData[0]?.channelId ?? "0"));
  }, [voiceData]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, voiceData[0]?.channelId ? /* @__PURE__ */ React.createElement(DiscordTooltip, { text: "Voice Channel" }, (props) => /* @__PURE__ */ React.createElement("div", { ...props }, /* @__PURE__ */ React.createElement(
    "svg",
    {
      width: 24,
      height: 24,
      role: "img",
      dangerouslySetInnerHTML: {
        __html: peopleInVC === 1 ? Icons.GaUser : Icons.GaUserAdd
      },
      onClick: () => {
        if (voiceData[0]?.channelId) {
          Transitions_default(channel.guild_id, voiceData[0].channelId);
        } else BdApi.UI.showToast("Failed to locate the voice channel they are in", { type: "error" });
      }
    }
  ))) : /* @__PURE__ */ React.createElement("div", { id: "hi-you-shouldnt-ever-see-this-div-lol" }));
}

// plugins/AVCStalker/patches/UserCallHeader.tsx
function PatchUserCallHeader() {
  const stringFilter = BdApi.Webpack.Filters.byStrings(".GUILD_HOME");
  const keyFilter = BdApi.Webpack.Filters.byKeys("Icon", "Title");
  const [titlebarModule, titlebarKey] = BdApi.Webpack.getWithKey((m) => keyFilter(m) && !stringFilter(m));
  BdApi.Patcher.before(config_default.name, titlebarModule, titlebarKey, (_, [props]) => {
    let foundId = void 0;
    for (let i = 0; i < props.children?.length; i++) {
      const child = props.children[i];
      if (child?.props?.channel?.recipients) {
        foundId = child?.props?.channel?.recipients[0];
        break;
      }
    }
    if (!foundId) {
      logger.critical(
        "Failed to find the channel id, indicating it's either a server channel or discord completly fucked my code",
        foundId
      );
      return;
    }
    const toolbar = props?.toolbar;
    if (!toolbar) {
      logger.warn("Failed to find `toolbar` in `props` of `titlebarModule` mod");
      return;
    }
    const icon = /* @__PURE__ */ React.createElement(JoinVcIcon, { userId: foundId });
    try {
      toolbar.props?.children[0]?.splice(4, 0, icon);
      logger.info("Patched titlebar to add icon for current call");
    } catch (err) {
      logger.error("Failed to patch titlebar, weird?", err);
    }
  });
}

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

// lib/components/Form.tsx
var Text = BdApi.Webpack.getBySource("data-text-variant", "fontScaling").E;
var FormTitle = (...props) => {
  const variant = props[0].variant || "text-lg/normal";
  return /* @__PURE__ */ React.createElement(
    Text,
    {
      variant,
      ...props[0]
    },
    props[0].children
  );
};
function FormItem({ children }) {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { paddingTop: "4px", position: "relative" } }, children));
}
var FormSwitch = (e) => (
  // @ts-expect-error
  /* @__PURE__ */ React.createElement(BdApi.Components.SettingItem, { note: e.note }, /* @__PURE__ */ React.createElement(BdApi.Components.SwitchInput, { ...e, id: "zere-i-hate-you" }))
);
var FormDivider = /* @__PURE__ */ React.createElement(
  "div",
  {
    style: {
      borderTop: "thin solid var(--border-subtle)",
      height: "1px",
      width: "100%"
    }
  }
);

// lib/components/TextInput.tsx
var TextInput_default = BdApi.Components.TextInput;

// lib/common/Lodash.ts
var Lodash_default = /* @__PURE__ */ BdApi.Webpack.getByKeys("debounce");

// plugins/AVCStalker/data/FileData.ts
var import_fs = __toESM(require("fs"));

// plugins/AVCStalker/data/index.ts
var memoryCache = /* @__PURE__ */ new Map();
function append(tsVoiceState, relevantId) {
  if (!relevantId) {
    relevantId = tsVoiceState.userId;
    logger.info(`changed relevantId to tsVoiceState`, tsVoiceState.userId);
  }
  logger.info(`updated voice state cache`);
  memoryCache.set(relevantId, [
    ...memoryCache.get(relevantId) ?? [],
    tsVoiceState
  ]);
}

// plugins/AVCStalker/data/FileData.ts
var import_path = __toESM(require("path"));
function readLogFile() {
  const filePath = AVCStalker.settings.vcLogging.filePath.replace("%plugins%", BdApi.Plugins.folder).replace("/", import_path.default.sep);
  try {
    const fileExists = import_fs.default.existsSync(filePath);
    if (!fileExists) return {};
    return JSON.parse(
      import_fs.default.readFileSync(filePath, { encoding: "utf-8" })
    );
  } catch (err) {
    logger.critical(`Failed to read the file cache for VoiceStateLogs: `, err);
    return {};
  }
}
function save() {
  try {
    const filePath = AVCStalker.settings.vcLogging.filePath.replace("%plugins%", BdApi.Plugins.folder).replace("/", import_path.default.sep);
    const data = readLogFile();
    memoryCache.forEach((value) => {
      const userId = value[0].userId;
      if (!userId) throw new Error(`Failed to save VCStalker log data, unable to find userId on first element of memory cache ${value[0]} ${value}`);
      data[userId] = [
        ...data[userId] ?? [],
        ...value
      ];
    });
    memoryCache.clear();
    import_fs.default.writeFileSync(filePath, JSON.stringify(data), { encoding: "utf-8" });
    logger.info(`wrote out VCStalker log data`, data, filePath);
  } catch (err) {
    logger.critical(`FAILED TO SAVE DATA??`, err);
    return;
  }
}

// plugins/AVCStalker/components/Settings.tsx
function TextInput(props) {
  return /* @__PURE__ */ React.createElement(
    FormItem,
    {
      style: {
        width: "50%"
      },
      className: Margins.marginBottom20,
      ...props
    },
    /* @__PURE__ */ React.createElement(
      TextInput_default,
      {
        ...props
      }
    )
  );
}
function Settings() {
  const [clickVoiceChatButtonClears, setClickVoiceChatButtonClears] = React.useState(AVCStalker.settings.voiceChatFollowing.clickVoiceChatButtonClears);
  const [ignoreAFKChannels, setIgnoreAFKChannels] = React.useState(AVCStalker.settings.voiceChatFollowing.ignoreAFKChannels);
  const [userPopout, setUserPopout] = React.useState(AVCStalker.settings.userPopout);
  const [avoidPreferEmpty, setAvoidPreferEmpty] = React.useState(AVCStalker.settings.avoidPreferEmpty);
  const [isVCLoggingEnabled, setVCLoggingEnabled] = React.useState(AVCStalker.settings.vcLogging.enabled);
  const [vcLoggingMaxSize, setVCLoggingMaxSize] = React.useState(AVCStalker.settings.vcLogging.maxSize);
  const [logFriends, setLogFriends] = React.useState(AVCStalker.settings.vcLogging.logFriends);
  const [logCorrelatedPeople, setLogCorrelatedPeople] = React.useState(AVCStalker.settings.vcLogging.logCorrelatedPeople);
  const [filePath, setFilePath] = React.useState(AVCStalker.settings.vcLogging.filePath);
  const [isPeriodicSaving, setPeriodicSaving] = React.useState(AVCStalker.settings.vcLogging.periodicSaving ?? true);
  const [saveInterval, setSaveInterval] = React.useState(AVCStalker.settings.vcLogging.saveInterval ?? 60);
  const [isInvidual, setInvididual] = React.useState(AVCStalker.settings.contextMenu.individual);
  const [showLogButton, setShowLogButton] = React.useState(AVCStalker.settings.contextMenu.showLogButton);
  const [showWhitelistButton, setShowWhitelistButton] = React.useState(AVCStalker.settings.contextMenu.showWhitelistButton);
  const [showAvoidButton, setShowAvoidButton] = React.useState(AVCStalker.settings.contextMenu.showWhitelistButton);
  const [contextName, setContextName] = React.useState(AVCStalker.settings.contextMenu.name);
  React.useEffect(() => {
    AVCStalker.settings = {
      voiceChatFollowing: {
        clickVoiceChatButtonClears,
        ignoreAFKChannels
      },
      avoidPreferEmpty,
      userPopout,
      vcLogging: {
        enabled: isVCLoggingEnabled,
        maxSize: vcLoggingMaxSize,
        whitelisted: AVCStalker.settings.vcLogging.whitelisted,
        logFriends,
        filePath,
        logCorrelatedPeople,
        saveInterval,
        periodicSaving: isPeriodicSaving
      },
      contextMenu: {
        individual: isInvidual,
        showLogButton,
        name: contextName,
        showWhitelistButton,
        showAvoidButton
      }
    };
    BdApi.Data.save(config_default.name, "settings", AVCStalker.settings);
  }, [
    clickVoiceChatButtonClears,
    userPopout,
    isVCLoggingEnabled,
    vcLoggingMaxSize,
    logFriends,
    isInvidual,
    contextName,
    showWhitelistButton,
    showLogButton,
    showAvoidButton,
    avoidPreferEmpty,
    ignoreAFKChannels
  ]);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(FormTitle, { tag: "h2" }, "General Settings"), /* @__PURE__ */ React.createElement(
    FormSwitch,
    {
      value: clickVoiceChatButtonClears,
      onChange: (e) => setClickVoiceChatButtonClears(e),
      note: "Should clicking the following button clear the following list? Setting made for Ollie."
    },
    "Following Button Clearing"
  ), /* @__PURE__ */ React.createElement(
    FormSwitch,
    {
      note: "NO LONGER SUPPORTED : Should we show what voice channels someone is in on their user popout?",
      value: userPopout,
      onChange: (e) => setUserPopout(e),
      disabled: true
    },
    "User Popout"
  ), /* @__PURE__ */ React.createElement(
    FormSwitch,
    {
      note: "When avoiding a user, should we attempt to join empty channels only?",
      value: avoidPreferEmpty,
      onChange: (e) => setAvoidPreferEmpty(e)
    },
    "Avoid Prefer Empty"
  ), /* @__PURE__ */ React.createElement(
    FormSwitch,
    {
      note: "When following a user, should we ignore AFK channels?",
      value: ignoreAFKChannels,
      onChange: (e) => setIgnoreAFKChannels(e)
    },
    "Ignore AFK Channels"
  ), /* @__PURE__ */ React.createElement(FormDivider, null), /* @__PURE__ */ React.createElement(FormTitle, { tag: "h2" }, "Voice Chat Logging"), /* @__PURE__ */ React.createElement(
    FormSwitch,
    {
      note: "Should we log out voice states for later analysis?",
      value: isVCLoggingEnabled,
      onChange: (e) => setVCLoggingEnabled(e)
    },
    "Enable Logging"
  ), /* @__PURE__ */ React.createElement(
    TextInput,
    {
      title: "Maximum File Size (megabytes)",
      value: String(vcLoggingMaxSize),
      disabled: true,
      onChange: (e) => {
        if (!Lodash_default.isNumber(e)) return;
        setVCLoggingMaxSize(Number(e));
      }
    }
  ), /* @__PURE__ */ React.createElement(
    FormSwitch,
    {
      note: "Should we always log friend's voice states?",
      value: logFriends,
      onChange: (e) => setLogFriends(e)
    },
    "Log Friends"
  ), /* @__PURE__ */ React.createElement(
    FormSwitch,
    {
      note: "Should we attempt to check if someone we have whitelisted/friended is in their call and log their state if so? WARNING: THIS WILL LAG YOUR DISCORD IF YOU ARE IN BIG SERVERS!",
      value: logCorrelatedPeople,
      onChange: (e) => setLogCorrelatedPeople(e)
    },
    "Log Correlated People"
  ), /* @__PURE__ */ React.createElement(
    TextInput,
    {
      title: 'The location where we should save our VoiceState logs. Use "%plugins%" for plugin folder.',
      value: filePath,
      onChange: (e) => setFilePath(e)
    }
  ), /* @__PURE__ */ React.createElement(
    FormSwitch,
    {
      note: "Should we save our voice logs every (x) amount of time?",
      value: isPeriodicSaving,
      onChange: (e) => setPeriodicSaving(e)
    },
    "Periodic Saving"
  ), /* @__PURE__ */ React.createElement(
    TextInput,
    {
      title: "Save Interval (minutes)",
      value: String(saveInterval),
      disabled: !isPeriodicSaving,
      onChange: (e) => {
        if (!Lodash_default.isNumber(e)) return;
        setSaveInterval(e);
        if (AVCStalker.saveInterval) clearInterval(AVCStalker.saveInterval);
        AVCStalker.saveInterval = setInterval(() => {
          logger.info(`periodic save of voice state logs`);
          save();
        }, saveInterval);
      }
    }
  ), /* @__PURE__ */ React.createElement(FormDivider, null), /* @__PURE__ */ React.createElement(FormTitle, { tag: "h2" }, "Context Menu"), /* @__PURE__ */ React.createElement(
    FormSwitch,
    {
      note: "Makes each button show as an individual button on the context menu rather than under a group.",
      value: isInvidual,
      onChange: (e) => setInvididual(e)
    },
    "Individual Context Menu Buttons"
  ), /* @__PURE__ */ React.createElement(
    FormSwitch,
    {
      note: "Should we show a button to avoid specific users (automatically swap to next call when user joins)?",
      value: showAvoidButton,
      onChange: (e) => setShowAvoidButton(e)
    },
    "Show Avoid Button"
  ), /* @__PURE__ */ React.createElement(
    FormSwitch,
    {
      note: "Should we show a button to open voice state logs on the user context menu?",
      value: showLogButton,
      onChange: (e) => setShowLogButton(e)
    },
    "Show Log Button"
  ), /* @__PURE__ */ React.createElement(
    FormSwitch,
    {
      note: "Should we show a button that allows for adding a user to our active VoiceState logging?",
      value: showWhitelistButton,
      onChange: (e) => setShowWhitelistButton(e)
    },
    "Show VoiceLog Whitelist Button"
  ), /* @__PURE__ */ React.createElement(
    TextInput,
    {
      title: "Context Menu Name",
      disabled: isInvidual,
      value: contextName,
      onChange: (e) => {
        setContextName(e);
      }
    }
  ));
}

// lib/stores/UserStore.ts
var UserStore_default = /* @__PURE__ */ BdApi.Webpack.getStore("UserStore");

// lib/stores/GuildChannelStore.ts
var GuildChannelStore_default = BdApi.Webpack.getStore("GuildChannelStore");

// lib/stores/GuildStore.ts
var GuildStore_default = BdApi.Webpack.getStore("GuildStore");

// plugins/AVCStalker/util.ts
var ConnectionMask = BigInt(1 << 20);
var voiceChannelUtils = BdApi.Webpack.getByKeys("selectVoiceChannel", "disconnect", { searchExports: true });
var PermissionStore = BdApi.Webpack.getStore("PermissionStore");
function canJoinCall(channel) {
  if (!channel) return false;
  const VSs = VoiceStateStore_default.getVoiceStatesForChannel(channel.id);
  if (!VSs) return false;
  if ((PermissionStore.getChannelPermissions(channel) & ConnectionMask) !== ConnectionMask) {
    logger.info(`attempted to join vc but we are denied from joining (general channel perms), setting 250ms timeout before attempting to rejoin`);
    return false;
  }
  if (channel.permissionOverwrites_ && channel.permissionOverwrites_[UserStore_default.getCurrentUser().id] && (channel.permissionOverwrites_[UserStore_default.getCurrentUser().id]?.deny & ConnectionMask) !== ConnectionMask) {
    logger.info(`attempted to join vc but we are denied from joining (channel overwrite), setting 250ms timeout before attempting to rejoin`);
    return false;
  }
  const amount = Object.keys(VSs).length;
  if (channel.userLimit_ !== 0 && amount >= channel.userLimit_) {
    logger.info(`attempted to join vc but it was full (${amount} >= ${channel.userLimit_})`);
    return false;
  }
  return true;
}
function joinCall(voiceState, hasSaidWaiting = false) {
  if (!voiceState) {
    return;
  }
  if (!followingPeople.has(voiceState.userId)) return;
  if (VoiceStateStore_default.isInChannel(voiceState.channelId)) return;
  const channel = ChannelStore_default.getChannel(voiceState.channelId);
  if (AVCStalker.settings.voiceChatFollowing.ignoreAFKChannels) {
    const afkChannelId = GuildStore_default.getGuild(channel.guild_id)?.afkChannelId;
    if (afkChannelId === voiceState.channelId) return;
  }
  if (!canJoinCall(channel)) {
    if (!hasSaidWaiting) BdApi.UI.showToast(`Waiting to join ${UserStore_default.getUser(voiceState.userId).globalName} in ${channel.name}`, { type: "info" });
    return setTimeout(() => joinCall(VoiceStateStore_default.getVoiceStateForUser(voiceState.userId), true));
  }
  const msg = `Joining ${UserStore_default.getUser(voiceState.userId).globalName} in #${channel.name}`;
  logger.info(msg);
  BdApi.UI.showToast(msg);
  voiceChannelUtils.selectVoiceChannel(voiceState.channelId);
}

// plugins/AVCStalker/voiceState/Following.ts
var followingPeople = /* @__PURE__ */ new Set();
var avoidingPeople = /* @__PURE__ */ new Set();
function followFromVoiceState(vs) {
  if (vs.channelId === vs.oldChannelId) return;
  if (vs.channelId === null || !vs.channelId) {
    BdApi.UI.showToast(`${UserStore_default.getUser(vs.userId).globalName} left voice chat!`, { type: "warn" });
    return;
  }
  joinCall(vs);
}
function avoidFromVoiceState(vs) {
  if (vs.channelId !== VoiceStateStore_default.getVoiceStateForUser(UserStore_default.getCurrentUser().id)?.channelId)
    return;
  if (vs.channelId === null || !vs.channelId) {
    logger.log(`AVOIDING: ${UserStore_default.getUser(vs.userId).globalName} left voice chat!`);
    return;
  }
  const currentChannel = ChannelStore_default.getChannel(vs.channelId);
  if (!currentChannel || !currentChannel.guild_id) {
    logger.error(`AVOIDING: Failed to find current channel or the guild_id`, currentChannel);
    return;
  }
  const guildId = currentChannel.guild_id;
  const voiceChannels = GuildChannelStore_default.getVocalChannelIds(guildId);
  const currentVC = voiceChannels.indexOf(vs.channelId);
  if (currentVC === -1) {
    logger.error(`AVOIDING: Failed to find the call we are currently in within the Guild's voice channels`);
    return;
  }
  const channel = findAvailableAvoidCall(voiceChannels, currentVC);
  if (!channel) {
    logger.error(`AVOIDING: Failed to find call to avoid a user in,,,?`, channel, currentVC, voiceChannels);
    BdApi.UI.showToast("Failed to find an empty channel.", { type: "error" });
    return;
  }
  voiceChannelUtils.selectVoiceChannel(channel.id);
}
function respectPreference(channel) {
  if (!channel) return false;
  if (AVCStalker.settings.avoidPreferEmpty) {
    const VSs = VoiceStateStore_default.getVoiceStatesForChannel(channel.id);
    const amount = Object.keys(VSs).length;
    if (amount !== 0) return false;
  }
  return canJoinCall(channel);
}
function findAvailableAvoidCall(channels, currentVC) {
  let upIndex = currentVC + 1;
  let downIndex = channels.slice(currentVC).length;
  while (upIndex < channels.length || downIndex >= 0) {
    if (upIndex !== currentVC && upIndex < channels.length && respectPreference(ChannelStore_default.getChannel(channels[upIndex]))) return ChannelStore_default.getChannel(channels[upIndex]);
    if (downIndex !== currentVC && downIndex >= 0 && respectPreference(ChannelStore_default.getChannel(channels[downIndex]))) return ChannelStore_default.getChannel(channels[downIndex]);
    upIndex++;
    downIndex--;
  }
  return null;
}

// lib/stores/RelationshipStore.ts
var RelationshipStore_default = BdApi.Webpack.getStore("RelationshipStore");

// plugins/AVCStalker/voiceState/Logging.ts
var ourId = UserStore_default.getCurrentUser().id;
function isFriendOrWhitelisted(voiceState) {
  if (voiceState.userId === ourId) return false;
  if (AVCStalker.settings.vcLogging.whitelisted.includes(voiceState.userId)) return true;
  if (AVCStalker.settings.vcLogging.logFriends) return RelationshipStore_default.isFriend(voiceState.userId);
  return false;
}
function getCorrelatedPeople(voiceState) {
  if (voiceState.channelId === null) return void 0;
  const inVC = VoiceStateStore_default.getVoiceStatesForChannel(voiceState.channelId);
  const outputIds = [];
  for (const userId in inVC) {
    const state = inVC[userId];
    if (voiceState.userId === userId) continue;
    if (isFriendOrWhitelisted(state)) outputIds.push(state.userId);
  }
  return outputIds;
}

// plugins/AVCStalker/voiceState/index.ts
function onVoiceChange(voiceState) {
  if (voiceState.type !== "VOICE_STATE_UPDATES") return;
  for (let i = 0; i < voiceState.voiceStates.length; i++) {
    const vs = voiceState.voiceStates[i];
    if (avoidingPeople.has(vs.userId)) avoidFromVoiceState(vs);
    if (followingPeople.has(vs.userId)) followFromVoiceState(vs);
    if (AVCStalker.settings.vcLogging.enabled) {
      if (isFriendOrWhitelisted(vs)) append({ ...vs, when: Date.now() }, vs.userId);
      if (!AVCStalker.settings.vcLogging.logCorrelatedPeople) continue;
      const correlatedUserIds = getCorrelatedPeople(vs);
      if (!correlatedUserIds || correlatedUserIds.length === 0) continue;
      for (let j = 0; j < correlatedUserIds.length; j++) append({ ...vs, when: Date.now() }, correlatedUserIds[j]);
    }
  }
}

// lib/modules/Dispatcher.ts
var Dispatcher_default = /* @__PURE__ */ BdApi.Webpack.getByKeys("dispatch", "subscribe", "register", { searchExports: true });

// lib/modules/ModalsModule.ts
var ModalsModule_default = {
  openModal: BdApi.Webpack.getByStrings(",instant:", { searchExports: true }),
  closeModal: BdApi.Webpack.getByStrings(".onCloseCallback()", { searchExports: true }),
  ModalRoot: BdApi.Webpack.getByStrings("MODAL_ROOT_LEGACY", { searchExports: true }),
  ModalSize: BdApi.Webpack.getByKeys("DYNAMIC", "SMALL", { searchExports: true })
};

// plugins/AVCStalker/components/modal/index.tsx
function openModalFor(userId) {
  logger.info(`opening voicestate modal for ${userId}`);
  void ModalsModule_default.openModal((props) => {
    return /* @__PURE__ */ React.createElement(ModalsModule_default.ModalRoot, { ...props }, /* @__PURE__ */ React.createElement("h1", null, "hi"));
  });
}

// plugins/AVCStalker/patches/UserContext.tsx
var { Item } = BdApi.ContextMenu;
function PatchUserContext() {
  logger.info("Patched UserContext");
  function findVCAndJoin(id) {
    const vs = VoiceStateStore_default.getVoiceStateForUser(id);
    if (!vs || !vs.channelId) return;
    logger.info(`${id} was already in a vc when we said to start following so joining their call (${vs.channelId})`);
    joinCall(vs);
  }
  function avoidNow(id) {
    const vs = VoiceStateStore_default.getVoiceStateForUser(id);
    if (!vs || !vs.channelId) return;
    const VSs = VoiceStateStore_default.getVoiceStatesForChannel(vs.channelId);
    if (!VSs) return;
    Object.keys(VSs).forEach((id2) => {
      if (UserStore_default.getCurrentUser().id === id2) {
        logger.info(`${id2} was already in a vc when we said to start avoiding so trying to find call (${vs.channelId})`);
        avoidFromVoiceState(vs);
        return;
      }
    });
  }
  return BdApi.ContextMenu.patch("user-context", (res, props) => {
    const us = UserStore_default.getCurrentUser().id;
    const id = props.user.id;
    if (id === us) return;
    const isFollowing = followingPeople.has(id);
    const isAvoiding = avoidingPeople.has(id);
    const followButton = /* @__PURE__ */ React.createElement(
      Item,
      {
        label: isFollowing ? "Unfollow" : "Follow",
        id: "follow-call",
        action: () => {
          if (isFollowing) followingPeople.delete(id);
          else {
            logger.info(`now following ${id}`);
            followingPeople.add(id);
            findVCAndJoin(id);
          }
        }
      }
    );
    const avoidButton = /* @__PURE__ */ React.createElement(
      Item,
      {
        label: isAvoiding ? "Stop Avoiding" : "Avoid",
        id: "avoid-user",
        action: () => {
          if (isAvoiding) avoidingPeople.delete(id);
          else {
            logger.info(`now avoiding ${id}`);
            avoidingPeople.add(id);
            avoidNow(id);
          }
        }
      }
    );
    const logButton = /* @__PURE__ */ React.createElement(
      Item,
      {
        label: "Open Voice Logs",
        id: "voice-logs",
        action: () => {
          logger.info(`opened voice state logs for: `, id);
          openModalFor(id);
        }
      }
    );
    const isWhitelisted = AVCStalker.settings.vcLogging.whitelisted.includes(id);
    const whitelistButton = /* @__PURE__ */ React.createElement(
      Item,
      {
        label: isWhitelisted ? "Remove From Whitelist" : "Add To Whitelist",
        id: "whitelist-button",
        action: () => {
          logger.info(`${isWhitelisted ? "removed" : "added"} ${id} to whitelisted (vclogs)`);
          if (isWhitelisted) AVCStalker.settings.vcLogging.whitelisted.splice(AVCStalker.settings.vcLogging.whitelisted.indexOf(id), 1);
          else AVCStalker.settings.vcLogging.whitelisted.push(id);
        }
      }
    );
    if (AVCStalker.settings.contextMenu.individual) {
      res.props.children.push(followButton);
      if (AVCStalker.settings.contextMenu.showAvoidButton) res.props.children.push(avoidButton);
      if (AVCStalker.settings.contextMenu.showLogButton) res.props.children.push(logButton);
      if (AVCStalker.settings.contextMenu.showWhitelistButton) res.props.children.push(whitelistButton);
    } else res.props.children.push(
      /* @__PURE__ */ React.createElement(
        Item,
        {
          label: AVCStalker.settings.contextMenu.name,
          id: "vcstalker-group"
        },
        followButton,
        AVCStalker.settings.contextMenu.showAvoidButton ? avoidButton : void 0,
        AVCStalker.settings.contextMenu.showLogButton ? logButton : void 0,
        AVCStalker.settings.contextMenu.showWhitelistButton ? whitelistButton : void 0
      )
    );
  });
}

// plugins/AVCStalker/components/ClearFollowing.tsx
var PanelButton = BdApi.Webpack.getBySource("PANEL_BUTTON").A;
function ClearFollowing() {
  function clearFollowingPeople() {
    console.log("clearFollowingPeople triggered");
    if (!AVCStalker.settings.voiceChatFollowing.clickVoiceChatButtonClears) {
      console.log("clickVoiceChatButtonClears is disabled");
      return;
    }
    BdApi.UI.showToast("Cleared following list", { type: "success" });
    followingPeople.clear();
  }
  function clearAvoidingPeople() {
    console.log("clearAvoidingPeople triggered");
    BdApi.UI.showToast("Cleared avoiding list", { type: "success" });
    avoidingPeople.clear();
  }
  function removeFromFollowing(id, username) {
    console.log(`removeFromFollowing triggered for id: ${id}, username: ${username}`);
    followingPeople.delete(id);
    BdApi.UI.showToast(`Removed ${username} from following queue`);
  }
  function removeFromAvoid(id, username) {
    console.log(`removeFromAvoid triggered for id: ${id}, username: ${username}`);
    avoidingPeople.delete(id);
    BdApi.UI.showToast(`Removed ${username} from avoiding`);
  }
  return /* @__PURE__ */ React.createElement(
    PanelButton,
    {
      icon: () => {
        return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", height: 20, width: 20, dangerouslySetInnerHTML: { __html: Icons.GoPeople } });
      },
      tooltipText: "Clear Following",
      onClick: () => {
        clearFollowingPeople();
      },
      onContextMenu: (e) => {
        const followingPeopleMenu = [];
        const avoidingPeopleMenu = [];
        if (followingPeople.size > 0) {
          followingPeople.forEach((userId) => {
            console.log(`Processing userId from following: ${userId}`);
            const user = UserStore_default.getUser(userId);
            if (user) {
              console.log(`Found user: ${user.globalName} (${user.username})`);
              followingPeopleMenu.push({
                type: "text",
                label: `${user.globalName} (${user.username})`,
                action: () => {
                  console.log(`Removing from following: ${user.username}`);
                  removeFromFollowing(user.id, user.username);
                }
              });
            } else {
              console.log(`User not found for userId: ${userId}`);
            }
          });
        } else {
          console.log("No users in followingPeople");
        }
        console.log("avoidingPeople.size:", avoidingPeople.size);
        if (avoidingPeople.size > 0) {
          avoidingPeople.forEach((userId) => {
            const user = UserStore_default.getUser(userId);
            if (user) {
              console.log(`Found user: ${user.globalName} (${user.username})`);
              avoidingPeopleMenu.push({
                type: "text",
                label: `${user.globalName} (${user.username})`,
                action() {
                  console.log(`Removing from avoiding: ${user.username}`);
                  removeFromAvoid(user.id, user.username);
                }
              });
            }
          });
        }
        const buildableMenu = [];
        if (followingPeopleMenu.length > 0) {
          console.log("Building menu for following people");
          buildableMenu.push(
            {
              label: "Click to remove from following"
            },
            {
              type: "group",
              items: followingPeopleMenu
            }
          );
        }
        if (avoidingPeopleMenu.length > 0) {
          console.log("Building menu for avoiding people");
          buildableMenu.push(
            {
              label: "Click to remove from avoiding"
            },
            {
              type: "group",
              items: avoidingPeopleMenu
            }
          );
        }
        const menu = BdApi.ContextMenu.buildMenu([
          ...buildableMenu,
          {
            type: "separator"
          },
          {
            type: "text",
            label: "Clear Following",
            action: () => {
              console.log("Clearing following list from context menu");
              clearFollowingPeople();
            }
          },
          {
            type: "text",
            label: "Clear Avoiding",
            action: () => {
              console.log("Clearing avoiding list from context menu");
              clearAvoidingPeople();
            }
          }
        ]);
        BdApi.ContextMenu.open(e, menu, {
          align: "top"
        });
      }
    }
  );
}

// plugins/AVCStalker/patches/UserAccountMenu.tsx
function PatchUserAccountMenu() {
  const muteButton = document.querySelector('[aria-label="Mute"]');
  let container = document.getElementById("ClearFollowing");
  if (!container) {
    logger.info(`Failed to find 'container' making new one`);
    container = document.createElement("div");
    container.setAttribute("id", "ClearFollowing");
  }
  const statusContainer = document.querySelector('[aria-label="Set Status"]');
  if (!statusContainer) {
    logger.critical('Failed to find statusContainer with query "[aria-label="Set Status"]", expected HTMLElement but recieved ', statusContainer);
    return;
  }
  if (statusContainer?.style?.minWidth !== "87px") {
    statusContainer.style.minWidth = "87px";
  }
  logger.info(`inserting container 'beforebegin' on element`, muteButton);
  muteButton?.insertAdjacentElement("beforebegin", container);
  if (typeof ReactDom.render !== "undefined") {
    BdApi.ReactDOM.render(/* @__PURE__ */ React.createElement(ClearFollowing, null), container);
  } else if (typeof ReactDom.createRoot !== "undefined") {
    const root = ReactDom.createRoot(container);
    root.render(/* @__PURE__ */ React.createElement(ClearFollowing, null));
  }
}

// plugins/AVCStalker/index.tsx
var Icons = {
  LiaUserSlashSolid: `<path d="M 3.6992188 2.3007812 L 2.3007812 3.6992188 L 9.1210938 10.519531 C 9.1148472 10.54659 9.1055539 10.572434 9.0996094 10.599609 L 11 12.5 L 11 12.398438 L 15.601562 17 L 15.5 17 L 17.699219 19.199219 C 17.749353 19.210917 17.795909 19.231553 17.845703 19.244141 L 23.660156 25.058594 C 23.670754 25.106568 23.68955 25.150877 23.699219 25.199219 L 25.5 27 L 25.601562 27 L 28.300781 29.699219 L 29.699219 28.300781 L 25.59375 24.195312 C 24.75029 21.314801 22.648326 18.945754 19.900391 17.800781 C 21.800391 16.500781 23 14.4 23 12 C 23 8.1 19.9 5 16 5 C 13.390973 5 11.146509 6.4199607 9.921875 8.5234375 L 3.6992188 2.3007812 z M 16 7 C 18.8 7 21 9.2 21 12 C 21 14.086994 19.776043 15.83791 17.994141 16.595703 L 11.404297 10.005859 C 12.16209 8.2239568 13.913006 7 16 7 z M 9.0996094 13.300781 C 9.4996094 15.200781 10.499609 16.800781 12.099609 17.800781 C 8.4996094 19.300781 6 22.9 6 27 L 8 27 C 8 22.9 11.000391 19.599609 14.900391 19.099609 L 9.0996094 13.300781 z"></path>`,
  GaUserAdd: `<path fill-rule="evenodd" clip-rule="evenodd" d="M8 11C10.2091 11 12 9.20914 12 7C12 4.79086 10.2091 3 8 3C5.79086 3 4 4.79086 4 7C4 9.20914 5.79086 11 8 11ZM8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z" fill="currentColor"/><path d="M11 14C11.5523 14 12 14.4477 12 15V21H14V15C14 13.3431 12.6569 12 11 12H5C3.34315 12 2 13.3431 2 15V21H4V15C4 14.4477 4.44772 14 5 14H11Z" fill="currentColor"/><path d="M18 7H20V9H22V11H20V13H18V11H16V9H18V7Z" fill="currentColor" />`,
  GaUser: `<path fill-rule="evenodd" clip-rule="evenodd" d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z" fill="currentColor"/><path d="M16 15C16 14.4477 15.5523 14 15 14H9C8.44772 14 8 14.4477 8 15V21H6V15C6 13.3431 7.34315 12 9 12H15C16.6569 12 18 13.3431 18 15V21H16V15Z" fill="currentColor"/>`,
  GoPeople: `<path style="fill:currentColor;" d="M3.5 8a5.5 5.5 0 1 1 8.596 4.547 9.005 9.005 0 0 1 5.9 8.18.751.751 0 0 1-1.5.045 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.499-.044 9.005 9.005 0 0 1 5.9-8.181A5.496 5.496 0 0 1 3.5 8ZM9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm8.29 4c-.148 0-.292.01-.434.03a.75.75 0 1 1-.212-1.484 4.53 4.53 0 0 1 3.38 8.097 6.69 6.69 0 0 1 3.956 6.107.75.75 0 0 1-1.5 0 5.193 5.193 0 0 0-3.696-4.972l-.534-.16v-1.676l.41-.209A3.03 3.03 0 0 0 17.29 8Z"/>`,
  RxCross2: `<path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor"/>`
};
var DefaultSettings = {
  voiceChatFollowing: {
    clickVoiceChatButtonClears: true,
    ignoreAFKChannels: true
  },
  userPopout: false,
  avoidPreferEmpty: true,
  vcLogging: {
    enabled: false,
    // list of user ids
    whitelisted: [],
    // megabytes
    maxSize: 1e3,
    logFriends: true,
    logCorrelatedPeople: false,
    filePath: "%plugins%/AVCStalker_VSLogs.json",
    saveInterval: 60,
    periodicSaving: true
  },
  contextMenu: {
    individual: false,
    showLogButton: true,
    showWhitelistButton: true,
    showAvoidButton: true,
    name: "Voice Utilities"
  }
};
var logger = new Logger(config_default);
var AVCStalker = class _AVCStalker {
  constructor() {
    this.cancelUserContextPatch = null;
  }
  static {
    this.settings = DefaultSettings;
  }
  static {
    this.saveInterval = null;
  }
  start() {
    const loadedSettings = BdApi.Data.load(config_default.name, "settings");
    _AVCStalker.settings = {
      ...DefaultSettings,
      ...loadedSettings
    };
    Dispatcher_default.subscribe("VOICE_STATE_UPDATES", onVoiceChange);
    logger.info("Patching UserCallHeader");
    PatchUserCallHeader();
    logger.info("Patching UserContext");
    this.cancelUserContextPatch = PatchUserContext();
    logger.info("Dom-Patching UserAccountPanel");
    PatchUserAccountMenu();
  }
  stop() {
    logger.info("Unpatching everything under the name of ", config_default.name);
    BdApi.Patcher.unpatchAll(config_default.name);
    this.cancelUserContextPatch();
    logger.info("Unsubscribed from VOICE_STATE_UPDATES (vc monitoring");
    Dispatcher_default.unsubscribe("VOICE_STATE_UPDATES", onVoiceChange);
    logger.info("Saving settings", _AVCStalker.settings);
    BdApi.Data.save(config_default.name, "settings", _AVCStalker.settings);
    logger.info("Saving VC logs");
    save();
    const elm = document.getElementById("ClearFollowing");
    if (elm) {
      elm.style.minWidth = "";
      elm.remove();
    }
  }
  getSettingsPanel() {
    return Settings;
  }
  onSwitch() {
    logger.info("Dom-Patching UserAccountPanel");
    PatchUserAccountMenu();
  }
};
