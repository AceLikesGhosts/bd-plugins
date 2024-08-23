import PlatformSpoofer, { logger, meta } from '..';
import { PropertiesToSpoofAs, propertyStuff } from '../utils';

export default (): void => {
    logger.log('Patching PropertyManager (getSuperProperties');

    BdApi.Patcher.instead(meta.name, propertyStuff, 'getSuperProperties', (context, args, orig) => {
        const data = orig.apply(context, args);

        return {
            ...data,
            browser: PropertiesToSpoofAs[PlatformSpoofer.settings?.type]?.browser,
            os: PropertiesToSpoofAs[PlatformSpoofer.settings?.type]?.os
        };
    });
};