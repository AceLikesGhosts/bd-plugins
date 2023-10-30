declare module '@vercel/ncc' {
    interface NoWatchOptions {
        cache?: boolean;
        externals?: string[];
        filterAssetBase?: string;
        minify?: boolean;
        sourceMap?: boolean;
        quiet?: boolean;
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
        options: NoWatchOptions | WatchOptions
    ): T extends false ? Promise<{ code: string; map?: string; }> : WatchBuildResult;

    export = ncc;
    export type { WatchOptions, NoWatchOptions, WatchBuildResult };
}