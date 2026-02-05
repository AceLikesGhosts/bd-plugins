/**
* @name DadscordCustomVCs
* @description Set of tools to make Dadscord custom VCs better.
* @author ace.
* @source https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/ADifferentSearch/ADifferentSearch.plugin.js
* @authorLink https://github.com/AceLikesGhosts/bd-plugins
* @version 1.0.2
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

// plugins/DadscordCustomVCs/index.ts
var index_exports = {};
__export(index_exports, {
  AllAllowedCommands: () => AllAllowedCommands,
  AllowedCommands: () => AllowedCommands,
  DADSCORD_GUILD_ID: () => DADSCORD_GUILD_ID,
  DefaultSettings: () => DefaultSettings,
  NotificationEvents: () => NotificationEvents,
  default: () => DadscordAutoBans,
  logger: () => logger,
  meta: () => config_default,
  ownsVoiceChat: () => ownsVoiceChat
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

// plugins/DadscordCustomVCs/config.json
var config_default = {
  $schema: "../../config_schema.jsonc",
  name: "DadscordCustomVCs",
  description: "Set of tools to make Dadscord custom VCs better.",
  author: "ace.",
  source: "https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/ADifferentSearch/ADifferentSearch.plugin.js",
  authorLink: "https://github.com/AceLikesGhosts/bd-plugins",
  version: "1.0.2",
  authorId: "327639826075484162"
};

// lib/components/index.ts
var React = BdApi.React;
var ReactDom = BdApi.ReactDOM || BdApi.Webpack.getByKeys("createRoot");

// lib/components/Flex.tsx
var Flex_default = /* @__PURE__ */ BdApi.Webpack.getByKeys("Child", "Justify");

// lib/components/Timestamp.ts
var Timestamp_default = BdApi.Webpack.getByStrings("timestampFormat", "timestamp", { searchExports: true });

// lib/stores/UserStore.ts
var UserStore_default = /* @__PURE__ */ BdApi.Webpack.getStore("UserStore");

// plugins/DadscordCustomVCs/modal/AutoBanModal.tsx
var { Text, SettingItem, TextInput, Button } = BdApi.Components;
function AutobannedUser({
  timestamp,
  userId,
  reason,
  onRemoveUser
}) {
  const user = UserStore_default.getUser(userId);
  const [reasonState, setReason] = React.useState(reason);
  React.useEffect(() => {
    DadscordAutoBans.settings.autoBanUserIds.set(userId, {
      timestamp,
      reason: reasonState
    });
  }, [reasonState]);
  return /* @__PURE__ */ React.createElement("li", { style: {
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    maxWidth: "500px"
  } }, /* @__PURE__ */ React.createElement(Flex_default, { direction: Flex_default.Direction.HORIZONTAL, align: Flex_default.Align.CENTER, style: { gap: "12px" } }, /* @__PURE__ */ React.createElement(
    "img",
    {
      src: user?.id ? `https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}` : "https://cdn.discordapp.com/embed/avatars/0.png",
      height: "40px",
      width: "40px",
      style: { borderRadius: "50%" }
    }
  ), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Text, { size: Text.Sizes.SIZE_16, tag: "h4", strong: true }, user?.username ?? "Unknown Username"), /* @__PURE__ */ React.createElement(Timestamp_default, { timestamp }))), /* @__PURE__ */ React.createElement(SettingItem, { id: `reason-${user?.id}`, name: "Reason", note: "" }, /* @__PURE__ */ React.createElement(
    TextInput,
    {
      onChange: (e) => setReason(e),
      value: reasonState ?? "",
      placeholder: "Enter a reason..."
    }
  )), /* @__PURE__ */ React.createElement(Button, { onClick: () => onRemoveUser(userId), color: Button.Colors.RED, style: { marginTop: "8px" } }, "Remove User"));
}
function AutoBanModal() {
  const [autoBanUserIds, setAutoBanUserIds] = React.useState(new Map(DadscordAutoBans.settings.autoBanUserIds));
  const [newUserId, setNewUserId] = React.useState("");
  const [newReason, setNewReason] = React.useState("");
  const addUser = (userId, reason) => {
    if (!userId) return;
    const newUser = {
      timestamp: /* @__PURE__ */ new Date(),
      reason
    };
    const updatedUserIds = new Map(autoBanUserIds);
    updatedUserIds.set(userId, newUser);
    setAutoBanUserIds(updatedUserIds);
    DadscordAutoBans.settings.autoBanUserIds = updatedUserIds;
  };
  const removeUser = (userId) => {
    const updatedUserIds = new Map(autoBanUserIds);
    updatedUserIds.delete(userId);
    setAutoBanUserIds(updatedUserIds);
    DadscordAutoBans.settings.autoBanUserIds = updatedUserIds;
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "20px",
    maxWidth: "500px",
    marginBottom: "20px"
  } }, /* @__PURE__ */ React.createElement(Text, { size: Text.Sizes.SIZE_16, tag: "h3", strong: true }, "Add a New Autobanned User"), /* @__PURE__ */ React.createElement(
    TextInput,
    {
      value: newUserId,
      onChange: (e) => setNewUserId(e),
      placeholder: "Enter User ID"
    }
  ), /* @__PURE__ */ React.createElement(
    TextInput,
    {
      value: newReason ?? "",
      onChange: (e) => setNewReason(e),
      placeholder: "Optional: Enter a Reason"
    }
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      onClick: () => addUser(newUserId, newReason),
      color: Button.Colors.GREEN,
      style: { padding: "10px" }
    },
    "Add User"
  )), /* @__PURE__ */ React.createElement("ul", { style: { display: "flex", flexDirection: "column", gap: "10px" } }, Array.from(autoBanUserIds.entries()).map(([key, value]) => /* @__PURE__ */ React.createElement(
    AutobannedUser,
    {
      key,
      userId: key,
      timestamp: value.timestamp,
      reason: value.reason,
      onRemoveUser: removeUser
    }
  ))));
}

