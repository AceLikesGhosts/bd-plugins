import type { User } from '../stores/UserStore';

export interface Activity {
    application_id: string;
    type: typeof ActivityType[keyof typeof ActivityType];
    flags: number;
    assets?: ActivityAssets;
    buttons?: string[];
    metadata?: ActivityMetadata;
    party?: ActivityParty;
    secret?: ActivitySecrets;
    url?: string;
    timestamps?: ActivityTimestamps;
    name: string;
    details?: string;
    state?: string;
}

export const ActivityType = {
    Playing: 0,
    Streaming: 1,
    Listening: 2,
    Watching: 3,
    Competing: 5
} as const;

interface ActivityTimestamps {
    start?: number;
    end?: number;
}

interface ActivitySecrets {
    match?: string;
    join?: string;
    spectate?: string;
}

interface ActivityAssets {
    large_text?: string;
    small_text?: string;
    large_image?: string;
    small_image?: string;
}

interface ActivityMetadata {
    button_urls: string[];
}

interface ActivityParty {
    size: [amount: number, max: number];
    id: string;
}

interface UserActivityProps {
    actionColor?: string;
    activity: Activity;
    className: 'bd-rpc-activity';
    source: 'Profile Modal';
    type: 'ProfileV2';
    useStoreStream: boolean;
    user: User;
}

// export default /** @__PURE__ */ BdApi.Webpack.getByStrings('renderXboxImage') as new (args: UserActivityProps) => UserActivity;
export default /** @__PURE__ */ BdApi.Webpack.getByStrings('renderXboxImage') as React.ComponentClass<UserActivityProps, unknown>;