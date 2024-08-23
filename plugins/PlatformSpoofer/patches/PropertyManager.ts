import PlatformSpoofer, { logger, meta } from '..';
import { PropertiesToSpoofAs, propertyStuff } from '../utils';

export default (): void => {
    logger.log('Patching ProperyManager (getSuperProperties');
    logger.log(propertyStuff, 'getSuperProperties', propertyStuff['getSuperProperties']);

    BdApi.Patcher.instead(meta.name, propertyStuff, 'getSuperProperties', (context, args, orig) => {
        const data = orig.apply(context, args);

        logger.log('called getSuperProperties', data);
        logger.log('finished');
        return {
            ...data,
            browser: PropertiesToSpoofAs[PlatformSpoofer.settings?.type]?.browser,
            os: PropertiesToSpoofAs[PlatformSpoofer.settings?.type]?.os
        };
    });
};