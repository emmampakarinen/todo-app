import { useRef, useState, type ChangeEvent } from "react";
import { Avatar, Button, Box } from "@mui/joy";
import { deleteImage, uploadImage } from "../shared/lib/user";
import { getToken, setAuth } from "../shared/lib/token";

export function AvatarWithMenu({ userImg }: { userImg?: string }) {
  const [open, setOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(userImg);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const response = await uploadImage(formData);
    setUploading(false);
    console.log("Upload response:", response);

    if (response.status === "error") {
      // handle error
      alert(response.message);
      setPreviewUrl(userImg); // revert to previous image
    }

    const updatedUser = response.data;
    setPreviewUrl(updatedUser.profileImageUrl);

    const token = getToken();
    if (token) {
      // Update user info in localStorage
      setAuth(token, updatedUser);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    const response = await deleteImage();
    setDeleting(false);
    console.log("Delete response:", response);

    if (response.status === "error") {
      // handle error
      alert(response.message);
      return;
    }

    const updatedUser = response.data;
    setPreviewUrl(updatedUser.profileImageUrl);

    const token = getToken();
    if (token) {
      // Update user info in localStorage
      setAuth(token, updatedUser);
    }
  };

  return (
    <Box
      className="flex flex-col items-center gap-2"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Box sx={{ position: "relative", display: "inline-block" }}>
        <Avatar sx={{ width: 100, height: 100 }} src={previewUrl} />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {open && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
              borderRadius: "50%",
            }}
          >
            <Button
              size="sm"
              variant="soft"
              onClick={handleUploadClick}
              loading={uploading}
            >
              Upload
            </Button>
            {previewUrl ? (
              <Button
                size="sm"
                variant="soft"
                color="danger"
                onClick={handleDelete}
                loading={deleting}
              >
                Delete
              </Button>
            ) : null}
          </Box>
        )}
      </Box>
    </Box>
  );
}
