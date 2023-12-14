import type { Meta as RealMeta } from 'betterdiscord';

export default interface Meta extends RealMeta {
    updateLink?: string;
// eslint is being GAY.
// eslint-disable-next-line semi
};