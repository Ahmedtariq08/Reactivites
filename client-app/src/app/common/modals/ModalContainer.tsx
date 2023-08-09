import { useStore } from "app/stores/store";
import { observer } from "mobx-react-lite"
import { Modal } from "semantic-ui-react";

const ModalContainer = () => {
    const { modalStore } = useStore();
    return (
        <Modal dimmer='blurring' open={modalStore.modal.open} onClose={modalStore.closeModal} size="mini">
            <Modal.Content>
                {modalStore.modal.body}
            </Modal.Content>
        </Modal>
    )
}

export default observer(ModalContainer);