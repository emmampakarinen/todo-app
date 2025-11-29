import { Button } from "@mui/joy";
import { ChangePasswordModal } from "../components/ChangePasswordModal";
import { useEffect, useState } from "react";
import { DeleteProfileModal } from "../components/DeleteProfileModal";
import { EditUserInfo } from "../components/EditUserInfo";
import { getCurrentUser } from "../shared/lib/auth";
import type { User } from "../types/user";
import { changePassword, updateUser } from "../shared/lib/user";
import { getToken, setAuth } from "../shared/lib/token";

export function ProfilePage() {
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const [openDeleteProfileModal, setopenDeleteProfileModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = getCurrentUser();
    setUser(user);
  }, [user?.email, user?.username]);

  async function handleUpdateUserInfo(email: string, username: string) {
    if (!user) return;
    const updatedUser = await updateUser(email, username);

    const token = getToken();
    if (token) {
      // Update user info in localStorage
      setAuth(token, updatedUser);
    }

    setUser(updatedUser);
  }

  async function handleChangePassword(
    oldPassword: string,
    newPassword: string
  ) {
    console.log("Changing password...");
    const response = await changePassword(oldPassword, newPassword);
    console.log("Password change response:", response);
  }

  return (
    <>
      <div className="flex-1 flex flex-col place-items-center p-4 mt-20 ">
        <h1 className="text-4xl font-bold mb-4 p-10">Profile Page</h1>
        {user ? (
          <EditUserInfo
            user={user}
            onUpdate={handleUpdateUserInfo}
          ></EditUserInfo>
        ) : (
          <p>Loading user information...</p>
        )}

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
          onChangePassword={handleChangePassword}
        />
        <DeleteProfileModal
          open={openDeleteProfileModal}
          onClose={() => setopenDeleteProfileModal(false)}
        />
      </div>
    </>
  );
}
