import fs from 'fs';
import path from 'path';
import type { ParseArgsConfig } from 'util';
import { parseArgs } from 'util';

export type PluginMetadata = {
    config: Record<string, string>;
    README: string | null;
};

export type BuildOptions = {
    watch: boolean;
    sourceMaps: boolean;
    inputPath: string;
    outFilePath: string;
    header: string;
};

export const appData: string = process.env.APPDATA || (process.platform === 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + '/.local/share');
export const basePath = path.join(__dirname, '..');
// the plugins mono repo folder plugins
export const pluginPath = path.join(basePath, 'plugins');
export const distPath = path.join(__dirname, '..', 'dist');

export function makePathIfNotExists(p: string): void {
    if(!fs.existsSync(p)) {
        console.warn('Created path ' + p + ' due to it not existing.');
        fs.mkdirSync(p);
    }
};

export function getFoldersInDirectory(directoryPath: string): string[] {
    try {
        const items = fs.readdirSync(directoryPath);
        const folders = [];

        for(const item of items) {
            const itemPath = path.join(directoryPath, item);
            if(fs.statSync(itemPath).isDirectory()) {
                folders.push(item);
            }
        }

        return folders;
    }
    catch(error) {
        console.error(`Error reading directory: ${ directoryPath }`);
        return [];
    }
}

type ParsedArgs = {
    values: {
        watch: boolean | undefined;
        move: boolean | undefined;
        dev: boolean | undefined;
        bdPath: string | undefined;
        all: boolean | undefined;
    };
    positionals: string[];
};


export function parseArguments(): ParsedArgs {
    const ArgumentConfiguration = {
        watch: {
            type: 'boolean',
            short: 'w',
            default: false
        },
        move: {
            type: 'boolean',
            short: 'm',
            default: false
        },
        dev: {
            type: 'boolean',
            short: 'd',
            default: false
        },
        bdPath: {
            type: 'string',
            short: 'p',
            default: path.join(appData, 'BetterDiscord', 'plugins')
        },
        all: {
            type: 'boolean',
            default: false
        }
    } satisfies ParseArgsConfig['options'];

    return parseArgs({ args: process.argv.slice(2), options: ArgumentConfiguration, allowPositionals: true });
}

export function writeBuildFile(code: string, outFilePath: string, header: string, map?: string): void {
    const pluginName = outFilePath.split(path.sep).pop();
    console.log(`Writing outfile for ${ pluginName }...`);

    const wfConfig = {
        encoding: 'utf-8',
        flag: 'w'
    } as fs.WriteFileOptions;

    fs.writeFileSync(outFilePath + '.plugin.js', `${ header.trim() }\n${ code }`, wfConfig);
    if(map) fs.writeFileSync(`${ outFilePath }.plugin.js.map`, map, wfConfig);

    console.log(`Finished building ${ pluginName }!`);
}