import {
  Button,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  ModalDialog,
  Stack,
} from "@mui/joy";
import Modal from "@mui/joy/Modal";
import { useState } from "react";

export function ChangePasswordModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
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
        <DialogTitle>Change password</DialogTitle>
        <form onSubmit={() => {}}>
          <Stack spacing={2} alignContent={"center"} alignItems={"center"}>
            <FormControl>
              <FormLabel>Old password</FormLabel>
              <Input
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                autoFocus
                required
                type="password"
              />
            </FormControl>
            <FormControl>
              <FormLabel>New password</FormLabel>
              <Input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoFocus
                required
                type="password"
              />
            </FormControl>
            <Button
              type="submit"
              sx={{
                bgcolor: "#AD1747",
                "&:hover": { bgcolor: "#850E35" },
                width: 200,
              }}
            >
              Change password
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}
