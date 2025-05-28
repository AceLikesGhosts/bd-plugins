import ADiscordBypasses from '..';
import config from '../config.json';
import IdleStore from '@lib/stores/IdleStore';

export default function Idle(): void {
    BdApi.Patcher.instead(config.name, IdleStore, 'getIdleSince', (_, args, res) =>
        ADiscordBypasses.settings?.Idle ? null : res(...args)
    );

    BdApi.Patcher.instead(config.name, IdleStore, 'isAFK', (_, args, res) =>
        ADiscordBypasses.settings?.Idle ? false : res(...args)
    );

    BdApi.Patcher.instead(config.name, IdleStore, 'isIdle', (_, args, res) =>
        ADiscordBypasses.settings?.Idle ? false : res(...args)
    );
}