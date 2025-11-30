import { Button, DialogTitle, ModalDialog } from "@mui/joy";
import Modal from "@mui/joy/Modal";

type DeleteProfileModalProps = {
  open: boolean;
  onClose: () => void;
  onDeleteUser: () => void;
};

export function DeleteProfileModal({
  open,
  onClose,
  onDeleteUser,
}: DeleteProfileModalProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onDeleteUser();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="flex items-center justify-center"
    >
      <ModalDialog
        className="
          bg-white 
          rounded-2xl 
          shadow-2xl 
          w-100
          max-w-[90%]
          p-6
          items-center
        "
      >
        <DialogTitle sx={{ textAlign: "center" }}>
          Are you sure you want to delete your profile?
        </DialogTitle>

        <Button
          type="submit"
          sx={{
            bgcolor: "#AD1747",
            "&:hover": { bgcolor: "#850E35" },
            width: 200,
          }}
          onClick={handleSubmit}
        >
          Yes, I want to delete my profile and todo's
        </Button>
      </ModalDialog>
    </Modal>
  );
}
