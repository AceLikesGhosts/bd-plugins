import { React } from '@lib/components';
import { FormText } from '@lib/components/Form';
import Tooltip from '@lib/components/Tooltip';
import Logger from '@lib/logger';
import { filterDeclarations } from '@lib/utils/Webpack';
import type { Plugin } from 'betterdiscord';
import meta from './config.json';
import { cache, closeWorker, get, inflight, ocr } from './tess';
export { meta };


export const logger = new Logger(meta);

export default class ImageOCR implements Plugin {
    public start(): void {
        logger.log('loading settings');

        (async () => {
            const imageWrapper = await BdApi.Webpack.waitForModule(BdApi.Webpack.Filters.bySource('imageWrapper', 'RESPONSIVE'));
            BdApi.Patcher.after(meta.name, imageWrapper._, 'render', (ctx, [props], ret) => {
                if(!props.src) {
                    return;
                }

                void ocr(props.src);
            });

            logger.log("getting mediaViewerModal");
            const mediaViewerModal = await BdApi.Webpack.waitForModule(BdApi.Webpack.Filters.bySource('MEDIA_MODAL_CLOSE', 'MediaViewerModal'), { raw: true });
            const mediaViewTarget = filterDeclarations(mediaViewerModal, (f) => f?.type && f?.type?.toString()?.includes('keyboardModeEnabled'));
            BdApi.Patcher.after(meta.name, mediaViewTarget, 'type', (ctx, [props], ret) => {
                const orig = ret.props.children as (...args: any[]) => any;
                const proxyUrl = props.item.proxyUrl || props.item.url;
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
                                    if(inflight(proxyUrl)) {
                                        BdApi.UI.showToast('Image is currently being OCR\'d.');
                                        return;
                                    }

                                    navigator.clipboard.writeText(get(proxyUrl)?.text!);
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
        })();
    }

    public async stop() {
        logger.log('saving settings');
        BdApi.Patcher.unpatchAll(meta.name);
        cache.clear();

        (async () => {
            logger.log("stopping ocr");
            await closeWorker();
        });
    }
}

