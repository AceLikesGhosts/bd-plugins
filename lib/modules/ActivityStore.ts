import type { Activity } from './UserActivity';

interface ActivityStore {
    getActivities(): Activity[];
}

export default /** @__PURE__ */ BdApi.Webpack.getByKeys('getLocalPresence', 'getActivities') as ActivityStore;