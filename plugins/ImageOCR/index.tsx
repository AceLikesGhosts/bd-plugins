import { React } from '@lib/components';
import { FormText } from '@lib/components/Form';
import Tooltip from '@lib/components/Tooltip';
import Logger from '@lib/logger';
import { filterDeclarations } from '@lib/utils/Webpack';
import type { Plugin } from 'betterdiscord';
import meta from './config.json';
import { cache, closeWorker, inFlight, ocr } from './tess';
export { meta };


export const logger = new Logger(meta);

export default class DadscordAutoBans implements Plugin {
    public start(): void {
        logger.log('loading settings');

        const mediaGalleryRendererThing = BdApi.Webpack.getModule(
            BdApi.Webpack.Filters.combine(
                BdApi.Webpack.Filters.bySource('ZOOM_IN_IMAGE_PRESSED', 'isDiscordAssetUrl'),
                // to remove the memo that shows up with this. why it shows up? don't fucking know. retarded.
                BdApi.Webpack.Filters.not(BdApi.Webpack.Filters.byKeys('type'))
            ), { raw: true }
        );

        const mediaGalleryRendererThingTarget = filterDeclarations(mediaGalleryRendererThing, (f) => f?.type && f?.type?.toString()?.includes('disableArrowKeySeek'));
        BdApi.Patcher.after(meta.name, mediaGalleryRendererThingTarget, 'type', (ctx, [props], ret) => {
            const media = props.media as {
                proxyUrl: string;
                type: string;
            };

            if(!media || media.type !== 'IMAGE') {
                return;
            }

            void ocr(media.proxyUrl);
        });

        const mediaViewerModal = BdApi.Webpack.getModule(BdApi.Webpack.Filters.bySource('MEDIA_MODAL_CLOSE', 'MediaViewerModal'), { raw: true });
        const mediaViewTarget = filterDeclarations(mediaViewerModal, (f) => f?.type && f?.type?.toString()?.includes('keyboardModeEnabled'));
        BdApi.Patcher.after(meta.name, mediaViewTarget, 'type', (ctx, [props], ret) => {
            const orig = ret.props.children as (...args: any[]) => any;
            const proxyUrl = props.item.proxyUrl;
            ret.props.children = (...args: any[]) => {
                const origRet = orig.call(ctx, ...args) as {
                    props: {
                        children: any[];
                    };
                };

                origRet.props.children.splice(0, 0, <Tooltip
                    text="Copy OCR"
                    children={((...args: any[]) => {
                        return <div {...args}
                            onClick={(async () => {
                                if(inFlight.has(proxyUrl)) {
                                    BdApi.UI.showToast('Image is currently being OCR\'d.');
                                    return;
                                }

                                navigator.clipboard.writeText(cache.get(proxyUrl)?.text!);
                                BdApi.UI.showToast('Copied to clipboard.', {
                                    type: 'success'
                                });
                            })}
                        >
                            <FormText>
                                Copy OCR
                            </FormText>
                        </div>;
                    })}>
                </Tooltip>);

                return origRet;
            };
        });
    }

    public async stop() {
        logger.log('saving settings');
        BdApi.Patcher.unpatchAll(meta.name);
        cache.clear();

        await closeWorker();
    }
}

