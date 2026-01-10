// import { RawComponents } from '.';

/**
 * Types from:
 * <https://github.com/Zerthox/BetterDiscord-Plugins/>
 * MIT License
 *
 * Copyright (c) 2016 Zerthox
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

export const enum FormTags {
    H1 = 'h1',
    H2 = 'h2',
    H3 = 'h3',
    H4 = 'h4',
    H5 = 'h5',
    LABEL = 'label',
    LEGEND = 'legend'
}

export interface FormSectionProps {
    children?: React.ReactNode;
    className?: string;
    titleClassName?: string;
    title?: React.ReactNode;
    icon?: any;
    disabled?: boolean;
    htmlFor?: any;
    tag?: string;
}

export interface FormSection extends React.FunctionComponent<FormSectionProps> {
    Tags: typeof FormTags;
}

export interface FormItemProps {
    children?: React.ReactNode;
    disabled?: boolean;
    className?: string;
    titleClassName?: string;
    tag?: string;
    required?: boolean;
    style?: React.CSSProperties;
    title?: any;
    error?: any;
}

export interface FormItem extends React.FunctionComponent<FormItemProps> {
    Tags: typeof FormTags;
}

export interface FormTitleProps {
    tag?: string;
    children?: React.ReactNode;
    className?: string;
    faded?: boolean;
    disabled?: boolean;
    required?: boolean;
    error?: any;
}

export interface FormTitle extends React.FunctionComponent<FormTitleProps> {
    Tags: typeof FormTags;
}

export interface FormTextProps {
    type?: string;
    className?: string;
    disabled?: boolean;
    selectable?: boolean;
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

export const enum FormTextTypes {
    INPUT_PLACEHOLDER = 'placeholder',
    DESCRIPTION = 'description',
    LABEL_BOLD = 'labelBold',
    LABEL_SELECTED = 'labelSelected',
    LABEL_DESCRIPTOR = 'labelDescriptor',
    ERROR = 'error',
    SUCCESS = 'success'
}

export interface FormText extends React.FunctionComponent<FormTextProps> {
    Types: typeof FormTextTypes;
}

export interface FormSwitchProps {
    value?: boolean;
    disabled?: boolean;
    hideBorder?: boolean;
    tooltipNote?: any;
    onChange?: (checked: boolean) => void;
    className?: string;
    style?: React.CSSProperties;
    note?: any;
    helpdeskArticleId?: any;
    children?: React.ReactNode;
}

export const enum FormNoticeTypes {
    BRAND = 'cardBrand',
    CUSTOM = 'card',
    DANGER = 'cardDanger',
    PRIMARY = 'cardPrimary',
    SUCCESS = 'cardSuccess',
    WARNING = 'cardWarning'
}

export interface FormNoticeProps {
    type?: string;
    imageData?: {
        src: string;
        height?: number;
        width?: number;
        position?: 'left' | 'right';
    };
    button?: any;
    className?: string;
    iconClassName?: string;
    title?: React.ReactNode;
    body?: React.ReactNode;
    style?: React.CSSProperties;
    align?: string;
}

export interface FormNotice extends React.FunctionComponent<FormNoticeProps> {
    Types: typeof FormNoticeTypes;
}

interface FormComponents {
    FormSection: FormSection;
    FormItem: FormItem;
    FormTitle: FormTitle;
    FormText: FormText;
    FormLabel: React.FunctionComponent<any>;
    FormDivider: React.FunctionComponent<any>;
    FormSwitch: React.FunctionComponent<FormSwitchProps>;
    FormNotice: FormNotice;
}

export const /** @__PURE__ */ FormTitle = BdApi.Webpack.getByStrings('["defaultMargin".concat', '="h5"', { searchExports: true }) as FormTitle;

// thanks vencord
import { React } from '.';
const Text /** @__PURE__ */ = BdApi.Webpack.getBySource('case"always-white"', { searchExports: true }).x;
export const /** @__PURE__ */ FormText = function FormText(props: any) {
    const variant = props.variant || "text-sm/normal";
    return (
        <Text
            variant={variant}
            {...props}
        >
            {props.children}
        </Text>
    );
} as any;

export const /** @__PURE__ */ FormSection = BdApi.Webpack.getBySource('.titleId)&&', { searchExports: true }) as FormSection;
export const /** @__PURE__ */ FormSwitch = BdApi.Webpack.getByStrings('.labelRow', 'useId', 'DESCRIPTION', { searchExports: true }) as React.FunctionComponent<FormSwitchProps>;

// arven is a dumb sutpid idiot and finding bugs i can't repro on latest canary, so this is being changed.
// export const FormItem = BdApi.Webpack.getBySource('.fieldWrapper', { searchExports: true }) as FormItem;
export const /** @__PURE__ */ FormItem = BdApi.Webpack.getModule(x => x?.render?.toString?.().includes('.fieldWrapper'), { searchExports: true }) as FormItem;

export const /** @__PURE__ */ FormNotice = BdApi.Webpack.getByStrings('.Types.DANGER', '.formNotice', { searchExports: true }) as FormNotice;
export const /** @__PURE__ */ FormDivider = BdApi.Webpack.getBySource('.divider', ',style:', '"div"', 'dividerDefault', { searchExports: true }) as React.FunctionComponent<any>;