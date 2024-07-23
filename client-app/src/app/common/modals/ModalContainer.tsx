import { Dialog, DialogContent } from "@mui/material";
import { useStore } from "app/stores/store";
import { observer } from "mobx-react-lite";

const ModalContainer = () => {
    const { modalStore } = useStore();
    return (
        <Dialog open={modalStore.modal.open} onClose={modalStore.closeModal}>
            <DialogContent>
                {modalStore.modal.body}
            </DialogContent>
        </Dialog>
    )
}

export default observer(ModalContainer);