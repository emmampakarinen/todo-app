import { Button } from "@mui/joy";
import { ChangePasswordModal } from "../components/ChangePasswordModal";
import { useEffect, useState } from "react";
import { DeleteProfileModal } from "../components/DeleteProfileModal";
import { EditUserInfo } from "../components/EditUserInfo";
import { getCurrentUser } from "../shared/lib/auth";
import type { User } from "../types/user";
import { changePassword, deleteUser, updateUser } from "../shared/lib/user";
import { getToken, setAuth } from "../shared/lib/token";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/hooks/useAuth";
import { useToast } from "../auth/hooks/useToast";

export function ProfilePage() {
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const [openDeleteProfileModal, setopenDeleteProfileModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { showToast } = useToast();

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

    let message = "User data updated";
    if (!updateUser) {
      message = "Could not update user data!";
    }
    showToast(message);

    setUser(updatedUser);
  }

  async function handleChangePassword(
    oldPassword: string,
    newPassword: string
  ) {
    console.log("Changing password...");
    const response = await changePassword(oldPassword, newPassword);

    let message = "Password changed";
    if (response.status === "error") {
      message = "Could not change password!";
    }
    showToast(message);
  }

  async function handleDeleteUser() {
    console.log("Deleting user...");
    const response = await deleteUser();

    let message = "User deleted";
    if (response.status === "error") {
      message = "Could not delete user!";
    }
    showToast(message);

    console.log("Deleted user response:", response);
    logout();
    navigate("/");
  }

  return (
    <>
      <div className="flex-1 flex flex-col place-items-center p-10 align-items-center">
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
          onDeleteUser={handleDeleteUser}
        />
      </div>
    </>
  );
}
