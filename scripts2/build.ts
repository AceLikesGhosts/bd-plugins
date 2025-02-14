import { distPath, getFoldersInDirectory, makePathIfNotExists, parseArguments, pluginPath, writeBuildFile } from './utils';
import path from 'path';
import fs from 'fs';
import esbuild from 'esbuild';

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

type PluginMetadata = {
    config: Record<string, string>;
    README: string | null;
};

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

function compileProject(pluginPath: string) {
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
    const header = `/**
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

type BuildOptions = {
    watch: boolean;
    sourceMaps: boolean;
    inputPath: string;
    outFilePath: string;
    header: string;
};

async function buildSource({ header, inputPath, outFilePath, sourceMaps, watch }: BuildOptions) {
    const pluginName = outFilePath.split(path.sep).pop();
    console.log(`Writing outfile for ${ pluginName }...`);

    if(watch) {
        const build = await esbuild.context({
            entryPoints: [inputPath],
            outfile: `${ outFilePath }.plugin.js`,
            treeShaking: true,
            banner: {
                js: header
            },
            sourcemap: sourceMaps,
            format: 'cjs',
            bundle: true,
            external: ['fs', 'path']
        });

        await build.watch();
    } else {
        esbuild.build({
            entryPoints: [inputPath],
            outfile: `${ outFilePath}.plugin.js`,
            external: ['fs', 'path'],
            banner: {
                js: header
            },
            sourcemap: sourceMaps,
            format: 'cjs',
            bundle: true
        });
    }
}