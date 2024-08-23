import { RawComponents } from '.';

/**
 * MIT License
 *
 * Copyright (c) 2022 - Present Replugged
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
 * NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES
 * OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const Kind = {
    MESSAGE: 0,
    SUCCESS: 1,
    FAILURE: 2,
    CUSTOM: 3,
    CLIP: 4,
} as const;

const Position = {
    TOP: 0,
    BOTTOM: 1,
} as const;

interface ToastOptions {
    position?: (typeof Position)[keyof typeof Position];
    duration?: number;
    component?: React.ReactElement;
}

interface ToastProps {
    message: string | React.ReactElement | null;
    id: string;
    type: (typeof Kind)[keyof typeof Kind];
    options: ToastOptions;
}

export type CreateToast = (
    content: string | React.ReactElement | null,
    kind?: (typeof Kind)[keyof typeof Kind],
    opts?: ToastOptions,
) => ToastProps;

export type ShowToast = (props: ToastProps) => void;

type ToastFn = (
    content: string | React.ReactElement | null,
    kind?: (typeof Kind)[keyof typeof Kind],
    opts?: ToastOptions,
) => void;

export interface Toast {
    toast: ToastFn;
    Kind: typeof Kind;
    Position: typeof Position;
}

const toast: ToastFn = (content, kind = Kind.SUCCESS, opts = undefined) => {
    const props = RawComponents.createToast(content, kind, opts);
    RawComponents.showToast(props);
};

export default /** @__PURE__ */ {
    toast,
    Kind,
    Position,
} as Toast;