
type DispatchToken = string;
type Callback = () => void;

declare class ChangeListeners {
    public listeners: Set<Callback>;
    public add(listener: Callback): void;
    public remove(listener: Callback): void;
    public addConditional(listener: Callback, condition: boolean): void;

    public has(listener: Callback): boolean;
    public hasAny(): boolean;
    public invokeAll(): void;
}


export declare class Store {
    public constructor(
        dispatcher: unknown,
        actionHandler?: unknown,
        band?: unknown
    );

    public static destroy(): void;
    public static getAll(): Store[];
    public static initialize(): void;
    public static initialized: Promise<boolean | undefined>;

    public _isInitialized: boolean;
    public _dispatchToken: DispatchToken;
    public _changeCallbacks: ChangeListeners;
    public _reactChangeCallbacks: ChangeListeners;

    public initialize(): void;
    public initializeIfNeeded(): void;
    public getDispatchToken(): DispatchToken;
    public getName(): string;

    public emitChange(): void;
    public syncWith(stores: Store[], callback: () => boolean, timeout?: number): void;
    public waitFor(...stores: Store[]): void;

    public addChangeListener(listener: Callback): void;
    public addConditionalChangeListener(listener: Callback, condition: boolean): void;
    public addReactChangeListener(listener: Callback): void;
    public removeChangeListener(listener: Callback): void;
    public removeReactChangeListener(listener: Callback): void;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    public __getLocalVars?(): Record<string, unknown>;
}