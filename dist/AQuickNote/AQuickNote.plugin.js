/**
* @name AQuickNote
* @description Quickly add notes onto users by just accessing their profile.
* @author ace
* @version 1.1.1
* @source https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/AQuckNote/AQuckNote.plugin.js
* @authorLink https://github.com/AceLikesGhosts/bd-plugins
* @authorId 1297706747150209075
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

// plugins/AQuickNote/index.ts
var index_exports = {};
__export(index_exports, {
  DefaultSettings: () => DefaultSettings,
  default: () => AQuickNote,
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

// lib/components/index.ts
var Margins = /* @__PURE__ */ BdApi.Webpack.getByKeys("marginBottom40", "marginTop4");
var React = BdApi.React;
var ReactDom = BdApi.ReactDOM || BdApi.Webpack.getByKeys("createRoot");

// lib/components/Form.tsx
var FormTitle = BdApi.Webpack.getByStrings('["defaultMargin".concat', '="h5"', { searchExports: true });
var FormText = BdApi.Webpack.getByStrings(".SELECTABLE),", ".DISABLED:", { searchExports: true });
var FormSection = BdApi.Webpack.getBySource(".titleId)&&", { searchExports: true });
var FormSwitch = BdApi.Webpack.getByStrings(".labelRow", "useId", "DESCRIPTION", { searchExports: true });
var FormItem = BdApi.Webpack.getModule((x) => x.render.toString?.().includes(".fieldWrapper"), { searchExports: true });
var FormNotice = BdApi.Webpack.getByStrings(".Types.DANGER", ".formNotice", { searchExports: true });
var FormDivider = BdApi.Webpack.getBySource(".divider", ",style:", '"div"', "dividerDefault", { searchExports: true });

// lib/components/TextInput.tsx
var TextInput_default = BdApi.Webpack.getByStrings("showCharacterCountFullPadding", "showRemainingCharacterCount", { searchExports: true });

// plugins/AQuickNote/components/Settings.tsx
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
  const [noteString, setNoteString] = React.useState(AQuickNote.settings.noteString);
  React.useEffect(() => {
    AQuickNote.settings = {
      noteString
    };
  }, [noteString]);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(FormTitle, { tag: "h2" }, "Settings"), /* @__PURE__ */ React.createElement(
    TextInput,
    {
      title: "The note to apply to users who don't have a note.",
      value: noteString,
      onChange: (e) => setNoteString(e)
    }
  ));
}

// plugins/AQuickNote/config.json
var config_default = {
  $schema: "../../config_schema.jsonc",
  name: "AQuickNote",
  description: "Quickly add notes onto users by just accessing their profile.",
  author: "ace",
  version: "1.1.1",
  source: "https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/AQuckNote/AQuckNote.plugin.js",
  authorLink: "https://github.com/AceLikesGhosts/bd-plugins",
  authorId: "1297706747150209075"
};

// plugins/AQuickNote/utils.ts
function getNoteString() {
  const currentDate = /* @__PURE__ */ new Date();
  return AQuickNote.settings.noteString.replace("%current_date%", currentDate.toLocaleString());
}

// plugins/AQuickNote/patches/PatchUserPopout.tsx
var UpdateNote = BdApi.Webpack.getByKeys("updateNote");
var NoteStore = BdApi.Webpack.getByKeys("getNote");
var UserPopout = BdApi.Webpack.getBySource("Overlay:", "profileThemeStyle", "profileThemeClassName").Z;
var activelyUpdatingMap = /* @__PURE__ */ new Map();
function compareAndUpdateNote(userId) {
  logger.log("compareAndUpdateNote called");
  if (activelyUpdatingMap.get(userId)) {
    logger.error("currently updating this user's notes");
    return;
  }
  const note = NoteStore.getNote(userId);
  if (note.loading) {
    logger.error("note was still loading", note, userId);
    return;
  }
  if (note.note !== void 0) {
    logger.log("DEBUG - user already had a note");
    return;
  }
  activelyUpdatingMap.set(userId, true);
  console.log("updating note");
  UpdateNote.updateNote(
    userId,
    getNoteString()
  ).finally(() => activelyUpdatingMap.delete(userId));
}
var PatchUserPopout = () => {
  BdApi.Patcher.before(config_default.name, UserPopout, "render", (_, args) => {
    if (!args[0] || typeof args[0] !== "object") {
      logger.log("render called and args wasnt array", args);
      return;
    }
    if (args[0].profileType !== "FULL_SIZE") {
      logger.log("profile type was not FULL_SIZE", args);
    }
    if (!args[0].user || !args[0].user.id) {
      BdApi.UI.showToast("AQuickNote - Failed to locate user, please report.", { type: "danger" });
      logger.error("failed to locate user?", args, args[0].user);
      return;
    }
    logger.log("called debounce");
    compareAndUpdateNote(args[0].user.id);
  });
};

// plugins/AQuickNote/index.ts
var DefaultSettings = {
  noteString: "first opened at %current_date%"
};
var logger = new Logger(config_default);
var AQuickNote = class _AQuickNote {
  start() {
    logger.log("Loading settings.");
    const loadedSettings = BdApi.Data.load(config_default.name, "settings");
    _AQuickNote.settings = {
      ...DefaultSettings,
      ...loadedSettings
    };
    logger.log("Patching UserPopout");
    PatchUserPopout();
  }
  stop() {
    logger.log("Shutting down");
    logger.log("Unpatching");
    BdApi.Patcher.unpatchAll(config_default.name);
  }
  getSettingsPanel() {
    return Settings;
  }
};
