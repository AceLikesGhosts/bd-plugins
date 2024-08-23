import type { Plugin } from 'betterdiscord';
import VeryImportantStuff from '@lib/index';
import meta from './config.json';
import Settings from './components/Settings';

export const DefaultSettings = {
    letters: true,
    maxLetters: 7,
    timestamp: false,
    consistent: false,
    consistentText: 'image'
};

const uploadFileMod = BdApi.Webpack.getByKeys('uploadFiles') as {
    uploadFiles: (args: { uploads: { filename: string; }[]; }) => void;
};

const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+';
function getRandomCharacters(length: number): string {
    let out: string = '';
    for(let i = 0; i < length; i++) {
        out += characters.charAt(
            Math.random() * characters.length
        );
    }

    return out;
}

export default class RandomiseFileName implements Plugin {
    static settings: typeof DefaultSettings = DefaultSettings;

    public start(): void {
        new VeryImportantStuff(meta);

        const data = BdApi.Data.load(meta.name, 'settings');
        RandomiseFileName.settings = {
            ...DefaultSettings,
            ...data
        };

        BdApi.Patcher.after(
            meta.name,
            uploadFileMod,
            'uploadFiles',
            (_, args,) => {
                for(const file of args[0].uploads) {
                    const newName = this.makeFileName(file.filename);
                    file.filename = newName;
                }
            }
        );
    }

    public stop(): void {
        BdApi.Patcher.unpatchAll(meta.name);
        BdApi.Data.save(meta.name, 'settings', RandomiseFileName.settings);
    }

    public getSettingsPanel(): () => React.ReactNode {
        return Settings;
    }

    private makeFileName(fileName: string): string {
        const splitStuff = fileName.split('.'); // somefile.png ['somefile', 'png']
        const fileExt = splitStuff[splitStuff.length - 1];

        if(RandomiseFileName.settings.letters) return `${ getRandomCharacters(RandomiseFileName.settings.maxLetters) }.${ fileExt }`;
        if(RandomiseFileName.settings.consistent) return `${ RandomiseFileName.settings.consistentText }.${ fileExt }`;
        if(RandomiseFileName.settings.timestamp) return `${ Date.now() }.${ fileExt }`;
        return fileName;
    }
}