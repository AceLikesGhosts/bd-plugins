const MessageUtils = BdApi.Webpack.getByKeys('sendMessage') as {
    sendMessage: (
        channelId: string,
        mesasge: { content: string; },
        _1: true,
        _2: {}
    ) => Promise<unknown>;
};

export const claimVoiceChannel = (id: string) => MessageUtils.sendMessage(
    id,
    { content: '!voice-claim' },
    true,
    {}
);
