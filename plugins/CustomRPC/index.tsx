import type { Plugin } from 'betterdiscord';
import { ActivityType, type Activity } from '@lib/modules/UserActivity';
import AssetManager from '@lib/modules/AssetManager';

import Settings from './components/Settings';

import config from './config.json';
import Dispatcher from '@lib/modules/Dispatcher';
import Logger from '@lib/logger';
// import styles from './style.css';
// @vercel/ncc limitation, they refuse to expose
// webpack internals (plugins), @vercel/ncc#549
// "There is no plan to expose webpack internals/plugins because that would make it near impossible to migrate from webpack to the successor, turbopack. See https://turbo.build/pack"
// so we have to embed it like this.
// hate it, but i cant be bothered to rewrite the build system.
const styles = `
/** totally not skidded, i love you */
/** https://github.com/E-boi/replugged-plugins/blob/main/plugins/customrpc/style.css */
.bd-rpc-activities {
    background-color: var(--profile-body-background-color);
    border-radius: 8px;
    height: 120px;
    /** width: 400px; */
}

.bd-rpc-activities>div::-webkit-scrollbar {
    display: none;
}

.bd-rpc-activity {
    background-color: var(--profile-body-background-color);
    width: 100%;
    position: relative;
    padding: 16px;
}

.bd-rpc-single-select {
    flex: 1 1 40%
}

`.trim();

export const RPC_DEFAULT: Activity = {
    application_id: '0',
    name: 'RPC!',
    details: 'This is a default',
    state: 'RPC provided!',
    flags: 1,
    type: ActivityType.Playing,
} as const;

async function getAsset(application_id: string, key: string): Promise<string> {
    if(/https?:\/\/(cdn|media)\.discordapp\.(com|net)\/attachments\//.test(key)) return 'mp:' + key.replace(/https?:\/\/(cdn|media)\.discordapp\.(com|net)\//, '');
    return (await AssetManager.fetchAssetIds(application_id, [key]))[0] as string;
}

async function parseRPC(rpc?: Activity): Promise<Activity | undefined> {
    if(rpc?.assets?.large_image) rpc.assets.large_image = await getAsset(rpc.application_id, rpc.assets.large_image);
    if(rpc?.assets?.small_image) rpc.assets.small_image = await getAsset(rpc.application_id, rpc.assets.small_image);
    return rpc;
};

export async function setRPC(rpc?: Activity): Promise<void> {
    if(rpc) {
        rpc = JSON.parse(JSON.stringify(rpc));
        rpc = await parseRPC(rpc);
    }

    Dispatcher.dispatch({
        type: 'LOCAL_ACTIVITY_UPDATE',
        pid: 6969,
        socketId: 'oh-my-god-bd-plugin',
        activity: rpc
    });
}



export default class CustomRPC implements Plugin {
    public rpcs?: Activity[] = void 0;
    public logger: Logger = new Logger(config);
    static selRPC: number = -1;

    // static async fetchAsset(id: string, key: string): Promise<string> {
    // }

    start(): void {
        this.logger.log('Enabled plugin');
        this.rpcs = BdApi.Data.load(config.name, 'rpcs');
        if(!this.rpcs?.length || this.rpcs?.length < 1) {
            this.rpcs = [RPC_DEFAULT];
        }
        let selectedRPCTemp = BdApi.Data.load(config.name, 'settings')?.selRPC;
        if(!selectedRPCTemp && selectedRPCTemp !== 0) {
            selectedRPCTemp = -1;
        }
        CustomRPC.selRPC = selectedRPCTemp;
        // for cleanup
        selectedRPCTemp = void 0;
        this.logger.log('Loaded configuration');

        this.logger.log('Added styles component');
        BdApi.DOM.addStyle(config.name, styles as string);

        // const connectionOpen = () => {
        //     if(this.selRPC === -1 || !this.rpcs) {
        //         Dispatcher.unsubscribe('CONNECTION_OPEN', connectionOpen);
        //         return;
        //     }

        //     const rpc = this.rpcs[this.selRPC];
        //     setTimeout(() => rpc && Dispatcher.dispatch({ type: 'LOCAL_ACTIVITY_UPDATE', pid: 6969, socketId: 'oh-my-god-bd-plugin', activity: rpc }), 1000);
        //     Dispatcher.unsubscribe('CONNECTION_OPEN', connectionOpen);
        // };

        // Dispatcher.subscribe('CONNECTION_OPEN', connectionOpen);
    }

    stop(): void {
        this.logger.log('Saving configuration settings, rpc, settings', this.rpcs, { selRPC: CustomRPC.selRPC });
        BdApi.Data.save(config.name, 'rpcs', this.rpcs);
        BdApi.Data.save(config.name, 'settings', { selRPC: CustomRPC.selRPC });
        this.rpcs = void 0;
        this.logger.log('Resetting RPC');
        void setRPC(void 0);
        this.logger.log('Disabled.');
    }

    getSettingsPanel(): () => JSX.Element {
        return Settings.bind(this);
    }
}
