import { useState } from "react";
import { Avatar, Button, Box } from "@mui/joy";

export function AvatarWithMenu() {
  const [open, setOpen] = useState(false);

  const handleUpload = () => {
    // TODO: open file picker
  };

  const handleDelete = () => {
    // TODO: delete avatar
  };

  return (
    <Box
      className="flex flex-col items-center gap-2"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Box sx={{ position: "relative", display: "inline-block" }}>
        <Avatar sx={{ width: 100, height: 100 }} />

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
            <Button size="sm" variant="soft" onClick={handleUpload}>
              Upload
            </Button>
            <Button
              size="sm"
              variant="soft"
              color="danger"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