// plugins/DadscordCustomVCs/modal/NameFilteringModal.tsx
var { Text: Text2, TextInput: TextInput2, Button: Button2 } = BdApi.Components;
function NameFilterItem({
  filter,
  onRemoveFilter
}) {
  return /* @__PURE__ */ React.createElement("li", { style: {
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    maxWidth: "500px"
  } }, /* @__PURE__ */ React.createElement(Flex_default, { direction: Flex_default.Direction.HORIZONTAL, align: Flex_default.Align.CENTER, style: { gap: "12px" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Text2, { size: Text2.Sizes.SIZE_16, tag: "h4", strong: true }, filter))), /* @__PURE__ */ React.createElement(Button2, { onClick: () => onRemoveFilter(filter), color: Button2.Colors.RED, style: { marginTop: "8px" } }, "Remove Filter"));
}
function NameFilterModal() {
  const [nameFilters, setNameFilters] = React.useState(new Set(DadscordAutoBans.settings.nameFiltering));
  const [newFilter, setNewFilter] = React.useState("");
  const addFilter = (filter) => {
    if (!filter) return;
    const updatedFilters = new Set(nameFilters);
    updatedFilters.add(filter);
    setNameFilters(updatedFilters);
    DadscordAutoBans.settings.nameFiltering = updatedFilters;
  };
  const removeFilter = (filter) => {
    const updatedFilters = new Set(nameFilters);
    updatedFilters.delete(filter);
    setNameFilters(updatedFilters);
    DadscordAutoBans.settings.nameFiltering = updatedFilters;
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "20px",
    maxWidth: "500px",
    marginBottom: "20px"
  } }, /* @__PURE__ */ React.createElement(Text2, { size: Text2.Sizes.SIZE_16, tag: "h3", strong: true }, "Add a New Name Filter"), /* @__PURE__ */ React.createElement(
    TextInput2,
    {
      value: newFilter,
      onChange: (e) => setNewFilter(e),
      placeholder: "Enter a name or regex filter"
    }
  ), /* @__PURE__ */ React.createElement(
    Button2,
    {
      onClick: () => addFilter(newFilter),
      color: Button2.Colors.GREEN,
      style: { padding: "10px" }
    },
    "Add Filter"
  )), /* @__PURE__ */ React.createElement("ul", { style: { display: "flex", flexDirection: "column", gap: "10px" } }, Array.from(nameFilters).map((filter) => /* @__PURE__ */ React.createElement(
    NameFilterItem,
    {
      key: filter,
      filter,
      onRemoveFilter: removeFilter
    }
  ))));
}

