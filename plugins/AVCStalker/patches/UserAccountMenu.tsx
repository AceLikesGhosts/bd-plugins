import { React } from '@lib/components';
import ClearFollowing from '../components/ClearFollowing';
import { logger } from '..';

export default function PatchUserAccountMenu(): void {
    // TODO: make this an actual patch, because this is SHIT dom manip and is
    // fucking DISGUSTING!
    const muteButton = document.querySelector('[aria-label="Mute"]');

    let container: Element = document.getElementById('ClearFollowing')!;
    if(!container) {
        logger.info(`Failed to find 'container' making new one`);
        container = document.createElement('div');
        // container.id = 'ClearFollowing';
        container.setAttribute('id', 'ClearFollowing');
    }

    // TODO: this is shit, and language dependent, TOO BAD!
    const statusContainer = document.querySelector('[aria-label="Set Status"]') as { style?: Record<string, unknown> };
    if(statusContainer?.style?.minWidth !== '87px') {
        statusContainer!.style!.minWidth = '87px';
    }

    logger.info(`inserting container 'beforebegin' on element`, muteButton);
    muteButton?.insertAdjacentElement('beforebegin', container);
    BdApi.ReactDOM.render(<ClearFollowing />, container);
}