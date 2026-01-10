import type { FormItemProps } from './Form';
import { FormItem } from './Form';

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

export function RadioItem<T>(props: RadioGroupProps<T> & FormItemProps): JSX.Element {
    return (
        <FormItem
            {...props}
        >
            {/* @ts-expect-error I DON'T CARE */}
            <BdApi.Components.RadioInput {...props} />
        </FormItem>
    );
}

// export default RawRadioGroup;
export default BdApi.Components.RadioInput;