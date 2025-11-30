import {
  Button,
  DialogTitle,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  ModalDialog,
  Stack,
} from "@mui/joy";
import Modal from "@mui/joy/Modal";
import { useState } from "react";

type ChangePasswordModalProps = {
  open: boolean;
  onClose: () => void;
  onChangePassword: (oldPassword: string, newPassword: string) => void;
};

export function ChangePasswordModal({
  open,
  onClose,
  onChangePassword,
}: ChangePasswordModalProps) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordsMatch = newPassword === confirmPassword;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onChangePassword(oldPassword, newPassword);
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
        <DialogTitle>Change password</DialogTitle>
        <form onSubmit={handleSubmit}>
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
              <FormHelperText>Min. 8 characters</FormHelperText>
            </FormControl>
            <FormControl error={!passwordsMatch && confirmPassword.length > 0}>
              <Input
                placeholder="Re-enter new password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {!passwordsMatch && confirmPassword.length > 0 && (
                <FormHelperText>Password does not match</FormHelperText>
              )}
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
