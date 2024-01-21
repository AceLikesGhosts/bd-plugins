import { React } from '@lib/components/index';
import { logger } from '..';
import config from '../config.json';
import JoinVcIcon from '../components/JoinVcIcon';

export default function PatchUserCallHeader(): void {
    const stringFilter = BdApi.Webpack.Filters.byStrings('.GUILD_HOME');
    const keyFilter = BdApi.Webpack.Filters.byKeys('Icon', 'Title');

    // @ts-expect-error this works, don't care!
    const [titlebarModule, titlebarKey] = BdApi.Webpack.getWithKey((m) => keyFilter(m) && !stringFilter(m));

    BdApi.Patcher.before(config.name, titlebarModule, titlebarKey, (_, [props]) => {
        console.log(props);
        let foundId: string | undefined = undefined;
        for(let i = 0; i < (props as any).children?.length; i++) {
            const child = (props as any).children[i];

            if(child?.props?.channel?.recipients) {
                foundId = child?.props?.channel?.recipients[0];
                break;
            }
        }

        if(!foundId) {
            logger.critical(
                'Failed to find the channel id, indicating it\'s either a server channel' +
                ' or discord completly fucked my code',
                foundId
            );

            return;
        }

        const toolbar = (props as any)?.toolbar;

        if(!toolbar) {
            logger.warn('Failed to find `toolbar` in `props` of `titlebarModule` mod');
            return;
        }

        const icon = <JoinVcIcon userId={foundId} />;

        // idx 1 = start call
        // idx 2 = video call
        // idx 3 = pin
        // idx 4 = groupchat add people button
        try {
            toolbar.props?.children[0]?.splice(4, 0, icon);
            logger.info('Patched titlebar to add icon for current call');
        }
        catch(err) {
            logger.error('Failed to patch titlebar, weird?', err);
        }
    });
}