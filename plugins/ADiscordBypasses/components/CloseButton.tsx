/**
 * Copyright TharkiGod
 * 
 * This is free and unencumbered software released into the public domain.
 *
 * Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.
 *
 * In jurisdictions that recognize copyright laws, the author or authors of this software dedicate any and all copyright interest in the software to the public domain. We make this dedication for the benefit of the public at large and to the detriment of our heirs and successors. We intend this dedication to be an overt act of relinquishment in perpetuity of all present and future rights to this software under copyright law.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * For more information, please refer to https://unlicense.org
 */

import { React } from '@lib/components';

export interface CloseButtonProps {
    size?: string;
    className?: string;
    style?: object;
    onClick?: () => void;
}

export class CloseButton extends React.Component<CloseButtonProps> {
    constructor(props: CloseButtonProps) {
        super(props);
        props.size = props.size || '16px';
        props.style = props.style || {};
        props.className = props.className || '';
    }

    render(): JSX.Element {
        return (
            <svg
                {...{
                    className: this.props.className,
                    fill: 'currentColor',
                    viewBox: '0 0 24 24',
                    style: { width: this.props.size, height: this.props.size, ...this.props.style },
                    onClick: this.props.onClick,
                }}>
                <path
                    {...{
                        d: 'M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z',
                    }}
                />
            </svg>
        );
    }
}