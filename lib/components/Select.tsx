import { RawComponents } from '.';

interface SelectProps {
    className?: string;
    value: unknown;
    options: {
        label: string;
        value: unknown;
    }[];
    onChange?: (i: unknown) => unknown;
    serialize: (v: unknown) => string;
    style?: Record<string, string>;
}

export const selectControlFlexStyle = '1 1 40%';
// export default /** @__PURE__ */ RawComponents.Select as (props: SelectProps) => JSX.Element
export default /** @__PURE__ */ RawComponents.SingleSelect as (props: SelectProps) => JSX.Element;