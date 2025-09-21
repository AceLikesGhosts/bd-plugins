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

// export default BdApi.Webpack.getByStrings('.error]:this.hasError()', { searchExports: true }) as React.ComponentClass<TextInputProps, unknown>;
export default BdApi.Webpack.getByStrings('"disabled","editable","inputRef",', 'errorMessage', 'setShouldValidate', { searchExports: true }) as React.ComponentClass<TextInputProps, unknown>;
// export default BdApi.Webpack.getByStrings('showCharacterCountFullPadding', 'showRemainingCharacterCount', { searchExports: true }) as React.ComponentClass<TextInputProps, unknown>;
