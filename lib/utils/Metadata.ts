import type { Meta } from 'betterdiscord';

/** @__PURE__ */
const splitRegex = /[^\S\r\n]*?\r?(?:\r\n|\n)[^\S\r\n]*?\*[^\S\r\n]?/;
/** @__PURE__ */
const escapedAtRegex = /^\\@/;

export default /** @__PURE__ */ function parseJSDocMeta(fileContent: string): Meta {
    const block = fileContent.split('/**', 2)[1].split('*/', 1)[0];
    const out: Record<string, unknown> = {};
    let field = '';
    let accum = '';
    for(const line of block.split(splitRegex)) {
        if(line.length === 0) continue;
        if(line.charAt(0) === '@' && line.charAt(1) !== ' ') {
            out[field] = accum;
            const l = line.indexOf(' ');
            field = line.substring(1, l);
            accum = line.substring(l + 1);
        }
        else {
            accum += ' ' + line.replace('\\n', '\n').replace(escapedAtRegex, '@');
        }
    }
    out[field] = accum.trim();
    delete out[''];
    out.format = 'jsdoc';
    return out as unknown as Meta & { format: 'jsdoc' };
}