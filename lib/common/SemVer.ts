import type { SemVer } from 'semver';

// gotta really make sure its pure yknow
/** @__PURE__ */
export function getSemVer(version: string) /** @__PURE__ */: SemVer | false {
    try {
        return new DiscordSemVer(version);
    }
    catch(_) {
        return false;
    }
}

/** @__PURE__ */
const DiscordSemVer = BdApi.Webpack.getByKeys('valid', 'clean', 'satisfies') as new (version: string) => SemVer;

export default /** @__PURE__ */ DiscordSemVer;