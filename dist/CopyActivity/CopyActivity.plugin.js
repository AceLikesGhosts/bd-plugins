/**
* @name CopyActivity
* @description .
* @author ace.
* @version 1.0.2
* @source https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/CopyActivity/CopyActivity.plugin.js
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

// plugins/CopyActivity/index.ts
var index_exports = {};
__export(index_exports, {
  activelyStealActivitiesFrom: () => activelyStealActivitiesFrom,
  default: () => CopyActivity,
  logger: () => logger
});
module.exports = __toCommonJS(index_exports);

// lib/modules/UserActivity.ts
var ActivityType = {
  Playing: 0,
  Streaming: 1,
  Listening: 2,
  Watching: 3,
  Competing: 5
};

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

// plugins/CopyActivity/config.json
var config_default = {
  $schema: "../../config_schema.jsonc",
  name: "CopyActivity",
  description: ".",
  author: "ace.",
  version: "1.0.2",
  source: "https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/CopyActivity/CopyActivity.plugin.js",
  authorLink: "https://github.com/AceLikesGhosts/bd-plugins",
  authorId: "327639826075484162"
};

// lib/components/index.ts
var React = BdApi.React;

// lib/stores/UserStore.ts
var UserStore_default = /* @__PURE__ */ BdApi.Webpack.getStore("UserStore");

// lib/stores/StoreUtils.ts
var StoreUtils_default = /* @__PURE__ */ BdApi.Webpack.getByStrings("useStateFromStores", { searchExports: true });

// lib/stores/PresenceStore.ts
var PresenceStore_default = /* @__PURE__ */ BdApi.Webpack.getStore("PresenceStore");

// lib/common/Lodash.ts
var Lodash_default = /* @__PURE__ */ BdApi.Webpack.getByKeys("debounce");

// lib/modules/Dispatcher.ts
var Dispatcher_default = /* @__PURE__ */ BdApi.Webpack.getByKeys("dispatch", "subscribe", "register");

// plugins/CopyActivity/util.ts
function applyActivity(activity) {
  void Dispatcher_default.dispatch({
    type: "LOCAL_ACTIVITY_UPDATE",
    activity: {
      ...activity
    },
    socketId: "crpc".concat(btoa(JSON.stringify(activity)).substr(0, 20))
  });
}
function removeActivity(activity) {
  void Dispatcher_default.dispatch({
    type: "LOCAL_ACTIVITY_UPDATE",
    activity: {},
    socketId: "crpc".concat(btoa(JSON.stringify(activity)).substr(0, 20))
  });
}

