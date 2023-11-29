import { RawComponents } from '.';
import type { FormItemProps } from './Form';
import { FormItem } from './Form';
const { RadioGroup: RawRadioGroup } = RawComponents;

import { React } from '.';

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

export function RadioItem<T>(props: RadioGroupProps<T> & FormItemProps): JSX.Element {
    return (
        <FormItem
            {...props}
        >
            <RawRadioGroup {...props} />
        </FormItem>
    );
}

export default /** @__PURE__ */ RawRadioGroup as RadioGroup;
