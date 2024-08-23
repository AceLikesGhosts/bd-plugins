import type { Activity } from '../modules/UserActivity';

interface PresenceStore {
    getActivities(userId?: string): Activity[];
    
}

export default /** @__PURE__ */ BdApi.Webpack.getStore('PresenceStore') as PresenceStore;