// plugins/DadscordCustomVCs/modal/SharedCallOwnershipModal.tsx
var { Text: Text3, TextInput: TextInput3, Button: Button3 } = BdApi.Components;
function OwnershipItem({
  userId,
  commands,
  onRemoveOwnership,
  onChangePermissions
}) {
  const user = UserStore_default.getUser(userId);
  const handleCheckboxChange = (command) => {
    onChangePermissions(userId, commands.includes(command) ? commands.filter((c) => c !== command) : [...commands, command]);
  };
  return /* @__PURE__ */ React.createElement("li", { style: {
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    maxWidth: "500px"
  } }, /* @__PURE__ */ React.createElement(Flex_default, { direction: Flex_default.Direction.HORIZONTAL, align: Flex_default.Align.CENTER, style: { gap: "12px" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Text3, { size: Text3.Sizes.SIZE_16, tag: "h4", strong: true }, user?.username ?? "Unknown Username"), /* @__PURE__ */ React.createElement("div", null, AllAllowedCommands.map((command) => /* @__PURE__ */ React.createElement("div", { key: command, style: { marginBottom: "4px" } }, /* @__PURE__ */ React.createElement("label", { style: { display: "flex", alignItems: "center", gap: "8px" } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "checkbox",
      checked: commands.includes(command),
      onChange: () => handleCheckboxChange(command),
      style: {
        accentColor: "rgb(114, 137, 218)",
        cursor: "pointer"
      }
    }
  ), /* @__PURE__ */ React.createElement(Text3, { size: Text3.Sizes.SIZE_14, tag: "span" }, AllowedCommands[command]))))))), /* @__PURE__ */ React.createElement(Button3, { onClick: () => onRemoveOwnership(userId), color: Button3.Colors.RED, style: { marginTop: "8px" } }, "Remove Ownership"));
}
function SharedCallOwnershipModal() {
  const [ownerships, setOwnerships] = React.useState(new Map(DadscordAutoBans.settings.persistantSharedCallOwnership));
  const [newUserId, setNewUserId] = React.useState("");
  const [selectedCommands, setSelectedCommands] = React.useState([]);
  const addOwnership = (userId, commands) => {
    if (!userId || commands.length === 0) return;
    const updatedOwnerships = new Map(ownerships);
    updatedOwnerships.set(userId, commands);
    setOwnerships(updatedOwnerships);
    DadscordAutoBans.settings.persistantSharedCallOwnership = updatedOwnerships;
  };
  const removeOwnership = (userId) => {
    const updatedOwnerships = new Map(ownerships);
    updatedOwnerships.delete(userId);
    setOwnerships(updatedOwnerships);
    DadscordAutoBans.settings.persistantSharedCallOwnership = updatedOwnerships;
  };
  const changePermissions = (userId, updatedCommands) => {
    const updatedOwnerships = new Map(ownerships);
    updatedOwnerships.set(userId, updatedCommands);
    setOwnerships(updatedOwnerships);
    DadscordAutoBans.settings.persistantSharedCallOwnership = updatedOwnerships;
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "20px",
    maxWidth: "500px",
    marginBottom: "20px"
  } }, /* @__PURE__ */ React.createElement(Text3, { size: Text3.Sizes.SIZE_16, tag: "h3", strong: true }, "Add New Shared Ownership"), /* @__PURE__ */ React.createElement(
    TextInput3,
    {
      value: newUserId,
      onChange: (e) => setNewUserId(e),
      placeholder: "Enter User ID"
    }
  ), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Text3, { size: Text3.Sizes.SIZE_14, tag: "p" }, "Select Commands"), /* @__PURE__ */ React.createElement(
    "div",
    {
      style: {
        display: "flex",
        gap: "8px",
        flexWrap: "wrap",
        maxWidth: "100%"
      }
    },
    AllAllowedCommands.map((command) => /* @__PURE__ */ React.createElement(
      Button3,
      {
        key: command,
        color: selectedCommands.includes(command) ? Button3.Colors.GREEN : Button3.Colors.RED,
        onClick: () => {
          setSelectedCommands(
            (prev) => prev.includes(command) ? prev.filter((cmd) => cmd !== command) : [...prev, command]
          );
        },
        style: {
          flexShrink: 0,
          minWidth: "120px"
        }
      },
      AllowedCommands[command]
    ))
  )), /* @__PURE__ */ React.createElement(
    Button3,
    {
      onClick: () => addOwnership(newUserId, selectedCommands),
      color: Button3.Colors.GREEN,
      style: { padding: "10px" }
    },
    "Add Ownership"
  )), /* @__PURE__ */ React.createElement("ul", { style: { display: "flex", flexDirection: "column", gap: "10px" } }, Array.from(ownerships.entries()).map(([userId, commands]) => /* @__PURE__ */ React.createElement(
    OwnershipItem,
    {
      key: userId,
      userId,
      commands,
      onRemoveOwnership: removeOwnership,
      onChangePermissions: changePermissions
    }
  ))));
}

// plugins/DadscordCustomVCs/modal/ModalRoot.tsx
var { Button: Button4 } = BdApi.Components;
function ModalRoot() {
  const [selectedTab, setSelectedTab] = React.useState("autobans");
  const PageMapping = {
    "autobans": AutoBanModal,
    "name": NameFilterModal,
    "ownership": SharedCallOwnershipModal
  };
  const InnerPage = PageMapping[selectedTab];
  const handleButtonClick = (tab) => {
    setSelectedTab(tab);
  };
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
    Flex_default,
    {
      direction: Flex_default.Direction.VERTICAL,
      justify: Flex_default.Justify.BETWEEN
    },
    /* @__PURE__ */ React.createElement("ul", { style: { display: "flex", flexDirection: "row", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(
      Button4,
      {
        color: selectedTab === "autobans" ? Button4.Colors.BRAND : Button4.Colors.TRANSPARENT,
        onClick: () => handleButtonClick("autobans"),
        style: {
          padding: "8px 16px",
          borderRadius: "8px",
          transition: "all 0.3s ease",
          fontWeight: selectedTab === "autobans" ? "bold" : "normal",
          backgroundColor: selectedTab === "autobans" ? "#7289da" : "transparent",
          color: selectedTab === "autobans" ? "white" : "#b9bbbe"
        }
      },
      "Auto Bans"
    )), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(
      Button4,
      {
        color: selectedTab === "name" ? Button4.Colors.BRAND : Button4.Colors.TRANSPARENT,
        onClick: () => handleButtonClick("name"),
        style: {
          padding: "8px 16px",
          borderRadius: "8px",
          transition: "all 0.3s ease",
          fontWeight: selectedTab === "name" ? "bold" : "normal",
          backgroundColor: selectedTab === "name" ? "#7289da" : "transparent",
          color: selectedTab === "name" ? "white" : "#b9bbbe"
        }
      },
      "Name Filtering"
    )), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(
      Button4,
      {
        color: selectedTab === "ownership" ? Button4.Colors.BRAND : Button4.Colors.TRANSPARENT,
        onClick: () => handleButtonClick("ownership"),
        style: {
          padding: "8px 16px",
          borderRadius: "8px",
          transition: "all 0.3s ease",
          fontWeight: selectedTab === "ownership" ? "bold" : "normal",
          backgroundColor: selectedTab === "ownership" ? "#7289da" : "transparent",
          color: selectedTab === "ownership" ? "white" : "#b9bbbe"
        }
      },
      "Shared Call Ownership"
    )))
  ), /* @__PURE__ */ React.createElement(InnerPage, null));
}

// plugins/DadscordCustomVCs/modal/index.tsx
function openManagementModal() {
  BdApi.UI.showConfirmationModal(
    "ace luvs u",
    /* @__PURE__ */ React.createElement(ModalRoot, null),
    {
      cancelText: "",
      confirmText: "Close",
      danger: true
    }
  );
}

