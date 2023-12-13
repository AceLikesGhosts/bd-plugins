import type { Meta } from 'betterdiscord';

/**
 * A mapping of keys to hex colors.
 */
export type Colors = {
    PLUGIN_NAME: string;
    PLUGIN_VERSION: string;
};

/** @__PURE__ */
const DefaultColors: Colors = {
    PLUGIN_NAME: 'color: purple; font-weight: bold;',
    PLUGIN_VERSION: 'color: gray; font-size: 10px;'
} as const;

function isError(err: unknown): err is Error {
    return err instanceof Error;
}

function getErrorMessage(error: Error): string {
    return `${ error.name }: ${ error.message }\nAt: ${ error.stack }`;
}

export default /** @__PURE__ */ class Logger {
    private readonly _meta: Meta;
    private readonly _colors: Colors;
    public static internal: Logger = new Logger({ name: 'INTERNAL', version: '' } as Meta);
    public constructor(meta: Meta, colors: Colors = DefaultColors) {
        this._meta = meta;
        this._colors = colors;
    }

    public print<T>(type: 'log' | 'warn' | 'error', message: T, ...data: unknown[]): void {
        console[type](
            `%c[${ this._meta.name }]%c(v${ this._meta.version })`,
            this._colors.PLUGIN_NAME,
            this._colors.PLUGIN_VERSION,
            message,
            ...data
        );
    }

    public log<T>(message: T, ...data: unknown[]): void {
        if(
            process.env.DEV?.toString()?.toLocaleLowerCase() === 'true' ||
            process.env.NODE_ENV?.toString()?.toLowerCase() === 'dev'
        ) {
            return this.warn('`log` is an alias for `info`, please use the `info` function.');
        }

        return this.info(message, ...data);
    }

    public info<T>(message: T, ...data: unknown[]): void {
        return this.print('log', isError(message) ? getErrorMessage(message) : message, ...data);
    }

    public warn<T>(message: T, ...data: unknown[]): void {
        return this.print('warn', isError(message) ? getErrorMessage(message) : message, ...data);
    }

    public error<T>(message: T, ...data: unknown[]): void {
        if(
            process.env.DEV?.toString()?.toLocaleLowerCase() === 'true' ||
            process.env.NODE_ENV?.toString()?.toLowerCase() === 'dev'
        ) {
            return this.warn('`error` is an alias for `critical`, please use the `critical` function.');
        }

        return this.critical(message, ...data);
    }

    public critical<T>(message: T, ...data: unknown[]): void {
        return this.print('error', isError(message) ? getErrorMessage(message) : message, ...data);
    }
}