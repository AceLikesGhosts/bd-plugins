import { RawComponents } from '.';
const { Slider: RawSlider } = RawComponents;

/**
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

export interface SliderProps extends Record<string, any> {
    initialValue?: number;
    maxValue?: number;
    minValue?: number;
    disabled?: boolean;
    handleSize?: number;
    keyboardStep?: number;
    asValueChanges?: any;
    stickToMarkers?: boolean;
    className?: string;
    children?: React.ReactNode;
    barStyles?: React.CSSProperties;
    fillStyles?: React.CSSProperties;
    mini?: any;
    hideBubble?: any;
    defaultValue?: any;
    orientation?: any;
    onValueRender?: any;
    renderMarker?: any;
    getAriaValueText?: any;
    barClassName?: string;
    grabberClassName?: string;
    grabberStyles?: any;
    markerPosition?: any;
    'aria-hidden'?: any;
    'aria-label'?: any;
    'aria-labelledby'?: any;
    'aria-describedby'?: any;
}

interface SliderState extends Record<string, any> {
    value: any;
    active: any;
    focused: any;
    sortedMarkers: any;
    markerPositions: any;
    closestMarkerIndex: any;
    newClosestIndex: any;
    min: any;
    max: any;
}

interface Slider extends React.ComponentClass<SliderProps, SliderState> {
    defaultProps: {
        disabled: false;
        fillStyles: Record<string, never>;
        handleSize: 10;
        initialValue: 10;
        keyboardStep: 1;
        maxValue: 100;
        minValue: 0;
        stickToMarkers: false;
    };
}

export default /** @__PURE__ */ RawSlider as Slider;