import { React } from '@lib/components';
import Modals from '@lib/modules/ModalsModule';
import ModalSettings from './ModalSettings';
import type { ModalRootProps } from '@lib/modules/ModalsModule';

export default function Modal(props: ModalRootProps): JSX.Element {
    return (
        <Modals.ModalRoot {...props}>
            <ModalSettings />
        </Modals.ModalRoot>
    );
}