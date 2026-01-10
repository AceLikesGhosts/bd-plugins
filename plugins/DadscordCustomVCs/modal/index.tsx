import { React } from '@lib/components';
import { ModalRoot } from './ModalRoot';

export function openManagementModal() {
    BdApi.UI.showConfirmationModal(
        'ace luvs u',
        <ModalRoot />,
        {
            cancelText: '',
            confirmText: 'Close',
            danger: true
        }
    );
}