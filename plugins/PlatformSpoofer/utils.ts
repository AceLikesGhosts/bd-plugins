export type TPropertiesToSpoofAs = typeof PropertiesToSpoofAs;
export type WeirdPropertyShit = {
    getSuperProperties(): {
        [K in keyof TPropertiesToSpoofAs]: {
            browser: TPropertiesToSpoofAs[K]['browser'];
        }
    }[keyof TPropertiesToSpoofAs] & Record<string, unknown>;
};

type GameConsoleManager = {
    awaitRemoteTimeout(...args: any[]): unknown | Promise<unknown>;
    handleAudioStateToggle(...args: any[]): void;
    handleConsoleCommandUpdate(...args: any[]): void;
    handleSessionsChanged(...args: any[]): void;
    handleVoiceStateUpdates(...args: any[]): void;
    handleWaitForRemoteSession(...args: any[]): void;
    maybeConnect(...args: any[]): void;

    stores: Map<unknown, unknown>;
    actions: Record<string, (...args: any) => unknown | Promise<unknown>>;
};

type DiscordWebSocket = {
    close(): void;
    connect(): void;
    isClosed(): boolean;
    isConnected(): boolean;
};

export const PropertiesToSpoofAs = {
    ios: { browser: 'Discord iOS' },
    android: { browser: 'Discord Android' },
    web: { browser: 'Discord Web' },
    desktop: { browser: 'Discord Client' },
    xbox: { browser: 'Discord Embedded' },
    playstation: { browser: 'Discord Embedded' },
    vr: { browser: 'Discord VR' }
} as const;

export const propertyStuff: WeirdPropertyShit = BdApi.Webpack.getByKeys<{ default: WeirdPropertyShit; }>('default', 'debugLogEvent').default;
export const gameConsoleManager: GameConsoleManager = BdApi.Webpack.getByKeys('actions', 'handleAudioStateToggle', 'handleSessionsChanged');
export const socket = BdApi.Webpack.getByKeys<{ getSocket(): DiscordWebSocket | undefined; }>('getSocket')?.getSocket() as DiscordWebSocket | undefined;