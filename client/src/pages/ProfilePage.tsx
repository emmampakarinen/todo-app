import { Button, FormControl, FormLabel, Input } from "@mui/joy";
import { ChangePasswordModal } from "../components/ChangePasswordModal";
import { useState } from "react";
import { AvatarWithMenu } from "../components/AvatarWithMenu";
import { DeleteProfileModal } from "../components/DeleteProfileModal";

export function ProfilePage() {
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const [openDeleteProfileModal, setopenDeleteProfileModal] = useState(false);
  return (
    <>
      <div className="flex-1 flex flex-col place-items-center p-4 mt-20 ">
        <h1 className="text-4xl font-bold mb-4 p-10">Profile Page</h1>
        <div className="rounded-lg border-4 bg-[var(--color-blush-100)] border-[var(--color-blush-300)] items-center p-10 shadow-lg w-full max-w-md flex flex-col gap-4 ">
          <h2 className="text-xl font-semibold">User Information</h2>
          <div className="flex flex-col items-center gap-2">
            <AvatarWithMenu></AvatarWithMenu>
          </div>

          <FormControl>
            <FormLabel>E-mail</FormLabel>
            <Input placeholder="Placeholder" />
          </FormControl>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input placeholder="Placeholder" />
          </FormControl>

          <Button variant="solid" color="primary">
            Update profile
          </Button>
        </div>
        <div className="mt-10 flex-col flex gap-4">
          <Button
            variant="solid"
            sx={{
              bgcolor: "#EE6983",
              "&:hover": { bgcolor: "#B54E62" },
            }}
            onClick={() => setOpenChangePasswordModal(true)}
          >
            Change password
          </Button>

          <Button
            variant="solid"
            sx={{
              bgcolor: "#AD1747",
              "&:hover": { bgcolor: "#850E35" },
            }}
            onClick={() => setopenDeleteProfileModal(true)}
          >
            Delete account
          </Button>
        </div>
        <ChangePasswordModal
          open={openChangePasswordModal}
          onClose={() => setOpenChangePasswordModal(false)}
        />
        <DeleteProfileModal
          open={openDeleteProfileModal}
          onClose={() => setopenDeleteProfileModal(false)}
        />
      </div>
    </>
  );
}
