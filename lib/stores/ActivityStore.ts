import type { Activity } from '../modules/UserActivity';

interface ActivityStore {
    getActivities(): Activity[];
}

export default /** @__PURE__ */ BdApi.Webpack.getByKeys('getLocalPresence', 'getActivities') as ActivityStore;