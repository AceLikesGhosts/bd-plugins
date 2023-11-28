import type { Plugin } from 'betterdiscord';
import { ActivityType, type Activity } from '@lib/modules/UserActivity';

import Settings from './components/Settings';

import config from './config.json';
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
`.trim();

export const RPC_DEFAULT: Activity = {
    application_id: 0,
    name: 'RPC!',
    details: 'This is a default',
    state: 'RPC provided!',
    flags: 1,
    type: ActivityType.Playing,
} as const;

export default class CustomRPC implements Plugin {
    public rpcs?: Activity[] = void 0;
    static selRPC: number = -1;

    start(): void {
        this.rpcs = BdApi.Data.load(config.name, 'rpcs');
        if(this.rpcs!.length < 1) {
            console.log('length replacement: ', this.rpcs?.length);
            this.rpcs = [RPC_DEFAULT];
        }
        let selectedRPCTemp = BdApi.Data.load(config.name, 'settings')?.selRPC;
        if(!selectedRPCTemp && selectedRPCTemp !== 0) {
            selectedRPCTemp = -1;
        }
        CustomRPC.selRPC = selectedRPCTemp;
        // for cleanup
        selectedRPCTemp = void 0;
        
        console.log(this.rpcs);
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
        console.log('rpcs on stop', this.rpcs);
        BdApi.Data.save(config.name, 'rpcs', this.rpcs);
        BdApi.Data.save(config.name, 'settings', { selRPC: CustomRPC.selRPC });
        this.rpcs = void 0;
    }

    getSettingsPanel(): () => JSX.Element {
        return Settings.bind(this);
    }
}
