export interface TimestampProps {
    timestamp: any;
    id?: string;
}

export default BdApi.Webpack.getByStrings('MESSAGE_EDITED_TIMESTAMP_A11Y_LABEL') as React.FunctionComponent<TimestampProps>;