// plugins/DadscordCustomVCs/Settings.tsx
var { Text: Text4, SwitchInput, Button: Button5, SettingItem: SettingItem2 } = BdApi.Components;
function Switch(args) {
  return /* @__PURE__ */ React.createElement(SettingItem2, { inline: true, id: "kys-zere", note: args.note, name: args.title }, /* @__PURE__ */ React.createElement(SwitchInput, { ...args }));
}
function Settings() {
  const [settings, setSettings] = React.useState({
    showVoiceOwnerIcon: DefaultSettings.showVoiceOwnerIcon,
    autoClaimVoiceChat: DefaultSettings.autoClaimVoiceChat,
    persistantSharedCallOwnership: DefaultSettings.persistantSharedCallOwnership,
    autoBanUserIds: DefaultSettings.autoBanUserIds,
    nameFiltering: DefaultSettings.nameFiltering,
    showNotificationsFor: DefaultSettings.showNotificationsFor
  });
  React.useEffect(() => {
    DadscordAutoBans.settings = settings;
    BdApi.Data.save(config_default.name, "config", settings);
  }, [settings]);
  const handleSwitchChange = (key) => (value) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value
    }));
  };
  function toTitleCase(str) {
    return str.split("_").map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(" ");
  }
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Text4, { style: { marginBottom: "15px" }, strong: true, size: Text4.Sizes.SIZE_20, tag: "h2" }, "NOTIFICATION SETTINGS"), Object.keys(NotificationEvents).filter((key) => isNaN(Number(key))).map((ne) => /* @__PURE__ */ React.createElement(
    Switch,
    {
      id: "kys-zere",
      key: ne,
      title: toTitleCase(ne),
      value: settings.showNotificationsFor.includes(NotificationEvents[ne]),
      onChange: (e) => {
        const updatedNotifications = [...settings.showNotificationsFor];
        const notificationValue = NotificationEvents[ne];
        if (e) {
          updatedNotifications.push(notificationValue);
        } else {
          const idx = updatedNotifications.findIndex((item) => item === notificationValue);
          if (idx !== -1) {
            updatedNotifications.splice(idx, 1);
          }
        }
        setSettings((prevSettings) => ({
          ...prevSettings,
          showNotificationsFor: updatedNotifications
        }));
      }
    }
  )), /* @__PURE__ */ React.createElement(Text4, { style: { marginBottom: "15px" }, strong: true, size: Text4.Sizes.SIZE_20, tag: "h2" }, "VOICE CHAT SETTINGS"), /* @__PURE__ */ React.createElement(
    Switch,
    {
      title: "Autoclaim Voice Chat",
      note: "Automatically claim the voice chat you are in when the original owner leaves.",
      id: "autoclaim",
      value: settings.autoClaimVoiceChat,
      onChange: handleSwitchChange("autoClaimVoiceChat")
    }
  ), /* @__PURE__ */ React.createElement(
    Switch,
    {
      title: "Show Voice Owner Icon",
      note: "Show an icon next to who owns any custom voice chat.",
      id: "show-voice-owner",
      value: settings.autoClaimVoiceChat,
      onChange: handleSwitchChange("showVoiceOwnerIcon")
    }
  ), /* @__PURE__ */ React.createElement(Text4, { style: { marginBottom: "15px" }, strong: true, size: Text4.Sizes.SIZE_20, tag: "h2" }, "OPEN MODALS"), /* @__PURE__ */ React.createElement(Button5, { onClick: openManagementModal }, "Open extended settings modal"));
}

// lib/modules/Dispatcher.ts
var Dispatcher_default = /* @__PURE__ */ BdApi.Webpack.getByKeys("dispatch", "subscribe", "register", { searchExports: true });

// lib/stores/ChannelStore.ts
var ChannelStore_default = BdApi.Webpack.getStore("ChannelStore");

// lib/stores/VoiceStateStore.ts
var VoiceStateStore_default = BdApi.Webpack.getByKeys("getVoiceStateForUser");

