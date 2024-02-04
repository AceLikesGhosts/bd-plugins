import { React } from '@lib/components/index';
import { Icons } from '..';

type Props = {
    userId: string;
};

export default function JoinVcIcon({ userId }: Props): JSX.Element {
    return (
        <>
            {userId ? <BdApi.Components.Tooltip text='View Voice Logs'>
                {(props: any) =>
                    <div {...props}>
                        <svg
                            width={24}
                            height={24}
                            role='img'
                            // this is only able to be set to a set string from `icons` so this is fine
                            dangerouslySetInnerHTML={{
                                __html: Icons.TfiPencilAlt
                            }}
                            onClick={(() => {
                                
                            })}
                        />
                    </div>}
            </BdApi.Components.Tooltip> : <div id='hi-you-shouldnt-ever-see-this-div-lol'></div>}
        </>
    );
}