import fs from 'fs';
import path from 'path';

export const appData: string = process.env.APPDATA || (process.platform === 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + '/.local/share');

export const basePath = path.join(__dirname, '..');
// the plugins mono repo folder plugins
export const pluginPath = path.join(basePath, 'plugins');

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

export function processArguments(argv: string[], allowedArgs: string[]): Record<string, boolean> {
    const final: Record<string, boolean> = {};

    allowedArgs.forEach((arg) => final[arg] = false);

    argv.forEach((arg) => {
        if(!arg.startsWith('--')) return;
        if(!allowedArgs.includes(arg)) {
            throw new Error(`IllegalArgument: ${ arg } was not found in allowedArgs`);
        }

        arg = arg.replaceAll('-', '');
        final[arg] = true;
    });

    return final;
}