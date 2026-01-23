/**
* @name RandomiseFileNames
* @description Change up your file names.
* @author ace.
* @version 1.0.5
* @source https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/RandomiseFileNames/RandomiseFileNames.plugin.js
* @authorLink https://github.com/AceLikesGhosts/bd-plugins
* @website https://github.com/AceLikesGhosts/bd-plugins
* @updateLink https://github.com/AceLikesGhosts/bd-plugins
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

// plugins/RandomiseFileNames/index.ts
var index_exports = {};
__export(index_exports, {
  DefaultSettings: () => DefaultSettings,
  default: () => RandomiseFileName
});
module.exports = __toCommonJS(index_exports);

// plugins/RandomiseFileNames/config.json
var config_default = {
  $schema: "../../config_schema.jsonc",
  name: "RandomiseFileNames",
  description: "Change up your file names.",
  author: "ace.",
  version: "1.0.5",
  source: "https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/RandomiseFileNames/RandomiseFileNames.plugin.js",
  authorLink: "https://github.com/AceLikesGhosts/bd-plugins",
  website: "https://github.com/AceLikesGhosts/bd-plugins",
  updateLink: "https://github.com/AceLikesGhosts/bd-plugins",
  authorId: "327639826075484162"
};

// lib/components/index.ts
var Margins = /* @__PURE__ */ BdApi.Webpack.getByKeys("marginBottom40", "marginTop4");
var React = BdApi.React;
var ReactDom = BdApi.ReactDOM || BdApi.Webpack.getByKeys("createRoot");

// lib/components/Form.tsx
var FormTitle = BdApi.Webpack.getByStrings('["defaultMargin".concat', '="h5"', { searchExports: true });
var Text = BdApi.Webpack.getBySource('case"always-white"', { searchExports: true }).E;
var FormSection = BdApi.Webpack.getBySource(".titleId)&&", { searchExports: true });
var FormItem = BdApi.Webpack.getBySource("forwardRef", "titleClassName", "data-migration-pending").e;
{
}
var FormSwitch = (e) => /* @__PURE__ */ React.createElement(BdApi.Components.SettingItem, { note: e.note }, /* @__PURE__ */ React.createElement(BdApi.Components.SwitchInput, { ...e, id: "zere-i-hate-you" }));

// lib/components/TextInput.tsx
var TextInput_default = BdApi.Components.TextInput;

// lib/common/Lodash.ts
var Lodash_default = /* @__PURE__ */ BdApi.Webpack.getByKeys("debounce");

// plugins/RandomiseFileNames/components/Settings.tsx
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
  const [letters, setLetters] = React.useState(RandomiseFileName.settings.letters ?? DefaultSettings.letters);
  const [maxLetters, setMaxLetters] = React.useState(RandomiseFileName.settings.maxLetters ?? DefaultSettings.maxLetters);
  const [timestamp, setTimestamp] = React.useState(RandomiseFileName.settings.timestamp ?? DefaultSettings.timestamp);
  const [consistent, setConsistent] = React.useState(RandomiseFileName.settings.consistent ?? DefaultSettings.consistent);
  const [consistentText, setConsistentText] = React.useState(RandomiseFileName.settings.consistentText ?? DefaultSettings.consistentText);
  React.useEffect(() => {
    RandomiseFileName.settings = {
      letters,
      maxLetters,
      timestamp,
      consistent,
      consistentText
    };
  }, [letters, maxLetters, timestamp, consistent, consistentText]);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
    FormSwitch,
    {
      value: letters,
      onChange: (e) => setLetters(e),
      disabled: timestamp || consistent
    },
    "Random Letters"
  ), /* @__PURE__ */ React.createElement(
    TextInput,
    {
      title: "Maximum Amount of Letters",
      value: maxLetters?.toString(),
      disabled: !letters && (timestamp || consistent),
      onChange: (e) => {
        if (!Lodash_default.isNumber(e)) return;
        setMaxLetters(e);
      }
    }
  ), /* @__PURE__ */ React.createElement(
    FormSwitch,
    {
      value: timestamp,
      onChange: (e) => setTimestamp(e),
      disabled: letters || consistent
    },
    "Timestamp"
  ), /* @__PURE__ */ React.createElement(
    FormSwitch,
    {
      value: consistent,
      onChange: (e) => setConsistent(e),
      disabled: letters || timestamp
    },
    "Consistent"
  ), /* @__PURE__ */ React.createElement(
    TextInput,
    {
      title: "Consistent Text",
      value: consistentText,
      disabled: !consistent && (timestamp || letters),
      onChange: (e) => setConsistentText(e)
    }
  ));
}

// plugins/RandomiseFileNames/index.ts
var DefaultSettings = {
  letters: true,
  maxLetters: 7,
  timestamp: false,
  consistent: false,
  consistentText: "image"
};
var uploadFileMod = BdApi.Webpack.getByKeys("uploadFiles");
var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+";
function getRandomCharacters(length) {
  let out = "";
  for (let i = 0; i < length; i++) {
    out += characters.charAt(
      Math.random() * characters.length
    );
  }
  return out;
}
var RandomiseFileName = class _RandomiseFileName {
  static {
    this.settings = DefaultSettings;
  }
  start() {
    const data = BdApi.Data.load(config_default.name, "settings");
    _RandomiseFileName.settings = {
      ...DefaultSettings,
      ...data
    };
    BdApi.Patcher.after(
      config_default.name,
      uploadFileMod,
      "uploadFiles",
      (_, args) => {
        for (const file of args[0].uploads) {
          const newName = this.makeFileName(file.filename);
          file.filename = newName;
        }
      }
    );
  }
  stop() {
    BdApi.Patcher.unpatchAll(config_default.name);
    BdApi.Data.save(config_default.name, "settings", _RandomiseFileName.settings);
  }
  getSettingsPanel() {
    return Settings;
  }
  makeFileName(fileName) {
    const splitStuff = fileName.split(".");
    const fileExt = splitStuff[splitStuff.length - 1];
    if (_RandomiseFileName.settings.letters) return `${getRandomCharacters(_RandomiseFileName.settings.maxLetters)}.${fileExt}`;
    if (_RandomiseFileName.settings.consistent) return `${_RandomiseFileName.settings.consistentText}.${fileExt}`;
    if (_RandomiseFileName.settings.timestamp) return `${Date.now()}.${fileExt}`;
    return fileName;
  }
};
