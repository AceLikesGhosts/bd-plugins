import type { Meta as RealMeta } from 'betterdiscord';

declare module 'betterdiscord' {
    interface Meta extends RealMeta {
        updateLink?: string;
    }
}
