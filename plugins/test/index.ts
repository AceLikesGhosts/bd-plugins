import type { Meta, Plugin } from 'betterdiscord';
import Updater from '@lib/updater';

export default class test implements Plugin {
    private readonly updater: Updater;
    public constructor(meta: Meta) {
        this.updater = new Updater(meta);
    }

    start(): void {
        console.log('started');

    }
    stop(): void {
        console.log('stopped');
        this.updater.stop();
    }
}
