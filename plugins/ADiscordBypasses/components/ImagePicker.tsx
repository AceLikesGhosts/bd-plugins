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
import Toasts from '@lib/components/Toasts';
import { FormItem } from '@lib/components/Form';
import { CloseButton } from './CloseButton';

export interface ImagePickerProps {
    title?: string;
    note: string;
    children?: string;
    value: string;
    disabled?: boolean;
    onChange: (newvalue: string) => void;
}
export interface ImagePickerState {
    showClearButton: boolean;
    img: string;
}

export class ImagePickerItem extends React.Component<
    ImagePickerProps,
    ImagePickerState
> {
    private fileInputRef: React.RefObject<HTMLInputElement>;
    constructor(props: ImagePickerProps) {
        super(props);
        this.state = { img: this.props.value, showClearButton: false };
        this.clear = this.clear.bind(this);
        this.fileInputRef = React.createRef<HTMLInputElement>();
    }

    clear(): void {
        this.setState({ img: '' });
        this.props.onChange('');
    }

    async getBase64(url: string): Promise<string> {
        const reader = new FileReader();
        const data = await fetch(url);
        const blob = await data.blob();
        return new Promise((resolve) => {
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                resolve(reader.result as string);
            };
        });
    }
    render(): JSX.Element | false {
        return (
            <FormItem
                {...{
                    title: this.props.title ?? this.props.children,
                    note: this.props.note,
                    notePosition: 'after',
                    divider: true,
                    style: { marginBottom: 20 },
                }}>
                <div
                    {...{
                        style: { position: 'relative', color: '#F1F1F1' },
                    }}>
                    <div>
                        <input
                            {...{
                                disabled: this.props.disabled,
                                ref: this.fileInputRef,
                                id: 'actual-btn',
                                type: 'file',
                                multiple: false,
                                accept: 'image/png, image/jpeg, image/webp',
                                style: {
                                    display: 'none',
                                },
                                onChange: async (e) => {
                                    const file = e.target.files![0];
                                    if(file?.size / 1024 > 200) {
                                        Toasts.toast('File Must be under 200kb.', Toasts.Kind.SUCCESS);
                                        return;
                                    }
                                    const url = URL.createObjectURL(file);
                                    const base64 = await this.getBase64(url);
                                    this.props.onChange(base64);
                                    this.setState({ img: base64 });
                                },
                            }}
                        />
                        <div
                            {...{
                                style: {
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                },
                            }}>
                            <div
                                {...{
                                    onMouseEnter: () => this.setState({ showClearButton: true }),
                                    onMouseLeave: () => this.setState({ showClearButton: false }),
                                    style: { position: 'relative', display: 'inline-block' },
                                }}>
                                {this.state.img && this.state.showClearButton && (
                                    <CloseButton
                                        {...{
                                            className: 'image-clear',
                                            onClick: this.clear,
                                            size: '16px',
                                            style: {
                                                position: 'absolute',
                                                right: '0px',
                                                top: '0px',
                                                borderRadius: '50%',
                                                backgroundColor: 'black',
                                                cursor: 'pointer',
                                            },
                                        }}
                                    />
                                )}
                                <label
                                    {...{
                                        for: 'actual-btn',
                                        style: {
                                            padding: '0.5rem',
                                            cursor: 'pointer',
                                            margin: 'auto',
                                        },
                                    }}>
                                    {this.state.img ? (
                                        <img
                                            {...{
                                                src: this.state.img,
                                                style: {
                                                    margin: 'auto',
                                                    maxWidth: '250px',
                                                    maxHeight: '150px',
                                                },
                                            }}
                                        />
                                    ) : (
                                        <svg
                                            {...{
                                                width: '250px',
                                                height: '150px',
                                                viewBox: '0 0 24 24',
                                                fill: 'currentColor',
                                                style: {
                                                    margin: 'auto',
                                                    color: this.props.disabled ? 'gray' : 'white'
                                                },
                                            }}>
                                            <path
                                                {...{
                                                    d: 'M18.75 4C20.5449 4 22 5.45507 22 7.25V18.75C22 20.5449 20.5449 22 18.75 22H7.25C5.45507 22 4 20.5449 4 18.75V12.5019C4.47425 12.6996 4.97687 12.8428 5.50009 12.9236L5.5 18.75C5.5 18.9584 5.53643 19.1583 5.60326 19.3437L11.4258 13.643C12.2589 12.8273 13.5675 12.7885 14.4458 13.5266L14.5742 13.6431L20.3964 19.3447C20.4634 19.159 20.5 18.9588 20.5 18.75V7.25C20.5 6.2835 19.7165 5.5 18.75 5.5L12.9236 5.50009C12.8428 4.97687 12.6996 4.47425 12.5019 4H18.75ZM12.5588 14.644L12.4752 14.7148L6.66845 20.4011C6.8504 20.4651 7.04613 20.5 7.25 20.5H18.75C18.9535 20.5 19.1489 20.4653 19.3305 20.4014L13.5247 14.7148C13.2596 14.4553 12.8501 14.4316 12.5588 14.644ZM16.2521 7.5C17.4959 7.5 18.5042 8.50831 18.5042 9.75212C18.5042 10.9959 17.4959 12.0042 16.2521 12.0042C15.0083 12.0042 14 10.9959 14 9.75212C14 8.50831 15.0083 7.5 16.2521 7.5ZM6.5 1C9.53757 1 12 3.46243 12 6.5C12 9.53757 9.53757 12 6.5 12C3.46243 12 1 9.53757 1 6.5C1 3.46243 3.46243 1 6.5 1ZM16.2521 9C15.8367 9 15.5 9.33673 15.5 9.75212C15.5 10.1675 15.8367 10.5042 16.2521 10.5042C16.6675 10.5042 17.0042 10.1675 17.0042 9.75212C17.0042 9.33673 16.6675 9 16.2521 9ZM6.5 2.99923L6.41012 3.00729C6.20603 3.04433 6.0451 3.20527 6.00806 3.40936L6 3.49923L5.99965 5.99923L3.49765 6L3.40777 6.00806C3.20368 6.0451 3.04275 6.20603 3.00571 6.41012L2.99765 6.5L3.00571 6.58988C3.04275 6.79397 3.20368 6.9549 3.40777 6.99194L3.49765 7L6.00065 6.99923L6.00111 9.50348L6.00916 9.59336C6.04621 9.79745 6.20714 9.95839 6.41123 9.99543L6.50111 10.0035L6.59098 9.99543C6.79508 9.95839 6.95601 9.79745 6.99305 9.59336L7.00111 9.50348L7.00065 6.99923L9.50457 7L9.59444 6.99194C9.79853 6.9549 9.95947 6.79397 9.99651 6.58988L10.0046 6.5L9.99651 6.41012C9.95947 6.20603 9.79853 6.0451 9.59444 6.00806L9.50457 6L6.99965 5.99923L7 3.49923L6.99194 3.40936C6.9549 3.20527 6.79397 3.04433 6.58988 3.00729L6.5 2.99923Z',
                                                }}
                                            />
                                        </svg>
                                    )}
                                    <div
                                        {...{
                                            for: 'actual-btn',
                                            style: {
                                                color: 'white',

                                                cursor: 'pointer',
                                                marginLeft: 'auto',
                                                marginRight: 'auto',
                                                marginTop: '1rem',
                                                textAlign: 'center',
                                            },
                                        }}>
                                        {this.state.img ? 'Change Image' : 'Add Image'}
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </FormItem>
        );
    }
}