// plugins/DadscordCustomVCs/voiceController.ts
var DADSCORD_BOT_APPLICATION_ID = "1246440874955771904";
var sendButtonReply = BdApi.Webpack.getByStrings(
  "INTERACTIONS",
  "unarchiveThreadIfNecessary",
  { searchExports: true }
);
var voiceControllers = /* @__PURE__ */ new Map();
var getVoiceController = (channelId) => voiceControllers.get(channelId);
var newVoiceController = (m) => {
  logger.log("new voice controller for message", m);
  const v = new VoiceController(m);
  voiceControllers.set(m.channel_id, v);
  return v;
};
var VoiceController = class {
  constructor(message) {
    this.buttonsById = /* @__PURE__ */ new Map();
    this.message = message;
    for (const outterComponent of message.components) {
      if (outterComponent.type !== 1) {
        continue;
      }
      for (const button of outterComponent.components) {
        const buttonIdSplit = button.custom_id.split(":");
        this.buttonsById.set(
          buttonIdSplit[2],
          {
            ...button,
            parent: outterComponent
          }
        );
      }
    }
  }
  getComponentId(comp) {
    return `${comp.parent.id},${comp.id}`;
  }
  async hide() {
    const btn = this.buttonsById.get("hide");
    const id = this.getComponentId(btn);
    sendButtonReply({
      applicationId: DADSCORD_BOT_APPLICATION_ID,
      channelId: this.message.channel_id,
      messageId: this.message.id,
      messageFlags: this.message.flags,
      componentType: 2,
      componentId: id,
      customId: btn.custom_id,
      guildId: ChannelStore_default.getChannel(this.message.channel_id).guild_id,
      localState: void 0
    });
  }
  async unhide() {
    const btn = this.buttonsById.get("reveal");
    const id = this.getComponentId(btn);
    sendButtonReply({
      applicationId: DADSCORD_BOT_APPLICATION_ID,
      channelId: this.message.channel_id,
      messageId: this.message.id,
      messageFlags: this.message.flags,
      componentType: 2,
      componentId: id,
      customId: btn.custom_id,
      guildId: ChannelStore_default.getChannel(this.message.channel_id).guild_id,
      localState: void 0
    });
  }
  async lock() {
    const btn = this.buttonsById.get("lock");
    const id = this.getComponentId(btn);
    sendButtonReply({
      applicationId: DADSCORD_BOT_APPLICATION_ID,
      channelId: this.message.channel_id,
      messageId: this.message.id,
      messageFlags: this.message.flags,
      componentType: 2,
      componentId: id,
      customId: btn.custom_id,
      guildId: ChannelStore_default.getChannel(this.message.channel_id).guild_id,
      localState: void 0
    });
  }
  async unlock() {
    const btn = this.buttonsById.get("unlock");
    const id = this.getComponentId(btn);
    sendButtonReply({
      applicationId: DADSCORD_BOT_APPLICATION_ID,
      channelId: this.message.channel_id,
      messageId: this.message.id,
      messageFlags: this.message.flags,
      componentType: 2,
      componentId: id,
      customId: btn.custom_id,
      guildId: ChannelStore_default.getChannel(this.message.channel_id).guild_id,
      localState: void 0
    });
  }
  async userSelectMenuBullshit(action, mention) {
    logger.log(action, mention);
    const match = mention.match(/(?:<@!?(\d+)>|(\d+))/);
    logger.log(`${action} match`, match);
    if (!match) return logger.warn("Invalid user mention");
    const targetUserId = match[0];
    logger.log(`${action} target user id`, targetUserId);
    const btn = this.buttonsById.get(action);
    logger.log(`${action} btn`, btn);
    if (!btn) return;
    const componentId = this.getComponentId(btn);
    const gid = ChannelStore_default.getChannel(this.message.channel_id).guild_id;
    const selectMenuPromise = new Promise((resolve) => {
      const timeoutId = setTimeout(() => {
        logger.log(`${action} select timeout`);
        pendingBanSelects.delete(this.message.channel_id);
        resolve(null);
      }, 1e4);
      pendingBanSelects.set(this.message.channel_id, { resolve, timeoutId });
    });
    sendButtonReply({
      applicationId: DADSCORD_BOT_APPLICATION_ID,
      channelId: this.message.channel_id,
      messageId: this.message.id,
      messageFlags: this.message.flags,
      componentType: 2,
      // button
      componentId,
      customId: btn.custom_id,
      guildId: gid,
      localState: void 0
    });
    logger.log(`${action} select menu message waiting`);
    const selectMenuMessage = await selectMenuPromise;
    logger.log("continuing", selectMenuMessage);
    if (!selectMenuMessage) {
      BdApi.UI.showToast(`Failed to get ${action} select menu`, { type: "error" });
      logger.error(`${action} select menu message not found`);
      return;
    }
    const selectMenu = selectMenuMessage.components?.[0]?.components?.[0];
    if (!selectMenu) {
      BdApi.UI.showToast(`No select menu component found for ${action}`, { type: "error" });
      logger.error(`No select menu component found for ${action}`);
      return;
    }
    logger.log(`${action} select menu`, selectMenu);
    let userFound = false;
    for (const opt of selectMenu.options) {
      if (opt.value === targetUserId) {
        userFound = true;
        break;
      }
    }
    if (!userFound) {
      logger.log(`${action} not a valid user id for menu`, selectMenu);
      return;
    }
    sendButtonReply({
      applicationId: DADSCORD_BOT_APPLICATION_ID,
      channelId: selectMenuMessage.channel_id,
      messageId: selectMenuMessage.id,
      messageFlags: selectMenuMessage.flags,
      componentType: 3,
      componentId: selectMenu.id,
      customId: selectMenu.custom_id,
      guildId: gid,
      localState: {
        type: 3,
        values: [
          targetUserId
        ]
      }
    });
    logger.log(`${action} submitted for`, targetUserId);
  }
  async ban(mention) {
    return this.userSelectMenuBullshit("ban", mention);
  }
  async unban(mention) {
    return this.userSelectMenuBullshit("unban", mention);
  }
  async kick(mention) {
    return this.userSelectMenuBullshit("kick", mention);
  }
};

