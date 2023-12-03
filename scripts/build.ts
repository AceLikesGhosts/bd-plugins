import type { WatchBuildResult } from '@vercel/ncc';
import ncc from '@vercel/ncc';
import fs from 'fs';
import path, { sep } from 'path';
import { processArguments, appData, pluginPath as pluginsPath, getFoldersInDirectory, makePathIfNotExists } from './util';

let argv = process.argv;

if(argv.length === 2) {
    console.error('Missing packages to build, accepted arguments are ');
    console.error('`all` (or a package name)');
    throw 'Bad arguments';
}

// remove first two args
// ['node', 'build.js', 'our args'] -> ['our args']; 
argv = argv.slice(2);

const argList = [
    '--move',
    '--watch',
    '--dev',
];
const args = processArguments(argv, argList);

argv = argv.filter((arg) => !argList.includes(arg));

const bdFolderPath: string | null = argv.includes('--bd-path') ? argv[argv.indexOf('--bd-path') + 1] : null;

if(argv.includes('all')) {
    if(argv.length > 1) {
        console.warn(`Any arguments passed after 'all' will be voided, all arguments should be provided before.`);
    }

    const pluginFolders = getFoldersInDirectory(pluginsPath);
    if(pluginFolders.length === 0) {
        throw 'No plugins were found in plugins folder.';
    }

    pluginFolders.forEach((p) => compileProject(path.join(pluginsPath, p)));
}
else {
    argv.forEach((p) => {
        if(!fs.existsSync(path.join(pluginsPath, p))) {
            throw 'Failed to find project ' + p + ' in the projects folder, is your pluginPath set incorrectly?';
        }

        compileProject(path.join(pluginsPath, p));
    });
}

function compileProject(projectPath: string): void {
    if(!fs.existsSync(projectPath)) {
        throw 'Attempted to compile a project which does not exist?\nPath: ' + projectPath;
    }

    const lastDirectory: string = projectPath.split(sep).pop()!;

    let inputPath: string;
    const ts = path.join(projectPath, 'index.ts');
    const tsx = path.join(projectPath, 'index.tsx');
    if(fs.existsSync(ts)) {
        inputPath = ts;
    }
    else if(fs.existsSync(tsx)) {
        inputPath = tsx;
    }
    else {
        throw new Error('Failed to locate input path.');
    }

    const distPath = path.join(__dirname, '..', 'dist');
    const distPluginPath = path.join(distPath, lastDirectory);

    if(fs.existsSync(distPath) && fs.existsSync(distPluginPath)) {
        console.log(`${ lastDirectory } dist folder exists, removing it to rebuild`);
        fs.rmSync(distPluginPath, { recursive: true, force: true });
    }

    makePathIfNotExists(distPath);
    makePathIfNotExists(distPluginPath);

    const configJSON = throwInExtras(projectPath, distPath, lastDirectory);

    const header = `
/**
${ Object.entries(configJSON).map(([k, v], i) => {
        if(k === '$schema') {
            return;
        }

        return `${ i === 1 ? `* @${ k } ${ v }` : `\n* @${ k } ${ v }` }`;
    }).join('') }
*/
    `;

    const pluginFileName = lastDirectory.toString() + '.plugin.js';

    let outFilePath = path.join(distPath, lastDirectory, pluginFileName);

    if(bdFolderPath || args.move) {
        outFilePath = bdFolderPath ? path.join(appData, pluginFileName) : path.join(appData, pluginFileName);
    }

    build(inputPath, outFilePath, header, args, args.watch || false);
}

function build(inputPath: string, outFilePath: string, header: string, args: Record<string, boolean>, watch: boolean) {
    const build = ncc(
        inputPath,
        {
            cache: false,
            externals: [],
            filterAssetBase: process.cwd(),
            minify: false,
            sourceMap: args.dev, // Dont ship source maps or else!
            watch: watch,
            quiet: true
        }) as any;

    if(watch) {
        (build as WatchBuildResult).handler(({ err, code, map }) => {
            if(err) {
                throw err;
            }

            writeBuildFile(code, outFilePath, header, map);
        });
    }
    else {
        void (build as Promise<{ code: string; map?: string; }>).then(({ code, map }) => {
            writeBuildFile(code, outFilePath, header, map);
        });
    }
}

function writeBuildFile(code: string, outFilePath: string, header: string, map?: string): void {
    console.log(`Finished building ${ outFilePath }!`);

    const wfConfig = {
        encoding: 'utf-8',
        flag: 'w'
    } as fs.WriteFileOptions;

    fs.writeFileSync(outFilePath, `${ header.trim() }\n${ code }`, wfConfig);

    if(map) {
        fs.writeFileSync(`${ outFilePath }.map`, map, wfConfig);
    }
}

function throwInExtras(pluginPath: string, distPath: string, lastDirectory: string): Record<string, unknown> {
    // before we compile, we wanna throw in our configuration.
    const configFile = path.join(pluginPath, 'config.json');

    if(!fs.existsSync(configFile)) {
        // TODO: make better
        throw new Error(`Build script failed!\nFailed to find \`config.json\` for project (${ lastDirectory }).\nPath: ${ pluginPath }`);
    }

    const configText = fs.readFileSync(configFile, { encoding: 'utf-8' });
    /** @type {Record<string, unknown>} */
    const configJSON: Record<string, unknown> = JSON.parse(configText);

    const readmePath = path.join(pluginPath, 'README.md');
    const readmeOut = path.join(distPath, lastDirectory, 'README.md');

    if(fs.existsSync(readmePath)) {
        fs.writeFileSync(readmeOut, fs.readFileSync(readmePath));
    }

    return configJSON;
}