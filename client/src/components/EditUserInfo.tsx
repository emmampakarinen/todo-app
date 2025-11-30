import { Button, FormControl, FormLabel, Input } from "@mui/joy";
import { AvatarWithMenu } from "./AvatarWithMenu";
import type { User } from "../types/user";
import { useState } from "react";

type editUserInfoProps = {
  user: User | null;
  onUpdate: (email: string, username: string) => void;
};

export function EditUserInfo({ user, onUpdate }: editUserInfoProps) {
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  console.log(user?.profileImageUrl);

  function onUpdateClick() {
    if (email && username) {
      // Call the onUpdate prop function to update user info
      onUpdate(email, username);
    }
  }

  return (
    <div className="rounded-lg border-4 bg-[var(--color-blush-100)] border-[var(--color-blush-300)] items-center p-10 shadow-lg w-full max-w-md flex flex-col gap-4 ">
      <h2 className="text-xl font-semibold">User Information</h2>
      <div className="flex flex-col items-center gap-2">
        <AvatarWithMenu userImg={user?.profileImageUrl}></AvatarWithMenu>
      </div>

      <FormControl>
        <FormLabel>E-mail</FormLabel>
        <Input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </FormControl>

      <Button onClick={onUpdateClick} variant="solid" color="primary">
        Update profile
      </Button>
    </div>
  );
}