// plugins/DadscordCustomVCs/events/messageCreate.ts
var DADSCORD_VC_BOT_ID = "1246440874955771904";
var pendingBanSelects = /* @__PURE__ */ new Map();
var onMessageCreate = (e) => {
  if (e.guildId !== DADSCORD_GUILD_ID && e.guildId !== void 0) return;
  if (!VoiceStateStore_default.isInChannel(e.channelId)) return;
  const channel = ChannelStore_default.getChannel(e.channelId);
  const authorId = e.message.author.id;
  const weOwnVC = ownsVoiceChat(
    UserStore_default.getCurrentUser().id,
    channel.permissionOverwrites_
  );
  if (!weOwnVC) return;
  logger.log(`got message with contents`, e.message.content);
  if (e.message.content.includes("Select a member")) {
    logger.log(`Recieved select menu`, e.message);
    const pending = pendingBanSelects.get(e.channelId);
    clearTimeout(pending?.timeoutId);
    pendingBanSelects.delete(e.channelId);
    pending?.resolve(e.message);
    return;
  }
  if (e.message.author.bot) {
    if (authorId !== DADSCORD_VC_BOT_ID) return;
    if (!e.message.content.includes("Controller for")) return;
    handleSettingBotControllerMessage(e, channel);
    return;
  }
  handleSharedOwnershipMessage(e, channel);
};
function handleSettingBotControllerMessage(e, _channel) {
  BdApi.UI.showToast("New Voice Controller", { type: "success" });
  newVoiceController(e.message);
  return;
}
function handleSharedOwnershipMessage(e, _channel) {
  const voiceController = getVoiceController(e.message.channel_id);
  if (!voiceController) {
    BdApi.UI.showToast("No voice controller found", { type: "error" });
    return;
  }
  const splitCommand = e.message.content.split(" ");
  const commandBase = splitCommand[0];
  const commandArgs = splitCommand.splice(1, splitCommand.length);
  const userPermissions = DadscordAutoBans.settings.persistantSharedCallOwnership.get(e.message.author.id);
  switch (commandBase) {
    case ".ban":
    case ".b":
    case "!voice-ban": {
      if (!userPermissions?.includes(0 /* BAN */)) return;
      void voiceController.ban(commandArgs[0]);
      break;
    }
    case ".kick":
    case "!voice-kick": {
      if (!userPermissions?.includes(2 /* KICK */)) return;
      void voiceController.kick(commandArgs[0]);
      break;
    }
    case ".unban":
    case ".unb":
    case "!voice-unban": {
      if (!userPermissions?.includes(1 /* UNBAN */)) return;
      void voiceController.unban(commandArgs[0]);
      break;
    }
    case ".lock":
    case ".l":
    case "!voice-lock": {
      if (!userPermissions?.includes(3 /* LOCK */)) return;
      void voiceController.lock();
      break;
    }
    case ".unlock":
    case ".ul":
    case "!voice-unlock": {
      if (!userPermissions?.includes(4 /* UNLOCK */)) return;
      void voiceController.unlock();
      break;
    }
    case ".hide":
    case ".h":
    case "!voice-hide": {
      if (!userPermissions?.includes(5 /* HIDE */)) return;
      void voiceController.hide();
      break;
    }
    case ".unhide":
    case ".unh":
    case "!voice-unhide":
    case "!voice-show": {
      if (!userPermissions?.includes(5 /* HIDE */)) return;
      void voiceController.unhide();
      break;
    }
  }
  return;
}

// lib/stores/GuildMemberStore.ts
var GuildMemberStore_default = BdApi.Webpack.getStore("GuildMemberStore");

// plugins/DadscordCustomVCs/messageWrapper.ts
var MessageUtils = BdApi.Webpack.getByKeys("sendMessage");
var claimVoiceChannel = (id) => MessageUtils.sendMessage(
  id,
  { content: "!voice-claim" },
  true,
  {}
);

// plugins/DadscordCustomVCs/events/voiceStateUpdate.ts
function onVoiceStateUpdate(event) {
  if (event.type !== "VOICE_STATE_UPDATES") return;
  for (const voiceState of event.voiceStates) {
    handleVoiceStateUpdate(voiceState);
  }
}
function handleVoiceStateUpdate(vs) {
  const ourId = UserStore_default.getCurrentUser().id;
  if (ourId === vs.userId) return;
  if (vs.channelId === null) {
    if (!DadscordAutoBans.settings.autoClaimVoiceChat) return;
    const oldChannel = ChannelStore_default.getChannel(vs.oldChannelId);
    if (!oldChannel) return;
    if (oldChannel?.guild_id !== DADSCORD_GUILD_ID) return;
    if (!VoiceStateStore_default.isInChannel(vs.oldChannelId)) return;
    if (!ownsVoiceChat(vs.userId, oldChannel.permissionOverwrites_)) return;
    logger.log("claiming voice channel", vs.oldChannelId, oldChannel.name, "from user", vs.userId);
    claimVoiceChannel(vs.oldChannelId);
    if (DadscordAutoBans.settings.showNotificationsFor.includes(0 /* VOICE_AUTOCLAIM */)) {
      BdApi.UI.showToast("Automatically claimed voice chat.", { type: "success" });
    }
  }
  if (vs.channelId !== null) {
    if (!VoiceStateStore_default.isInChannel(vs.channelId)) return;
    const channel = ChannelStore_default.getChannel(vs.channelId);
    if (!ownsVoiceChat(ourId, channel?.permissionOverwrites_)) return;
    const isAutobannedFromUserId = DadscordAutoBans.settings.autoBanUserIds.has(vs.userId);
    let isFilteredName = false;
    const user = UserStore_default.getUser(vs.userId);
    if (!isAutobannedFromUserId) {
      const guildMember = GuildMemberStore_default.getMember(channel.guild_id, vs.userId);
      const usernames = [
        user.username,
        user.globalName,
        guildMember?.nick
      ];
      for (const filterName of DadscordAutoBans.settings.nameFiltering) {
        let regex = null;
        if (filterName.startsWith("/") && filterName.endsWith("/")) {
          logger.log("debug: making regex");
          try {
            regex = new RegExp(filterName.slice(1, -1));
          } catch (e) {
            logger.error("Invalid regex in name filtering:", filterName);
            continue;
          }
        }
        for (const username of usernames) {
          if (!username) continue;
          logger.log("debug: looking at " + username + " | filter | " + filterName);
          if (regex) {
            if (regex.test(username)) {
              logger.log("debug: regex matched");
              isFilteredName = true;
              break;
            }
          } else {
            if (username.toLowerCase().includes(filterName.toLowerCase())) {
              logger.log("debug: str includes match");
              isFilteredName = true;
              break;
            }
          }
        }
        logger.log("debug: break end");
        if (isFilteredName) break;
      }
    }
    if (!isFilteredName && !isAutobannedFromUserId) return;
    const vc = getVoiceController(vs.channelId);
    if (!vc) {
      if (DadscordAutoBans.settings.showNotificationsFor.includes(2 /* FAILED_TO_FIND_VOICE_CONTROLLER */)) {
        BdApi.UI.showToast("Failed to find voice controller to autoban.", { type: "error" });
      }
      return;
    }
    vc.ban(vs.userId);
    if (isFilteredName && DadscordAutoBans.settings.showNotificationsFor.includes(3 /* AUTOBAN_NAME_FILTERING_SUCCESS */)) {
      BdApi.UI.showToast(`Autobanned ${user.username} due to name`, { type: "success" });
      return;
    }
    if (isAutobannedFromUserId && DadscordAutoBans.settings.showNotificationsFor.includes(4 /* AUTOBAN_ID_BLACKLIST_SUCCESS */)) {
      BdApi.UI.showToast(`Autobanned ${user.username} due to user id`, { type: "success" });
    }
  }
}

