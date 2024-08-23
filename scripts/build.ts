import path from 'path';
import fs from 'fs';
import type { BuildOptions, PluginMetadata } from './util';
import { distPath, getFoldersInDirectory, makePathIfNotExists, parseArguments, pluginPath, writeBuildFile } from './util';
import type { WatchBuildResult } from '@vercel/ncc';
import ncc from '@vercel/ncc';

const NODE_VERSION = process.versions.node.split('.')[0];
if(Number(NODE_VERSION) < 16) {
    throw new Error('You are running an outdated version of NodeJS, this build script requires atleast v16.17.0 or above.');
}

const args = parseArguments();

if(args.values.all) {
    if(args.positionals.length > 0) console.warn('Positional plugin names are discarded due to the `all` flag being passed.');
    const toBuild = getFoldersInDirectory(pluginPath);

    for(let i: number = 0; i < toBuild.length; i++) compileProject(path.join(pluginPath, toBuild[i]));
}
else {
    for(let i: number = 0; i < args.positionals.length; i++) {
        const toBuild = path.join(pluginPath, args.positionals[i]);

        if(!fs.existsSync(toBuild)) {
            throw 'Invalid plugin name "' + args.positionals[i] + '", are you sure that\'s a valid plugin?';
        }

        compileProject(toBuild);
    }
}

/**
 * Gets the plugin's configuration file, and README
 * @throws
 */
function getPluginMetadata(pluginPath: string, pluginName: string): PluginMetadata {
    const configFilePath = path.join(pluginPath, 'config.json');
    if(!fs.existsSync(configFilePath))
        throw new Error(`Build script failed!\nFailed to find \`config.json\` for project (${ pluginName }).\nPath: ${ pluginPath }`);

    const config: Record<string, string> = JSON.parse(fs.readFileSync(configFilePath, { encoding: 'utf-8' }));
    if(!config) throw new Error('Failed to parse `config.json` into a valid JSON object for project' + pluginName);

    const READMEFilePath = path.join(pluginPath, 'README.md');
    if(!fs.existsSync(READMEFilePath)) return { config, README: null };

    const readmeText = fs.readFileSync(READMEFilePath, { encoding: 'utf-8' });
    return { config, README: readmeText };
}

function compileProject(pluginPath: string): void {
    // gets the last directory of a path, aka the plugin name
    const pluginName = pluginPath.split(path.sep).pop();
    if(!pluginName) throw 'Failed to get plugin name from last part of directory string, odd. SEP: ' + path.sep + ', res: ' + pluginName;

    let inputPath: string;
    const ts = path.join(pluginPath, 'index.ts');
    const tsx = path.join(pluginPath, 'index.tsx');

    if(fs.existsSync(ts)) inputPath = ts;
    else if(fs.existsSync(tsx)) inputPath = tsx;
    else throw new Error('Failed to locate input path.');

    const distPluginPath = path.join(distPath, pluginName);

    makePathIfNotExists(distPath);
    makePathIfNotExists(distPluginPath);

    const { README, config } = getPluginMetadata(pluginPath, pluginName);

    const header = `
/**
${ Object.entries(config).map(([k, v], i) => {
        if(k === '$schema') {
            return;
        }

        return `${ i === 1 ? `* @${ k } ${ v }` : `\n* @${ k } ${ v }` }`;
    }).join('') }
*/
    `;

    buildSource({
        header,
        inputPath,
        outFilePath: path.join(distPluginPath, pluginName),
        sourceMaps: args.values.dev ?? false,
        watch: args.values.watch ?? false
    });

    if(README && README !== null) {
        fs.writeFileSync(path.join(distPluginPath, 'README.md'), README!);
        console.log(`Wrote README.md`);
    }
}

function buildSource({ header, inputPath, outFilePath, sourceMaps, watch }: BuildOptions): void {
    const build = ncc(inputPath, {
        watch,
        sourceMap: sourceMaps,
        filterAssetBase: process.cwd(),
        quiet: true,
        externals: [],
        cache: false,
        minify: false
    });

    if(watch) {
        (build as unknown as WatchBuildResult).handler(({ err, code, map }) => {
            if(err) {
                console.error(err);
                return;
            }

            writeBuildFile(code, outFilePath, header, map!);
        });
    }
    else {
        void (build as Promise<{ code: string; map?: string; }>).then(({ code, map }) => {
            writeBuildFile(code, outFilePath, header, map!);
        });
    }
}