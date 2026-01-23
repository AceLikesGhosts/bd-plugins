/**
* @name ARestoreBlockedUserList
* @description Adds back the section to view blocked users into your friends list area.
* @author ace.
* @version 1.0.0
* @source https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/ABlockedUserList/ABlockedUserList.plugin.js
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

// plugins/ARestoreBlockedUserList/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => ARestoreBlockedUserList,
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

// plugins/ARestoreBlockedUserList/config.json
var config_default = {
  $schema: "../../config_schema.jsonc",
  name: "ARestoreBlockedUserList",
  description: "Adds back the section to view blocked users into your friends list area.",
  author: "ace.",
  version: "1.0.0",
  source: "https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/ABlockedUserList/ABlockedUserList.plugin.js",
  authorLink: "https://github.com/AceLikesGhosts/bd-plugins",
  authorId: "327639826075484162"
};

// lib/components/index.ts
var React = BdApi.React;
var ReactDom = BdApi.ReactDOM || BdApi.Webpack.getByKeys("createRoot");

// lib/modules/Dispatcher.ts
var Dispatcher_default = /* @__PURE__ */ BdApi.Webpack.getByKeys("dispatch", "subscribe", "register", { searchExports: true });

// plugins/ARestoreBlockedUserList/patches/friendsTabList.tsx
var patchFriendsTabList = () => {
  const friendsTablistItem = BdApi.Webpack.getModule(
    (m) => Object.keys(m).includes("Item") && !m.SearchBar,
    { searchExports: true }
  );
  const TablistItem = friendsTablistItem.Item;
  BdApi.Patcher.after(
    config_default.name,
    friendsTablistItem.prototype,
    "render",
    (_, __, ret) => {
      if (!ret || !ret.props) return;
      if (ret.props["aria-label"] !== "Friends") return;
      if (!Array.isArray(ret.props.children)) return;
      const pendingPos = ret.props.children.findIndex((value) => value.props && value.props.id === "PENDING");
      ret.props.children.splice(
        pendingPos + 1,
        0,
        /* @__PURE__ */ React.createElement(
          TablistItem,
          {
            ...ret.props.children[0].props,
            "aria-label": "Blocked",
            key: ".$BLOCKED",
            id: "BLOCKED",
            onItemSelect: (e) => {
              Dispatcher_default.dispatch({
                type: "FRIENDS_SET_SECTION",
                section: e
              });
            }
          },
          "Blocked"
        )
      );
    }
  );
};

// lib/stores/FriendsStore.ts
var FriendsStore_default = BdApi.Webpack.getStore("FriendsStore");

// lib/stores/RelationshipStore.ts
var RelationshipStore_default = BdApi.Webpack.getStore("RelationshipStore");

// plugins/ARestoreBlockedUserList/patches/analyticProvider.tsx
var patchAnalyticsContext = () => {
  const analyticsContext = BdApi.Webpack.getByKeys("Pages", "Sections", "Objects", "ObjectTypes", "defaultProps", { searchExports: true });
  BdApi.Patcher.before(
    config_default.name,
    analyticsContext.prototype,
    "render",
    (ctx) => {
      if (!ctx || !ctx.props) return;
      if (!Array.isArray(ctx.props.children)) return;
      const blockedSection = ctx.props.children.find(
        (child) => child.props?.sectionFilter === "BLOCKED"
      );
      if (!blockedSection) return;
      const blockedUsersIds = RelationshipStore_default.getBlockedIDs();
      BdApi.Patcher.after(
        config_default.name,
        blockedSection.props,
        "renderSection",
        (_, __, ret) => {
          const blockedUserStr = `Blocked users \u2014 ${blockedUsersIds.length}`;
          ret.key = blockedUserStr;
          ret.props.children.props.title = blockedUserStr;
        }
      );
      blockedSection.props.rows = [
        FriendsStore_default.getState().rows._rows.filter(
          (user) => blockedUsersIds.includes(user.userId)
        )
      ];
    }
  );
};

// plugins/ARestoreBlockedUserList/index.ts
var logger = new Logger(config_default);
var ARestoreBlockedUserList = class {
  start() {
    logger.info("started");
    patchFriendsTabList();
    patchAnalyticsContext();
  }
  stop() {
    logger.info("unpatching");
    BdApi.Patcher.unpatchAll(config_default.name);
    logger.info("stopped");
  }
};
