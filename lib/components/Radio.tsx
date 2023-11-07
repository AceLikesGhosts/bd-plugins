import { RawComponents } from '.';
const { RadioGroup: RawRadioGroup } = RawComponents;

interface RadioGroupOption<T> {
    name: React.ReactNode;
    value: T;
    desc?: React.ReactNode;
}

export interface RadioGroupProps<T> {
    itemInfoClassName?: string;
    itemTitleClassName?: string;
    radioItemClassName?: string;
    className?: string;
    value?: T;
    size?: string;
    onChange?: (option: RadioGroupOption<T>) => void;
    disabled?: boolean;
    options?: RadioGroupOption<T>[];
    orientation?: unknown;
    withTransparentBackground?: unknown;
    'aria-labelledby'?: unknown;
}

interface RadioGroup {
    <T>(props: RadioGroupProps<T>): JSX.Element;
    Sizes: {
        MEDIUM: string;
        NONE: string;
        NOT_SET: string;
        SMALL: string;
    };
}

export default /** @__PURE__ */ RawRadioGroup as RadioGroup;