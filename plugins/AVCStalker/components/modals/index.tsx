import { React } from '@lib/components';
import { logger } from 'plugins/AVCStalker';
import Modals from '@lib/modules/ModalsModule';
import Modal from './Modal';

export interface UserIdProps {
    userIds: string[];
}

/**
 * Opens a popup Modal to show voice states for a user/everyone correlated
 */
export default function openModalFor(userId: string): void {
    logger.info(`opening voicestate modal for ${ userId }`);
    void Modals.openModal((props) => {
        return <Modal {...{ ...props, userId }}/>;
    });
}