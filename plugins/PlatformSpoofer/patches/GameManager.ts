import { logger, meta } from '..';
import { gameConsoleManager } from '../utils';

export default (): void => {
    logger.log('patching consoleGameStore so that console types can be used');
    const remove = (key: keyof typeof gameConsoleManager) => BdApi.Patcher.instead(meta.name, gameConsoleManager, key, () => void 0);

    remove('awaitRemoteTimeout');
    remove('handleAudioStateToggle');
    remove('handleConsoleCommandUpdate');
    remove('handleSessionsChanged');
    remove('handleVoiceStateUpdates');
    remove('handleWaitForRemoteSession');
    remove('maybeConnect');
};