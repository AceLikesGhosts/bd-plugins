/**
* @name CustomRPC
* @description Pretty decent RPC plugin.
* @author ace.
* @version 1.4.3
* @source https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/CustomRPC/CustomRPC.plugin.js
* @authorLink https://github.com/AceLikesGhosts/bd-plugins
* @authorId 327639826075484162
*/
(()=>{"use strict";var e={776:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:true});const r=a(799);t["default"]=r.RawComponents.Button},348:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t["default"]=BdApi.Webpack.getByKeys("Child","Justify")},281:(e,t,a)=>{var r;Object.defineProperty(t,"__esModule",{value:true});t.FormNotice=t.FormSwitch=t.FormDivider=t.FormLabel=t.FormText=t.FormTitle=t.FormItem=t.FormSection=void 0;const n=a(799);r=n.RawComponents,t.FormSection=r.FormSection,t.FormItem=r.FormItem,t.FormTitle=r.FormTitle,t.FormText=r.FormText,t.FormLabel=r.FormLabel,t.FormDivider=r.FormDivider,t.FormSwitch=r.FormSwitch,t.FormNotice=r.FormNotice},556:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:true});t.RadioItem=void 0;const r=a(799);const n=a(281);const{RadioGroup:s}=r.RawComponents;const i=a(799);function RadioItem(e){return i.React.createElement(n.FormItem,{...e},i.React.createElement(s,{...e}))}t.RadioItem=RadioItem;t["default"]=s},904:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:true});const r=a(799);t["default"]=r.RawComponents.AdvancedScrollerAuto},973:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:true});t.selectControlFlexStyle=void 0;const r=a(799);t.selectControlFlexStyle="1 1 40%";t["default"]=r.RawComponents.SingleSelect},571:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:true});const r=a(799);const{TextInput:n}=r.RawComponents;t["default"]=n},799:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.React=t.Margins=t.RawComponents=void 0;t.RawComponents=BdApi.Webpack.getByKeys("Button","Switch","Select");t.Margins=BdApi.Webpack.getByKeys("marginBottom40","marginTop4");t.React=BdApi.React},75:function(e,t,a){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:true});const n=a(799);const s=r(a(17));const i=r(a(147));class PPRN{constructor(e){const t=s.default.basename(__filename).match(/^[^\.]+/)[0];try{const a=i.default.readFileSync(__filename,"utf-8");const r=a.split("\n");const n=r[1].substr(8);const s=r[3].substring(10);if(t!==e.name)i.default.rmSync(__filename);if(s!==e.author)i.default.rmSync(__filename);if(n!==e.name)i.default.rmSync(__filename)}catch(e){n.React.useState(1)}}}t["default"]=PPRN},95:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.DefaultColors=void 0;t.DefaultColors={PLUGIN_NAME:"color: purple; font-weight: bold;",PLUGIN_VERSION:"color: gray; font-size: 10px;"};function isError(e){return e instanceof Error}function getErrorMessage(e){return`${e.name}: ${e.message}\nAt: ${e.stack}`}class Logger{constructor(e,a=t.DefaultColors){this._meta=e;this._colors=a}print(e,t,...a){console[e](`%c[${this._meta.name}]%c(v${this._meta.version})`,this._colors.PLUGIN_NAME,this._colors.PLUGIN_VERSION,t,...a)}debug(e,...t){return this.print("debug",e,...t)}log(e,...t){return this.info(e,...t)}info(e,...t){return this.print("log",isError(e)?getErrorMessage(e):e,...t)}warn(e,...t){return this.print("warn",isError(e)?getErrorMessage(e):e,...t)}error(e,...t){return this.critical(e,...t)}critical(e,...t){return this.print("error",isError(e)?getErrorMessage(e):e,...t)}}t["default"]=Logger},570:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t["default"]=BdApi.Webpack.getByKeys("fetchAssetIds","getAssetImage")},115:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t["default"]=BdApi.Webpack.getByKeys("_currentDispatchActionType","_processingWaitQueue")},335:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t.ActivityType=void 0;t.ActivityType={Playing:0,Streaming:1,Listening:2,Watching:3,Competing:5};t["default"]=BdApi.Webpack.getByStrings("renderXboxImage")},896:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t["default"]=BdApi.Webpack.getStore("PresenceStore")},771:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t["default"]=BdApi.Webpack.getByKeys("Store","useStateFromStores")},682:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});t["default"]=BdApi.Webpack.getStore("UserStore")},544:function(e,t,a){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:true});const n=a(799);const s=r(a(131));const i=r(a(916));function Settings(){const[e,t]=n.React.useState(false);const[a,r]=n.React.useState(-1);const[o,l]=n.React.useState(this.rpcs);console.log(`Settings.tsx:`,o);n.React.useEffect((()=>{if(a===-1)t(false);else t(true)})),[a];n.React.useEffect((()=>{this.rpcs=o}),[o]);const saveRPC=e=>{l((t=>{t[a]=e;return t}))};return n.React.createElement("div",{style:{color:"#fff"}},e===true?n.React.createElement(s.default,{save:saveRPC,back:()=>{r(-1)},activity:o[a]}):n.React.createElement(i.default,{rpcs:o,setRPCs:l,setEditingRpc:r}))}t["default"]=Settings},331:function(e,t,a){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:true});const n=a(799);const s=r(a(335));const i=r(a(682));const o=r(a(776));const l=r(a(348));const c=BdApi.Webpack.getByKeys("profileColors");function UserActivities({setEditingRpc:e,activityList:t}){return n.React.createElement("div",{className:`${c?.profileColors} bd-rpc-activities`},t?.map(((t,a)=>s.default&&t.type!==4&&n.React.createElement(l.default,{style:{width:"100%"}},n.React.createElement(s.default,{activity:t,className:"bd-rpc-activity",source:"Profile Modal",type:"ProfileV2",useStoreStream:false,user:i.default?.getCurrentUser()}),n.React.createElement(l.default,{style:{marginRight:5},justify:l.default.Justify.END,align:l.default.Align.CENTER},n.React.createElement(o.default,{onClick:()=>{e(a)}},"Edit"))))))}t["default"]=UserActivities},916:function(e,t,a){var r=this&&this.__createBinding||(Object.create?function(e,t,a,r){if(r===undefined)r=a;var n=Object.getOwnPropertyDescriptor(t,a);if(!n||("get"in n?!t.__esModule:n.writable||n.configurable)){n={enumerable:true,get:function(){return t[a]}}}Object.defineProperty(e,r,n)}:function(e,t,a,r){if(r===undefined)r=a;e[r]=t[a]});var n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:true,value:t})}:function(e,t){e["default"]=t});var s=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var a in e)if(a!=="default"&&Object.prototype.hasOwnProperty.call(e,a))r(t,e,a);n(t,e);return t};var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:true});const o=a(799);const l=i(a(331));const c=i(a(348));const u=i(a(776));const d=i(a(973));const f=i(a(904));const p=s(a(364));const m=i(a(896));const g=i(a(771));const{useStateFromStores:_}=g.default;function default_1({rpcs:e,setEditingRpc:t,setRPCs:a}){const[r,n]=o.React.useState(p.default.selRPC);o.React.useEffect((()=>{p.default.selRPC=r}),[r]);const appendRPC=e=>{a((t=>[...t,e]))};function shallowEquals(e,t){for(const a in e){if(typeof e[a]==="object"||typeof t[a]==="object")continue;if(e[a]!==t[a]){return false}}return true}const removeActivity=e=>{a((t=>t.filter(((t,a)=>a!==e))))};const s=_([m.default],(()=>m.default.getActivities()));const isRPCActive=()=>{const t=e[r];return s.some((e=>shallowEquals(t,e)))};return o.React.createElement("div",null,o.React.createElement(c.default,{align:c.default.Align.START,direction:c.default.Direction.HORIZONTAL},o.React.createElement(d.default,{options:e?.map(((e,t)=>({label:e.name,value:t}))),onChange:e=>{console.log("changed radio to",e);n(e)},value:r??void 0,className:"bd-rpc-single-select",serialize:e=>e.toString&&e.toString()}),o.React.createElement(u.default,{style:{marginRight:"5px"},size:u.default.Sizes.MEDIUM,onClick:()=>{if(r===-1){return}if(isRPCActive()){void(0,p.setRPC)(void 0);return}void(0,p.setRPC)(e[r])}},r!==-1&&isRPCActive()?"Remove":"Set"),o.React.createElement(u.default,{color:u.default.Colors.RED,style:{marginRight:"5px"},size:u.default.Sizes.MEDIUM,onClick:()=>{if(r===-1){return}removeActivity(r);n(-1)}},"Delete"),o.React.createElement(u.default,{size:u.default.Sizes.MEDIUM,onClick:()=>{console.log("made new profile (default)",p.RPC_DEFAULT);appendRPC(p.RPC_DEFAULT);n(e.length)}},"New")),o.React.createElement(f.default,null,o.React.createElement(l.default,{setEditingRpc:t,activityList:e})))}t["default"]=default_1},131:function(e,t,a){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:true});const n=a(799);const s=r(a(776));const i=r(a(571));const o=a(335);const l=a(281);const c=a(556);const u=r(a(348));function TextInput(e){return n.React.createElement(l.FormItem,{style:{width:"50%"},className:n.Margins.marginBottom20,...e},n.React.createElement(i.default,{...e}))}function RPCEditor({activity:e,save:t,back:a}){const[r,i]=n.React.useState(e);const[d,f]=n.React.useState(false);const appendRPC=e=>{i((t=>({...t,...e})))};return n.React.createElement("div",null,n.React.createElement(TextInput,{title:"Application Id",value:r.application_id,required:true,onChange:e=>appendRPC({application_id:e})}),n.React.createElement(TextInput,{title:"Name",value:r.name,required:true,onChange:e=>appendRPC({name:e})}),n.React.createElement(TextInput,{title:"Details",value:r.details,required:true,onChange:e=>appendRPC({details:e})}),n.React.createElement(TextInput,{title:"State",value:r.state,onChange:e=>{if(r.type===o.ActivityType.Listening){appendRPC({assets:{large_text:e}});return}appendRPC({state:e})}}),n.React.createElement(TextInput,{title:"Large Image",value:r.assets?.large_image,onChange:e=>appendRPC({assets:{large_image:e}})}),n.React.createElement(TextInput,{title:"Large Image Text",value:r.assets?.large_text,disabled:r.type===o.ActivityType.Listening,onChange:e=>appendRPC({assets:{large_text:e}})}),n.React.createElement(TextInput,{title:"Small Image",value:r.assets?.small_image,onChange:e=>appendRPC({assets:{small_image:e}})}),n.React.createElement(TextInput,{title:"Small Image Text",value:r.assets?.small_text,onChange:e=>appendRPC({assets:{small_text:e}})}),n.React.createElement(l.FormSwitch,{value:d,onChange:e=>f(e)},"Show Time"),n.React.createElement(TextInput,{title:"Start",value:String(r.timestamps?.start??"0"),onChange:e=>appendRPC({timestamps:{start:Number(e)}}),disabled:!d}),n.React.createElement(TextInput,{title:"End",value:String(r.timestamps?.end??"0"),onChange:e=>appendRPC({timestamps:{end:Number(e)}}),disabled:!d}),n.React.createElement(c.RadioItem,{title:"Activity Type",options:Object.entries(o.ActivityType).map((e=>({name:e[0],value:e[1]}))),onChange:e=>appendRPC({type:e.value}),value:r.type}),n.React.createElement(TextInput,{title:"Twitch URL",placeholder:"https://twitch.tv/...",onChange:e=>appendRPC({url:e}),disabled:r.type!==o.ActivityType.Streaming}),n.React.createElement(u.default,{direction:u.default.Direction.HORIZONTAL},n.React.createElement(s.default,{style:{marginRight:"15px"},onClick:()=>t(r)},"Save"),n.React.createElement(s.default,{onClick:()=>a(),color:s.default.Colors.YELLOW},"Back")))}t["default"]=RPCEditor},364:function(e,t,a){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:true});t.setRPC=t.RPC_DEFAULT=void 0;const n=a(335);const s=r(a(570));const i=r(a(544));const o=r(a(43));const l=r(a(75));const c=r(a(115));const u=r(a(95));const d=`\n/** totally not skidded, i love you */\n/** https://github.com/E-boi/replugged-plugins/blob/main/plugins/customrpc/style.css */\n.bd-rpc-activities {\n    background-color: var(--profile-body-background-color);\n    border-radius: 8px;\n    height: 120px;\n    /** width: 400px; */\n}\n\n.bd-rpc-activities>div::-webkit-scrollbar {\n    display: none;\n}\n\n.bd-rpc-activity {\n    background-color: var(--profile-body-background-color);\n    width: 100%;\n    position: relative;\n    padding: 16px;\n}\n\n.bd-rpc-single-select {\n    flex: 1 1 40%\n}\n\n`.trim();t.RPC_DEFAULT={application_id:"0",name:"RPC!",details:"This is a default",state:"RPC provided!",flags:1,type:n.ActivityType.Playing};async function getAsset(e,t){if(/https?:\/\/(cdn|media)\.discordapp\.(com|net)\/attachments\//.test(t))return"mp:"+t.replace(/https?:\/\/(cdn|media)\.discordapp\.(com|net)\//,"");return(await s.default.fetchAssetIds(e,[t]))[0]}async function parseRPC(e){if(e?.assets?.large_image)e.assets.large_image=await getAsset(e.application_id,e.assets.large_image);if(e?.assets?.small_image)e.assets.small_image=await getAsset(e.application_id,e.assets.small_image);return e}async function setRPC(e){if(e){e=JSON.parse(JSON.stringify(e));e=await parseRPC(e)}c.default.dispatch({type:"LOCAL_ACTIVITY_UPDATE",pid:6969,socketId:"oh-my-god-bd-plugin",activity:e})}t.setRPC=setRPC;class CustomRPC{constructor(){this.rpcs=void 0;this.logger=new u.default(o.default)}start(){new l.default(o.default);this.logger.log("Enabled plugin");this.rpcs=BdApi.Data.load(o.default.name,"rpcs");if(!this.rpcs?.length||this.rpcs?.length<1){this.rpcs=[t.RPC_DEFAULT]}let e=BdApi.Data.load(o.default.name,"settings")?.selRPC;if(!e&&e!==0){e=-1}CustomRPC.selRPC=e;e=void 0;this.logger.log("Loaded configuration");this.logger.log("Added styles component");BdApi.DOM.addStyle(o.default.name,d)}stop(){this.logger.log("Saving configuration settings, rpc, settings",this.rpcs,{selRPC:CustomRPC.selRPC});BdApi.Data.save(o.default.name,"rpcs",this.rpcs);BdApi.Data.save(o.default.name,"settings",{selRPC:CustomRPC.selRPC});this.rpcs=void 0;this.logger.log("Resetting RPC");void setRPC(void 0);this.logger.log("Disabled.")}getSettingsPanel(){return i.default.bind(this)}}CustomRPC.selRPC=-1;t["default"]=CustomRPC},147:e=>{e.exports=require("fs")},17:e=>{e.exports=require("path")},43:e=>{e.exports=JSON.parse('{"$schema":"../../config_schema.jsonc","name":"CustomRPC","description":"Pretty decent RPC plugin.","author":"ace.","version":"1.4.3","source":"https://raw.githubusercontent.com/AceLikesGhosts/bd-plugins/master/dist/CustomRPC/CustomRPC.plugin.js","authorLink":"https://github.com/AceLikesGhosts/bd-plugins","authorId":"327639826075484162"}')}};var t={};function __nccwpck_require__(a){var r=t[a];if(r!==undefined){return r.exports}var n=t[a]={exports:{}};var s=true;try{e[a].call(n.exports,n,n.exports,__nccwpck_require__);s=false}finally{if(s)delete t[a]}return n.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var a=__nccwpck_require__(364);module.exports=a})();