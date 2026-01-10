import { User } from './UserStore';

export interface Message {
    type: number;
    content: string;
    flags: number;
    components: MessageComponent[];
    id: string;
    channel_id: string;
    author: User;
    bot: boolean;
}

export interface MessageComponent {
    type: number;
    id: string;
    components: Component[];
}

export interface Component {
    type: number;
    id: string;
    custom_id: string;
    style: number;
    label: string;
    emoji: {
        name: string;
    };
}

interface MessageStore {
    getMessage(channelId: string, messageId: string): Message;
}

export default BdApi.Webpack.getStore('MessageStore') as MessageStore;