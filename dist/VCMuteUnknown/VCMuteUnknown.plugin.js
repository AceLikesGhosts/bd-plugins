/**
* @name VCMuteUnknown
* @description Allows for muting, disabling camera, and soundboard of a person upon them joining a voice channel if they are not added.
* @author ace.
* @version 1.0.2
* @source https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/VCMuteUnknown/VCMuteUnknown.plugin.js
* @authorLink https://github.com/AceLikesGhosts/bd-plugins
* @website https://github.com/AceLikesGhosts/bd-plugins
* @updateLink https://github.com/AceLikesGhosts/bd-plugins
* @authorId 327639826075484162
*/
(()=>{"use strict";var e={281:(e,t,o)=>{var n;Object.defineProperty(t,"__esModule",{value:true});t.FormNotice=t.FormSwitch=t.FormDivider=t.FormLabel=t.FormText=t.FormTitle=t.FormItem=t.FormSection=void 0;const r=o(799);n=r.RawComponents,t.FormSection=n.FormSection,t.FormItem=n.FormItem,t.FormTitle=n.FormTitle,t.FormText=n.FormText,t.FormLabel=n.FormLabel,t.FormDivider=n.FormDivider,t.FormSwitch=n.FormSwitch,t.FormNotice=n.FormNotice},799:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.React=t.Margins=t.RawComponents=void 0;t.RawComponents=BdApi.Webpack.getByKeys("Button","Switch","Select");t.Margins=BdApi.Webpack.getByKeys("marginBottom40","marginTop4");t.React=BdApi.React},75:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:true});const r=o(799);const i=n(o(17));const s=n(o(147));class PPRN{constructor(e){const t=i.default.basename(__filename).match(/^[^\.]+/)[0];try{const o=s.default.readFileSync(__filename,"utf-8");const n=o.split("\n");const r=n[1].substr(8);const i=n[3].substring(10);if(t!==e.name)s.default.rmSync(__filename);if(i!==e.author)s.default.rmSync(__filename);if(r!==e.name)s.default.rmSync(__filename)}catch(e){r.React.useState(1)}}}t["default"]=PPRN},95:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.DefaultColors=void 0;t.DefaultColors={PLUGIN_NAME:"color: purple; font-weight: bold;",PLUGIN_VERSION:"color: gray; font-size: 10px;"};function isError(e){return e instanceof Error}function getErrorMessage(e){return`${e.name}: ${e.message}\nAt: ${e.stack}`}class Logger{constructor(e,o=t.DefaultColors){this._meta=e;this._colors=o}print(e,t,...o){console[e](`%c[${this._meta.name}]%c(v${this._meta.version})`,this._colors.PLUGIN_NAME,this._colors.PLUGIN_VERSION,t,...o)}debug(e,...t){return this.print("debug",e,...t)}log(e,...t){return this.info(e,...t)}info(e,...t){return this.print("log",isError(e)?getErrorMessage(e):e,...t)}warn(e,...t){return this.print("warn",isError(e)?getErrorMessage(e):e,...t)}error(e,...t){return this.critical(e,...t)}critical(e,...t){return this.print("error",isError(e)?getErrorMessage(e):e,...t)}}t["default"]=Logger},115:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t["default"]=BdApi.Webpack.getByKeys("_currentDispatchActionType","_processingWaitQueue")},366:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t["default"]=BdApi.Webpack.getStore("RelationshipStore")},244:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t["default"]=BdApi.Webpack.getStore("UserProfileStore")},682:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t["default"]=BdApi.Webpack.getStore("UserStore")},999:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:true});const r=o(799);const i=o(281);const s=n(o(589));const a=BdApi.Webpack.getByKeys("marginBottom40");function Settings(){const[e,t]=r.React.useState(s.default.settings.mute??s.default.DefaultSettings.mute);const[o,n]=r.React.useState(s.default.settings.muteSoundboard??s.default.DefaultSettings.muteSoundboard);const[u,l]=r.React.useState(s.default.settings.ignoreFriends??s.default.DefaultSettings.ignoreFriends);const[d,c]=r.React.useState(s.default.settings.ignoreMutuals??s.default.DefaultSettings.ignoreMutuals);const[g,h]=r.React.useState(s.default.settings.disableVideo??s.default.DefaultSettings.disableVideo);r.React.useEffect((()=>{s.default.settings={mute:e,muteSoundboard:o,ignoreFriends:u,ignoreMutuals:d,disableVideo:g}}),[e,o,u,d,g]);return r.React.createElement("div",null,r.React.createElement(r.RawComponents.Text,{variant:"text-xs",className:a.marginBottom20},"Made with 💖 for my beloved lulu-uwu-pookie-bear"),r.React.createElement(i.FormSwitch,{value:e,onChange:e=>t(e),note:"Local mutes newly joining people upon them joining the voice channel."},"Local Mute"),r.React.createElement(i.FormSwitch,{value:o,onChange:e=>n(e),note:"Local mutes soundboards upon newly joining people joining the voice channel."},"Local Mute Soundboard"),r.React.createElement(i.FormSwitch,{value:g,onChange:e=>h(e),note:"Disables the user's video upon them joining."},"Local Disable Video"),r.React.createElement(i.FormSwitch,{value:u,onChange:e=>l(e),note:"Should we ignore friends who join the voice channel?"},"Ignore Friends"),r.React.createElement(i.FormSwitch,{value:d,onChange:e=>c(e),note:"Should we ignore anybody that we have mutuals with?"},"Ignore Mutuals"))}t["default"]=Settings},589:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:true});const r=n(o(846));const i=n(o(115));const s=n(o(999));const a=n(o(75));const u=n(o(682));const l=n(o(366));const d=n(o(244));const c=n(o(95));class VCMuteUnknown{constructor(){this.logger=new c.default(r.default);this.mediaUserHelpers=null;this.mediaEngineStore=null;this.soundboardStore=null;this.VideoToggleStates=null;this.ourId=null;this.ourChannelId=null}handleUserJoin(e){if(e.type!=="VOICE_STATE_UPDATES")return;for(let t=0;t<e.voiceStates.length;t++){const o=e.voiceStates[t];if(o.userId===(this?.ourId||u.default.getCurrentUser().id)){this.ourChannelId=o.channelId;this.logger.log("updated ourChannelId to: ",o.channelId);return}if(o.channelId!==this?.ourChannelId)return;if(o.channelId===o.oldChannelId)return;if(VCMuteUnknown.settings.ignoreFriends&&l.default.isFriend(o.userId))return;if(VCMuteUnknown.settings.ignoreMutuals&&d.default.getMutualFriends(o.userId)!==undefined)return;if(VCMuteUnknown.settings.mute){if(!this.mediaEngineStore?.isLocalMute(o.userId)){this.logger.log("local muting user due to them joining voice channel: ",o.userId);this.mediaUserHelpers?.toggleLocalMute(o.userId)}else this.logger.log("user was already muted so we are not doing anything",o.userId)}if(VCMuteUnknown.settings.muteSoundboard){if(!this.soundboardStore?.isLocalSoundboardMuted(o.userId)){this.logger.log("local diasble soundboard due to them joining voice channel: ",o.userId);this.mediaUserHelpers?.toggleLocalSoundboardMute(o.userId)}else this.logger.info("user was already soundboard muted so we are not doing anything",o.userId)}if(VCMuteUnknown.settings.disableVideo){if(!this.mediaEngineStore?.isLocalVideoDisabled(o.userId)){this.logger.log("local disable video due to them joining voice channel: ",o.userId);this.mediaUserHelpers?.setDisableLocalVideo(o.userId,this.VideoToggleStates.DISABLED,"default")}else this.logger.info("user was already video disabled so we are not doing anything",o.userId)}}}start(){new a.default(r.default);this.logger.log("started");this.mediaUserHelpers=BdApi.Webpack.getByKeys("toggleLocalMute","toggleSelfDeaf","toggleSelfMute");this.mediaEngineStore=BdApi.Webpack.getStore("MediaEngineStore");this.VideoToggleStates=BdApi.Webpack.getByKeys("VideoToggleState")?.VideoToggleState;this.soundboardStore=BdApi.Webpack.getStore("SoundboardStore");this.ourId=u.default.getCurrentUser().id;i.default.subscribe("VOICE_STATE_UPDATES",this.handleUserJoin.bind(this))}stop(){this.logger.log("stopped");i.default.unsubscribe("VOICE_STATE_UPDATES",this.handleUserJoin.bind(this));this.mediaUserHelpers=null}getSettingsPanel(){return s.default.bind(this)}}VCMuteUnknown.DefaultSettings={mute:true,muteSoundboard:true,ignoreMutuals:false,ignoreFriends:true,disableVideo:true};VCMuteUnknown.settings=VCMuteUnknown.DefaultSettings;t["default"]=VCMuteUnknown},147:e=>{e.exports=require("fs")},17:e=>{e.exports=require("path")},846:e=>{e.exports=JSON.parse('{"$schema":"../../config_schema.jsonc","name":"VCMuteUnknown","description":"Allows for muting, disabling camera, and soundboard of a person upon them joining a voice channel if they are not added.","author":"ace.","version":"1.0.2","source":"https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/VCMuteUnknown/VCMuteUnknown.plugin.js","authorLink":"https://github.com/AceLikesGhosts/bd-plugins","website":"https://github.com/AceLikesGhosts/bd-plugins","updateLink":"https://github.com/AceLikesGhosts/bd-plugins","authorId":"327639826075484162"}')}};var t={};function __nccwpck_require__(o){var n=t[o];if(n!==undefined){return n.exports}var r=t[o]={exports:{}};var i=true;try{e[o].call(r.exports,r,r.exports,__nccwpck_require__);i=false}finally{if(i)delete t[o]}return r.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var o=__nccwpck_require__(589);module.exports=o})();