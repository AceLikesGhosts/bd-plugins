export enum ChannelType {
    VOICE = 2
}

export type Channel = {
    name: string;
    guild_id: string;
    userLimit_: number;
    id: string;
    accessPermissions: bigint;
    type: number;
    permissionOverwrites_: Record<string, {
        allow: bigint;
        deny: bigint;
    }>;
};


interface ChannelStore {
    getChannel(id: string): Channel;
}

export default BdApi.Webpack.getStore('ChannelStore') as ChannelStore;