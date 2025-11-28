import { Button, FormControl, FormLabel, Input } from "@mui/joy";
import { ChangePasswordModal } from "../components/ChangePasswordModal";
import { useState } from "react";

export function ProfilePage() {
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  return (
    <>
      <div className="flex-1 flex flex-col place-items-center p-4 mt-40">
        <h1 className="text-4xl font-bold mb-4 p-10">Profile Page</h1>
        <div className="border-2-b border items-center p-10 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-4">
          <h2 className="text-xl font-semibold">User Information</h2>
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
          <ChangePasswordModal
            open={openChangePasswordModal}
            onClose={() => setOpenChangePasswordModal(false)}
          />
        </div>
        <div className="mt-10">
          <Button
            variant="solid"
            sx={{
              bgcolor: "#AD1747",
              "&:hover": { bgcolor: "#850E35" },
            }}
            onClick={() => setOpenChangePasswordModal(true)}
          >
            Delete account
          </Button>
        </div>
      </div>
    </>
  );
}
