export type TPropertiesToSpoofAs = typeof PropertiesToSpoofAs;
export type WeirdPropertyShit = {
    getSuperProperties(): {
        [K in keyof TPropertiesToSpoofAs]: {
            browser: TPropertiesToSpoofAs[K]['browser'];
            os: TPropertiesToSpoofAs[K]['os'];
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
    ios: { browser: 'Discord iOS', os: 'iOS' },
    android: { browser: 'Discord Android', os: 'Android' },
    web: { browser: 'Discord Web', os: 'Other' },
    linux: { browser: 'Discord Client', os: 'Linux' },
    win32: { browser: 'Discord Client', os: 'Windows' },
    darwin: { browser: 'Discord Client', os: 'Mac OS X' },
    xbox: { browser: 'Discord Embedded', os: 'Xbox' },
    playstation: { browser: 'Discord Embedded', os: 'Playstation' }
} as const;

export const propertyStuff: WeirdPropertyShit = BdApi.Webpack.getByKeys('getSuperProperties', 'getSuperPropertiesBase64', { searchExports: true });
export const gameConsoleManager: GameConsoleManager = BdApi.Webpack.getByKeys('actions', 'handleAudioStateToggle', 'handleSessionsChanged');
export const socket: DiscordWebSocket = BdApi.Webpack.getByKeys('socket', 'state', { searchExports: true }).socket;