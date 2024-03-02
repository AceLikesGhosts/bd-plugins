function renderAvatar(e) {
    // Destructuring input object 'e' to extract relevant properties
    let {
        src: src, status: status, size: size,
        statusColor: statusColor, isMobile: isMobile = false,
        isTyping: isTyping = false, typingIndicatorRef: typingIndicatorRef,
        isSpeaking: isSpeaking = false, statusTooltip: statusTooltip = false,
        statusBackdropColor: statusBackdropColor, "aria-hidden": ariaHidden = false,
        "aria-label": ariaLabel
    } = e;

    const statusType = status !== h.StatusTypes.UNKNOWN ? status : null;
    const avatarSpecs = p.getAvatarSpecs(size);
    const typingOffset = statusType !== null ? Math.ceil((avatarSpecs.status * p.TYPING_WIDTH_RATIO - avatarSpecs.status) / 2) : 0;
    const avatarSize = avatarSpecs.size + typingOffset;
    const fillColor = (0, c.useStatusFillColor)(statusType, statusColor);

    return (
        <A
            {...e}
            ariaLabel={ariaLabel}
            ariaHidden={ariaHidden}
            status={statusType}
            specs={avatarSpecs}
            typingOffset={typingOffset}
            children={
                <svg
                    width={avatarSize}
                    height={avatarSize}
                    viewBox={`0 0 ${avatarSize} ${avatarSize}`}
                    className={a(m.mask, m.svg)}
                    aria-hidden={true}
                    children={[
                        <foreignObject
                            x={0}
                            y={0}
                            width={avatarSpecs.size}
                            height={avatarSpecs.size}
                            mask={`url(#${getStatusMaskId(statusType, size, isMobile, isTyping)})`}
                            children={<R src={src} isSpeaking={isSpeaking} />}
                        />,
                        // Tooltip and other elements based on status
                        statusType !== null ? (
                            <d.Tooltip
                                text={statusTooltip ? (0, E.humanizeStatus)(statusType) : null}
                                aria-label={false}
                                position="top"
                                spacing={5 + 1.5 * avatarSpecs.stroke}
                                children={renderTooltipContent}
                            />
                        ) : null
                    ]}
                />
            }
        />
    );

    // Function to render tooltip content
    function renderTooltipContent(e) {
        return (
            <Fragment>
                {statusBackdropColor !== null && renderBackdrop(statusBackdropColor, isMobile, avatarSpecs, statusType)}
                <rect
                    {...e}
                    {...getStatusRectProps(avatarSpecs, statusType, isMobile, isTyping)}
                    fill={fillColor}
                    mask={`url(#${c.getStatusMask(statusType, isMobile, isTyping)})`}
                    className={m.pointerEvents}
                />
                {isTyping ? (
                    <u.Dots
                        ref={typingIndicatorRef}
                        dotRadius={avatarSpecs.status / 4}
                        x={avatarSpecs.size - 1.375 * avatarSpecs.status - avatarSpecs.offset}
                        y={avatarSpecs.size - avatarSpecs.status / 1.333 - avatarSpecs.offset}
                    />
                ) : null}
            </Fragment>
        );
    }
}
