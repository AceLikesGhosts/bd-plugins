export enum ToastKind {
    Default = "",
    Info = "info",
    Success = "success",
    Danger = "danger",
    Error = "error",
    Warning = "warning",
    Warn = "warn",
}

export default /** @__PURE__ */ {
    toast: BdApi.UI.showToast,
    Kind: ToastKind,
};