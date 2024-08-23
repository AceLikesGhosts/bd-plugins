import type { Channel } from './ChannelStore';

export type GuildChannel = {
    channel: Channel;
    comparator: number;
};

export type GuildChannels = {
    SELECTABLE: GuildChannel[];
    VOCAL: GuildChannel[];
    count: number;
    id: string;
};

export type VocalChannels = string[];

export interface GuildChannelStore {
    getChannels(guildId: string): GuildChannels;
    getVocalChannelIds(guildId: string): VocalChannels;
}

export default BdApi.Webpack.getStore('GuildChannelStore') as GuildChannelStore;