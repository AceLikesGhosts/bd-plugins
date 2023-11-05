export interface TimeoutManager {
    DelayedCall: (...args: any[]) => any;
    Interval: (...args: any[]) => any;
    Timeout: (...args: any[]) => any;
    timeoutPromise: (...args: any[]) => any;
}

export default /** @pure */ BdApi.Webpack.getByKeys('Timeout', 'DelayedCall') as TimeoutManager;