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
import { useState, type FormEvent } from "react";
import { createListApi } from "../shared/lib/lists";

function NewListModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [listName, setListName] = useState("");
  const [listDescription, setListDescription] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!listName || !listDescription) {
      return;
    }

    try {
      await createListApi({ name: listName, description: listDescription });
      console.log("List created:", { listName, listDescription });

      setListName("");
      setListDescription("");
      onClose();
    } catch (error) {
      console.error("Error creating list:", error);
    }
  };

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
          w-2xl
          max-w-[90%]
          p-6
        "
      >
        <DialogTitle>Create new todo-list</DialogTitle>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Name for the list</FormLabel>
              <Input
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                autoFocus
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>List description</FormLabel>
              <Input
                required
                value={listDescription}
                onChange={(e) => setListDescription(e.target.value)}
              />
            </FormControl>
            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}

export default NewListModal;