// plugins/DadscordCustomVCs/patches/patchUserContext.tsx
var { Item } = BdApi.ContextMenu;
function PatchUserContext() {
  logger.log("Patched UserContext");
  return BdApi.ContextMenu.patch("user-context", (res, props) => {
    const isAutobanned = DadscordAutoBans.settings.autoBanUserIds.has(props.user.id);
    const isSharedOwnership = DadscordAutoBans.settings.persistantSharedCallOwnership.has(props.user.id);
    res.props.children.push(
      /* @__PURE__ */ React.createElement(Item, { label: "Custom VC Utils", id: `dadscord-vc-${props.user.id}` }, /* @__PURE__ */ React.createElement(
        Item,
        {
          label: isAutobanned ? "Stop Autobanning" : "Autoban",
          id: `dadscord-vc-autoban-${props.user.id}`,
          action: () => {
            logger.log(`${isAutobanned ? "Un autobanning" : "Autobanning"}`, props.user.id);
            if (isAutobanned) {
              if (DadscordAutoBans.settings.showNotificationsFor.includes(6 /* CONTEXT_MENU_REMOVED_FROM_AUTOBANS */)) {
                BdApi.UI.showToast("Removed " + props.user.username + " from autobans.");
              }
              DadscordAutoBans.settings.autoBanUserIds.delete(props.user.id);
            } else {
              if (DadscordAutoBans.settings.showNotificationsFor.includes(5 /* CONTEXT_MENU_ADDED_TO_AUTOBANS */)) {
                BdApi.UI.showToast("Added " + props.user.username + " to autobans.");
              }
              DadscordAutoBans.settings.autoBanUserIds.set(props.user.id, {
                timestamp: /* @__PURE__ */ new Date(),
                reason: null
              });
            }
          }
        }
      ), /* @__PURE__ */ React.createElement(
        Item,
        {
          label: isSharedOwnership ? "Remove shared ownership" : "Add shared ownership",
          id: `dadscord-vc-sharedownership-${props.user.id}`,
          action: () => {
            logger.log(`${isSharedOwnership ? "Removing" : "Giving"} shared call ownership to`, props.user.id);
            if (isAutobanned) {
              if (DadscordAutoBans.settings.showNotificationsFor.includes(8 /* CONTEXT_MENU_REMOVE_FULL_SHARED_OWNERSHIP */)) {
                BdApi.UI.showToast("REmoved " + props.user.username + "'s shared call ownership.");
              }
              DadscordAutoBans.settings.persistantSharedCallOwnership.delete(props.user.id);
            } else {
              if (DadscordAutoBans.settings.showNotificationsFor.includes(7 /* CONTEXT_MENU_GIVE_FULL_SHARED_OWNERSHIP */)) {
                BdApi.UI.showToast("Gave " + props.user.username + " full shared call ownership.");
              }
              DadscordAutoBans.settings.persistantSharedCallOwnership.set(props.user.id, AllAllowedCommands);
            }
          }
        }
      ), /* @__PURE__ */ React.createElement(
        Item,
        {
          label: "Open Detailed Management Modal",
          id: `dadscord-vc-management-${props.user.id}`,
          action: () => {
            openManagementModal();
          }
        }
      ))
    );
  });
}

