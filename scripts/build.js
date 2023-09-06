/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @description \@vercel/ncc.
 */
let ncc;

try {
    ncc = require('@vercel/ncc');
}
catch(err) {
    throw new Error('Failed to find ncc (@vercel/ncc), are you sure that you installed the dependencies for this project?');
}

let args = process.argv;

if(args.length === 2) {
    console.error('Missing packages to build, accepted arguments are ');
    console.error('`all` (or a package name)');
    return;
}

// remove first two args
// ['node', 'build.js', 'our args'] -> ['our args']; 
args = args.slice(2);
const throwInBdFolder = args.includes('--move') ||
    args.includes('--put-in-bd') ||
    args.includes('-p') ||
    args.includes('-m');

const watch = args.includes('--watch') ||
    args.includes('-w') ||
    args.includes('--rebuild');

const dev = args.includes('--dev') ||
    args.includes('-d') ||
    args.includes('--sourcemaps');

args = args.filter((v) => {
    return ![
        '--dev',
        '-d',
        '--sourcemaps',
        '--watch',
        '-w',
        '--rebuild',
        '--move',
        '--put-in-bd',
        '-p',
        '-m'].includes(v);
});

const { join, sep } = require('path');
const { statSync, readdirSync, existsSync, mkdirSync, writeFileSync, readFileSync } = require('fs');
// out of Scripts folder and into the base directory
const basePath = join(__dirname, '..');
// the plugins mono repo folder plugins
const pluginPath = join(basePath, 'plugins');

/**
 * @param {string} directoryPath 
 * @returns 
 */
function getFoldersInDirectory(directoryPath) {
    try {
        const items = readdirSync(directoryPath);
        const folders = [];

        for(const item of items) {
            const itemPath = join(directoryPath, item);
            if(statSync(itemPath).isDirectory()) {
                folders.push(item);
            }
        }

        return folders;
    }
    catch(error) {
        console.error(`Error reading directory: ${directoryPath}`);
        return [];
    }
}

if(throwInBdFolder) {
    console.log('-- At the moment, copying to the BetterDiscord plugin folder is not supported.');
}

if(args.includes('all')) {
    if(args.length > 1) {
        console.warn('! WARN: Any arguments passed before or after `all` is voided.');
    }

    const pluginFolders = getFoldersInDirectory(pluginPath);
    if(pluginFolders.length === 0) {
        return;
    }

    pluginFolders.forEach((p) => {
        compileProject(join(pluginPath, p));
    });
}
else {
    args.forEach((v) => {
        if(!existsSync(join(pluginPath, v))) {
            throw new Error(`Build script failed!\nFailed to find project named ${v} in the projects folder!`);
        }

        compileProject(join(pluginPath, v));
    });
}


/**
 * @param {string} outFile - The file of the out file. 
 * @throws
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function putFileInBdPluginFolder(outFile) {
    throw 'a party!';
}

/**
 * @param {string} path - The path to the project to compile 
 * @throws
 */
function compileProject(path) {
    if(!existsSync(path)) {
        // TODO: make better
        throw new Error(`Build script failed!\nAttempted to compile a project which does not exist?\nPath: ${path}`);
    }

    const lastDirectory = path.split(sep).pop();

    const inputPath = join(path, 'index.ts');
    if(!existsSync(inputPath)) {
        // TODO: make better
        throw new Error(`Build script failed!\nFailed to find \`inputPath\` for project (${lastDirectory}).\nPath: ${path}`);
    }

    const distPath = join(__dirname, '..', 'dist');

    /**
     * @param {string} p 
     */
    const makePathIfNotExists = (p) => {
        if(!existsSync(p)) {
            console.warn('Created path ' + p + ' due to it not existing.');
            mkdirSync(p);
        }
    };

    makePathIfNotExists(distPath);

    // before we compile, we wanna throw in our configuration.
    const configFile = join(path, 'config.json');

    if(!existsSync(configFile)) {
        // TODO: make better
        throw new Error(`Build script failed!\nFailed to find \`config.json\` for project (${lastDirectory}).\nPath: ${path}`);
    }

    const configText = readFileSync(configFile);
    /** @type {Record<string, unknown>} */
    const configJSON = JSON.parse(configText);

    const header = `
/**
${Object.entries(configJSON).map(([k, v], i) => {
        if(k === '$schema') {
            return;
        }

        return `${i === 1 ? `* @${k} ${v}` : `\n* @${k} ${v}`}`;
    }).join('')}
*/
    `;

    const readme = join(path, 'README.md');

    if(existsSync(readme)) {
        const readmeOut = join(distPath, lastDirectory, 'README.md');
        writeFileSync(readFileSync(readme, { encoding: 'utf-8' }), readmeOut);
    }

    const outFile = join(distPath, lastDirectory, `${lastDirectory.toString()}.plugin.js`);

    ncc(
        inputPath,
        {
            cache: false,
            externals: [],
            filterAssetBase: process.cwd(),
            // minify: true, BetterDiscord doesnt like it when you minify your plugins..
            minify: false,
            sourceMap: dev, // Dont ship source maps or else!
            watch: watch, // lol
            quiet: true
        })
        .then(({ code }) => {
            console.log(`Finished building ${lastDirectory.toString()}!`);
            writeFileSync(outFile, `${header.trim()}\n${code}`);
        });
}