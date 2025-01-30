import { RawComponents } from '.';

interface SelectProps {
    className?: string;
    value: unknown;
    options: {
        label: string;
        value: unknown;
    }[];
    onChange?: (i: unknown) => unknown;
    serialize: (v: unknown) => string;
    style?: Record<string,
     string>;
}

/**
    "Select": "
    function D(e){
    let{options:n,
    placeholder:r=y.intl.string(y.t.XqMe3N),
    className:i,
    isDisabled:s=!1,
    
    maxVisibleItems:u=7,
    autoFocus:c=!1,
    popoutWidth:f,
    clearable:h=!1,
    look:E=v.q.FILLED,
    
    onClose:I,
    onOpen:T,
    renderOptionLabel:S=R,
    renderOptionValue:A=O,
    popoutClassName:C,
    
    popoutPosition:N=\"bottom\",
    popoutLayerContext:D,
    optionClassName:x,
    closeOnSelect:w,
    
    select:P,
    isSelected:M,
    serialize:k,
    clear:U,
    hideIcon:B=!1,
    \"aria-label\":G,
    \"aria-labelledby\":Z}=e,
    [F,
    V]=o.useState(!1)
    ,
    {ref:j,
    width:H,
    height:Y}=(0,
    m.Z)();
    o.useLayoutEffect(()=>{s&&V(!1)},
    [s]);let W=o.useCallback(e=>{F!==e&&!s&&(V(e),
    e?n
    ull==T||T():null==I||I())},
    [s,
    I,
    T,
    F]),
    K=o.useCallback(e=>{F&&!e&&W(!1)},
    [W,
    F]),
    z=(0,
    g.O)
    (K),
    q=o.useCallback(e=>{if(P(e),
    w){var n;null===(n=j.current)||void 0===n||n.focus()}},
    [P,
    w,
    j]),
    
    Q=o.useCallback(e=>{e.stopPropagation(),
    null==U||U()},
    [U]),
    X=n.filter(e=>M(e.value));
    o.useLayoutEffect(()=>{if(c){var e;null===(e=j.current)||void 0===e||e.focus()}},
    [c,
    j]);
    let J=(0,
    _.useRedesignIconContext)().enabled;return(0,
    a.jsx)(p.y,
    {spacing:0,
    animation:p.y.Animation.NONE,
    
    shouldShow:F,
    onRequestOpen:()=>{W(!0)},
    onRequestClose:()=>{W(!1)},
    
    renderPopout:e=>{let{closePopout:r,
    position:i,
    updatePosition:o}=e;
    return(0,
    a.jsx)(L,
    {className:C,
    closeOnSelect:w,
    maxVisibleItems:u,
    width:null!=f?f:H,
    isSelected:M,
    
    closePopout:r,
    buttonHeight:null!=Y?Y:0,
    onSelect:q,
    options:n,
    serialize:k,
    renderOptionLabel:S,
    
    optionClassName:x,
    updatePosition:o,
    popoutPosition:i})},
    position:N,
    
    layerContext:D,
    children:(e,
    n)=>{let{onClick:o,
    onKeyDown:u,
    ...c}=e,
    
    {isShown:f,
    position:p}=n,
    m=f?_.ChevronSmallUpIcon:_.ChevronSmallDownIcon,
    g=J?18:24;return(0,
    a.jsxs)
    (d.P,
    {role:\"button\",
    \"aria-disabled\":s,
    innerRef:e=>{j.current=e,
    z.current=e}
    ,
    onClick:s?void 0:e=>{o(e),
    W(!F)},
    onKeyDown:e=>{\"ArrowDown\"===e.key?W(!0):\"Escape\"===e.key&&(e.stopPropagation(),
    W(!1)),
    
    u(e)},
    ...c,
    className:l()(b.select,
    i,
    {[b.open]:f,
    [b.disabled]:s,
    [b.selectPositionTop]:\"top\"
    ===p,
    [b.lookFilled]:E===v.q.FILLED}),
    \"aria-haspopup\":\"listbox\",
    \"aria-expanded\":f,
    \"aria-label\":G,
    \
    "aria-labelledby\":Z,
    children:[X.length>0?(0,
    a.jsx)(_.Text,
    {className:b.value,
    variant:\"text-md/medium\",
    
    children:A(X)}):(0,
    a.jsx)(\"span\",
    {className:b.placeholder,
    children:r}),
    (0,
    a.jsxs)(\"div\",
    {className:b.icons,
    children:[h?(0,
    a.jsx)(d.P,
    {role:\"button\",
    \"aria-disabled\":s,
    onClick:Q,
    \"aria-label\":y.intl.string(y.t.VkKicX),
    children:(0,
    a.jsx)(_.XSmallIcon,
    {size:\"xs\",
    color:\"currentColor\",
    className:b.clear})}):null,
    B?null:(0,
    a.jsx)(m,
    {color:\"currentColor\",
    size:\"custom\",
    width:g,
    height:g})]})]})}})}",
    
 * 
 */

export const selectControlFlexStyle = '1 1 40%';
// export default /** @__PURE__ */ RawComponents.Select as (props: SelectProps) => JSX.Element
export default /** @__PURE__ */ RawComponents.SingleSelect as (props: SelectProps) => JSX.Element;