// plugins/DadscordCustomVCs/index.ts
var DADSCORD_GUILD_ID = "319560327719026709";
var DADSCORD_OWNERSHIP_PERMISSION_BITFIELD = 3146752n;
var ownsVoiceChat = (userId, permissionOverwrites) => permissionOverwrites?.[userId]?.allow === DADSCORD_OWNERSHIP_PERMISSION_BITFIELD;
var NotificationEvents = /* @__PURE__ */ ((NotificationEvents2) => {
  NotificationEvents2[NotificationEvents2["VOICE_AUTOCLAIM"] = 0] = "VOICE_AUTOCLAIM";
  NotificationEvents2[NotificationEvents2["NEW_VOICE_CONTROLLER"] = 1] = "NEW_VOICE_CONTROLLER";
  NotificationEvents2[NotificationEvents2["FAILED_TO_FIND_VOICE_CONTROLLER"] = 2] = "FAILED_TO_FIND_VOICE_CONTROLLER";
  NotificationEvents2[NotificationEvents2["AUTOBAN_NAME_FILTERING_SUCCESS"] = 3] = "AUTOBAN_NAME_FILTERING_SUCCESS";
  NotificationEvents2[NotificationEvents2["AUTOBAN_ID_BLACKLIST_SUCCESS"] = 4] = "AUTOBAN_ID_BLACKLIST_SUCCESS";
  NotificationEvents2[NotificationEvents2["CONTEXT_MENU_ADDED_TO_AUTOBANS"] = 5] = "CONTEXT_MENU_ADDED_TO_AUTOBANS";
  NotificationEvents2[NotificationEvents2["CONTEXT_MENU_REMOVED_FROM_AUTOBANS"] = 6] = "CONTEXT_MENU_REMOVED_FROM_AUTOBANS";
  NotificationEvents2[NotificationEvents2["CONTEXT_MENU_GIVE_FULL_SHARED_OWNERSHIP"] = 7] = "CONTEXT_MENU_GIVE_FULL_SHARED_OWNERSHIP";
  NotificationEvents2[NotificationEvents2["CONTEXT_MENU_REMOVE_FULL_SHARED_OWNERSHIP"] = 8] = "CONTEXT_MENU_REMOVE_FULL_SHARED_OWNERSHIP";
  return NotificationEvents2;
})(NotificationEvents || {});
var AllowedCommands = /* @__PURE__ */ ((AllowedCommands3) => {
  AllowedCommands3[AllowedCommands3["BAN"] = 0] = "BAN";
  AllowedCommands3[AllowedCommands3["UNBAN"] = 1] = "UNBAN";
  AllowedCommands3[AllowedCommands3["KICK"] = 2] = "KICK";
  AllowedCommands3[AllowedCommands3["LOCK"] = 3] = "LOCK";
  AllowedCommands3[AllowedCommands3["UNLOCK"] = 4] = "UNLOCK";
  AllowedCommands3[AllowedCommands3["HIDE"] = 5] = "HIDE";
  AllowedCommands3[AllowedCommands3["REVEAL"] = 6] = "REVEAL";
  return AllowedCommands3;
})(AllowedCommands || {});
var AllAllowedCommands = [
  0 /* BAN */,
  1 /* UNBAN */,
  2 /* KICK */,
  3 /* LOCK */,
  4 /* UNLOCK */,
  5 /* HIDE */,
  6 /* REVEAL */
];
var DefaultSettings = {
  showVoiceOwnerIcon: true,
  autoClaimVoiceChat: true,
  persistantSharedCallOwnership: /* @__PURE__ */ new Map(),
  autoBanUserIds: /* @__PURE__ */ new Map(),
  // regex based name filtering
  // /thing/ = regex
  // thing = string contains
  nameFiltering: /* @__PURE__ */ new Set(),
  // list of places to show notifications for
  showNotificationsFor: []
};
var logger = new Logger(config_default);
var DadscordAutoBans = class _DadscordAutoBans {
  static {
    this.settings = DefaultSettings;
  }
  start() {
    logger.log("loading settings");
    const loadedSettings = BdApi.Data.load(config_default.name, "settings") ?? {};
    _DadscordAutoBans.settings = {
      ...DefaultSettings,
      ...loadedSettings,
      autoBanUserIds: new Map(
        Object.entries(loadedSettings.autoBanUserIds ?? {}).map(
          ([id, ctx]) => [
            id,
            { ...ctx, timestamp: new Date(ctx.timestamp) }
          ]
        )
      ),
      persistantSharedCallOwnership: new Map(
        Object.entries(loadedSettings.persistantSharedCallOwnership ?? {})
      ),
      nameFiltering: new Set(loadedSettings.nameFiltering ?? [])
    };
    _DadscordAutoBans.userContextCancel = PatchUserContext();
    Dispatcher_default.subscribe("MESSAGE_CREATE", onMessageCreate);
    Dispatcher_default.subscribe("VOICE_STATE_UPDATES", onVoiceStateUpdate);
  }
  stop() {
    logger.log("saving settings");
    BdApi.Data.save(config_default.name, "settings", {
      ..._DadscordAutoBans.settings,
      autoBanUserIds: Object.fromEntries(_DadscordAutoBans.settings.autoBanUserIds),
      persistantSharedCallOwnership: Object.fromEntries(_DadscordAutoBans.settings.persistantSharedCallOwnership),
      nameFiltering: [..._DadscordAutoBans.settings.nameFiltering]
    });
    _DadscordAutoBans.userContextCancel();
    Dispatcher_default.unsubscribe("MESSAGE_CREATE", onMessageCreate);
    Dispatcher_default.unsubscribe("VOICE_STATE_UPDATES", onVoiceStateUpdate);
  }
  getSettingsPanel() {
    return Settings;
  }
};
