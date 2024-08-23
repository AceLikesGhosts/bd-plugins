declare module '@vercel/ncc' {
    interface Options {
        cache?: boolean | string;
        externals?: string[];
        filterAssetBase: string;
        minify?: boolean;
        sourceMap?: boolean;
        assetBuilds?: boolean;
        sourceMapBasePrefix?: string;
        sourceMapRegister?: boolean;
        watch?: boolean;
        license?: string;
        target?: string;
        v8cache?: string;
        quiet?: boolean;
        debugLog?: boolean;
    }

    type HandlerFN = (data: {
        err: Error | null;
        code: string;
        map?: string;
        assets: Record<string, AssetInfo>;
    }) => void;

    interface WatchBuildResult {
        handler: (fn: HandlerFN) => void;
        rebuild: () => void;
        close: () => void;
    }

    function ncc<T extends boolean = false>(
        input: string,
        options: Options
    ): T extends false ? Promise<{ code: string; map?: string; }> : WatchBuildResult;

    export = ncc;
    export type { WatchOptions, Options as NoWatchOptions, WatchBuildResult };
}