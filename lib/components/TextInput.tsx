import { RawComponents } from '.';
const { TextInput } = RawComponents;

export interface TextInputProps {
    type?: string;
    value?: string;
    name?: string;
    placeholder?: string;
    className?: string;
    inputClassName?: string;
    inputPrefix?: unknown;
    error?: unknown;
    minLength?: number;
    maxLength?: number;
    size?: string;
    onChange?: (value: string) => void;
    editable?: boolean;
    autoFocus?: boolean;
    disabled?: boolean;
    inputRef?: React.Ref<HTMLInputElement>;
    prefixElement?: unknown;
    focusProps?: unknown;
    titleId?: unknown;
    'aria-labelledby'?: unknown;
}

export default /** @__PURE__ */ TextInput as React.ComponentClass<TextInputProps, unknown>;