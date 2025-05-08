export interface GuildMember {
    userId: string;
    nick?: string | null;
}

interface GuildMemberStore {
    getMember(guildId: string, memberId: string): GuildMember | null;
}

export default BdApi.Webpack.getStore('GuildMemberStore') as GuildMemberStore;