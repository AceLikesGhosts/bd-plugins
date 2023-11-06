import { RawComponents } from '.';
const { Switch: RawSwitch } = RawComponents;

export interface SwitchProps {
    id?: string;
    onChange?: (checked: boolean) => void;
    checked?: boolean;
    disabled?: boolean;
    className?: string;
    focusProps?: unknown;
    innerRef?: unknown;
}

export default /** @pure */ RawSwitch as (props: SwitchProps) => JSX.Element;