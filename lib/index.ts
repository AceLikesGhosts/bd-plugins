import type { Meta } from 'betterdiscord';
import Logger from './logger';
import Updater from './updater';

export default /** @__PURE__ */ class AllPluginUtils {
    public logger: Logger;
    public updater: Updater;

    public constructor(meta: Meta) {
        this.logger = new Logger(meta);
        this.updater = new Updater(meta, this.logger);
    }
}