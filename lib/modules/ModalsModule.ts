import { RawComponents } from '@lib/components';

export interface ModalSizes {
    SMALL: 'small';
    MEDIUM: 'medium';
    LARGE: 'large';
    DYNAMIC: 'dynamic';
}

// let { transitionState: t, children: n, size: i = "small", role: r = "dialog", className: s, fullscreenOnMobile: T = !0, hideShadow: S = !1, onAnimationEnd: A = h.NOOP, returnRef: N, ...O } = e
export interface ModalRootProps {
    transitionState?: string;
    children?: React.ReactNode | React.ReactNode[];
    // Default is 'dynamic' (null)
    size?: ModalSizes[keyof ModalSizes];
    fullscreenOnMobile?: boolean;
    role?: 'dialog';
}

export interface Modals {
    openModal(cb: ((props: ModalRootProps) => JSX.Element)): Promise<unknown>;
    closeModal(...args: unknown[]): unknown | Promise<unknown>;
    ModalRoot: React.FunctionComponent<ModalRootProps>;
    ModalSize: ModalSizes;
}

export default {
    openModal: RawComponents.openModal,
    closeModal: RawComponents.closeModal,
    ModalRoot: RawComponents.ModalRoot,
    ModalSize: RawComponents.ModalSize
} as Modals;

