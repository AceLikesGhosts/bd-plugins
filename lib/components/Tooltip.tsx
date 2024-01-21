import { RawComponents } from '.';

interface TooltipProps {
    text: string;
    style?: string | undefined;
    side?: string | undefined;
    preventFlip?: boolean | undefined;
    isTimestamp?: boolean | undefined;
    disablePointerEvents?: boolean | undefined;
    disabled?: boolean | undefined;
    position?: string;

    children: unknown[] | unknown;
}

export default RawComponents.Tooltip as React.ComponentClass<TooltipProps, unknown>;