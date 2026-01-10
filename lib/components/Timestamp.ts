export interface TimestampProps {
    timestamp: any;
    id?: string;
}

export default BdApi.Webpack.getByStrings('timestampFormat', 'timestamp', { searchExports: true }) as React.FunctionComponent<TimestampProps>;