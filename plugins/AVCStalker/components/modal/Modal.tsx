import { React } from '@lib/components';
import type { ModalRootProps } from '@lib/modules/ModalsModule';
import Modals from '@lib/modules/ModalsModule';

export default function Modal(props: ModalRootProps & { userId: string }): JSX.Element {
    // const [userIds, setUserIds] = React.useState<string[]>([props.userId]);
    // const [showCorrelated, setShowCorrelated] = React.useState<boolean>(true);

    return (
        <Modals.ModalRoot size={Modals.ModalSize.LARGE} {...props}>
            <h1>hi</h1>
            {/* <ModalSettings userIds={userIds} setUserIds={setUserIds} showCorrelated={showCorrelated} setShowCorrelated={setShowCorrelated} />
            <FormDivider />
            <ModalData userIds={userIds} showCorrelated={showCorrelated} /> */}
        </Modals.ModalRoot>
    );
}