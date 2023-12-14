import type Meta from '@lib/types';

export default /** @__PURE__ */ class Updater {
    private readonly meta: Meta;
    public constructor(meta: Meta) {
        this.meta = meta;
    }

    public stop(): void {
        // TODO: something.
    }
}