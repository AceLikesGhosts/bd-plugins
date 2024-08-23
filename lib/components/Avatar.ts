import { RawComponents } from '.';

export interface AvatarProps {
    src: string;
    status: string | null;
    size: string;
    statusColor?: string;
    isMobile?: boolean;
    isTyping?: boolean;
    typingIndicatorRef?: React.RefObject<any>;
    isSpeaking?: boolean;
    statusTooltip?: boolean;
    statusBackdropColor?: string | null;
    'aria-hidden'?: boolean;
    'aria-label'?: string;
}

export type AvatarSizes = {
    'SIZE_16': 'SIZE_16',
    'SIZE_20': 'SIZE_20',
    'SIZE_24': 'SIZE_24',
    'SIZE_32': 'SIZE_32',
    'SIZE_40': 'SIZE_40',
    'SIZE_48': 'SIZE_48',
    'SIZE_56': 'SIZE_56',
    'SIZE_80': 'SIZE_80',
    'SIZE_120': 'SIZE_120',
    'SIZE_152': 'SIZE_152',
    'DEPRECATED_SIZE_30': 'DEPRECATED_SIZE_30',
    'DEPRECATED_SIZE_60': 'DEPRECATED_SIZE_60',
    'DEPRECATED_SIZE_100': 'DEPRECATED_SIZE_100';
}

export default {
    Avatar: RawComponents.Avatar as React.FunctionComponent<AvatarProps>,
    AvatarSizes: BdApi.Webpack.getByKeys('AvatarSizes')?.AvatarSizes as AvatarSizes
};