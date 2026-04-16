import PlatformSpoofer, { logger, meta } from '..';
import { PropertiesToSpoofAs, propertyStuff } from '../utils';

export default (): void => {
    logger.log('Patching PropertyManager (getSuperProperties');

    BdApi.Patcher.instead(meta.name, propertyStuff, 'getSuperProperties', (context, args, orig) => {
        const data = orig.apply(context, args);


        const spoofed =  {
            ...data,
            browser: PropertiesToSpoofAs[PlatformSpoofer.settings?.type]?.browser,
        };

        console.log('Spoofed super properties:', spoofed);

        return spoofed;
    });
};