// plugins/CopyActivity/PatchContext.tsx
var { Item } = BdApi.ContextMenu;
function PatchUserContext() {
  logger.log("Patched UserContext");
  return BdApi.ContextMenu.patch("user-context", (res, props) => {
    const activities = StoreUtils_default([PresenceStore_default], () => PresenceStore_default.getActivities(props.user.id));
    if (props.user.id === UserStore_default.getCurrentUser().id) {
      res.props.children.push(
        /* @__PURE__ */ React.createElement(Item, { label: "Activity Utilities", id: `local-copy-activity-${props.user.id}` }, /* @__PURE__ */ React.createElement(
          Item,
          {
            label: "Presences",
            id: `select-presence-${props.user.id}`,
            disabled: Boolean(activities.length === 0)
          },
          !!activities.length && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Item, { label: "Click to remove...", id: `second-very-cool-label-name-${props.user.id}` }), /* @__PURE__ */ React.createElement(BdApi.ContextMenu.Separator, null), activities.map((activity, i) => activity.name !== "Custom Status" && /* @__PURE__ */ React.createElement(
            Item,
            {
              key: String(i),
              id: `activity-stealing-${String(i)}`,
              label: `${Lodash_default.findKey(ActivityType, (v) => v === activity.type)} ${activity.name}`,
              action: () => {
                logger.log(`Removing activity ${activity.name}`, i, activity);
                void removeActivity(activity);
              }
            }
          )))
        ), /* @__PURE__ */ React.createElement(
          Item,
          {
            label: "Monitor Stealing",
            id: `monitor-stealing-presences-${props.user.id}`,
            disabled: Boolean(activelyStealActivitiesFrom.size === 0)
          },
          !!activelyStealActivitiesFrom.size && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Item, { label: "Click to remove...", id: `very-cool-label-name-${props.user.id}` }), /* @__PURE__ */ React.createElement(BdApi.ContextMenu.Separator, null), [...activelyStealActivitiesFrom].map((id) => /* @__PURE__ */ React.createElement(
            Item,
            {
              label: `${UserStore_default.getUser(id).username} (${id})`,
              id: `stop-stealing-actiivties-${id}`,
              action: () => {
                logger.log(`Stopping monitor stealing of ${props.user.id}'s activities (context click)`);
                activelyStealActivitiesFrom.delete(id);
              }
            }
          )))
        ))
      );
      return;
    }
    res.props.children.push(
      /* @__PURE__ */ React.createElement(Item, { label: "Activity Utilities", id: `copy-activity-${props.user.id}` }, /* @__PURE__ */ React.createElement(
        Item,
        {
          label: "Presences",
          id: `select-presence-${props.user.id}`
        },
        activities.map((activity, i) => activity.name !== "Custom Status" && /* @__PURE__ */ React.createElement(
          Item,
          {
            key: String(i),
            id: `activity-stealing-${String(i)}`,
            disabled: activity.type === ActivityType.Listening && activity.name === "Spotify",
            label: `${Lodash_default.findKey(ActivityType, (v) => v === activity.type)} ${activity.name}`,
            action: () => {
              logger.log(`Applying activity ${activity.name}`, i, activity);
              void applyActivity(activity);
            }
          }
        ))
      ), /* @__PURE__ */ React.createElement(
        Item,
        {
          label: "Take All Activities",
          id: `take-activities-${props.user.id}`,
          action: () => {
            logger.log(`Taking ${props.user.id}'s activities (context click)`);
            const activities2 = PresenceStore_default.getActivities(props.user.id);
            if (activities2 === null) {
              logger.log(`No activities to steal from ${props.user.id}`);
              return;
            }
            for (let i = 0; i < activities2.length; i++) {
              const activity = activities2[i];
              if (activity.type === ActivityType.Listening && activity.name === "Spotify") continue;
              void applyActivity(activity);
            }
          }
        }
      ), activelyStealActivitiesFrom.has(props.user.id) ? /* @__PURE__ */ React.createElement(
        Item,
        {
          label: "Stop Stealing Activities (monitoring)",
          id: `stop-stealing-activities-${props.user.id}`,
          action: () => {
            logger.log(`Stopping monitor stealing of ${props.user.id}'s activities (context click)`);
            activelyStealActivitiesFrom.delete(props.user.id);
          }
        }
      ) : /* @__PURE__ */ React.createElement(
        Item,
        {
          label: "Steal Activities (monitoring)",
          id: `steal-activities-${props.user.id}`,
          action: () => {
            logger.log(`Monitor stealing ${props.user.id}'s activities (context click)`);
            activelyStealActivitiesFrom.add(props.user.id);
          }
        }
      ))
    );
  });
}

// plugins/CopyActivity/index.ts
var logger = new Logger(config_default);
var activelyStealActivitiesFrom = /* @__PURE__ */ new Set();
function handlePresenceUpdate(e) {
  if (e.type !== "PRESENCE_UPDATES") return;
  for (let i = 0; i < e.updates.length; i++) {
    const update = e.updates[i];
    if (!activelyStealActivitiesFrom.has(update.user.id)) continue;
    update.activities.forEach((activity) => {
      if (activity.type === ActivityType.Listening && activity.name === "Spotify" || activity.name === "Custom Status") return;
      logger.log(`Stealing activity from ${update.user.username} (${update.user.id})`, activity);
      void applyActivity(activity);
    });
  }
}
var CopyActivity = class {
  constructor() {
    this.cancel = null;
  }
  start() {
    logger.log("started");
    logger.log("patched user context");
    this.cancel = PatchUserContext();
    Dispatcher_default.subscribe("PRESENCE_UPDATES", handlePresenceUpdate);
  }
  stop() {
    logger.log("stopped");
    logger.log("unsubscribed from PRESENCE_UPDATES");
    Dispatcher_default.unsubscribe("PRESENCE_UPDATES", handlePresenceUpdate);
    logger.log("cleared constant stealing ids");
    activelyStealActivitiesFrom.clear();
    logger.log("unpatched user context");
    this.cancel();
  }
};
