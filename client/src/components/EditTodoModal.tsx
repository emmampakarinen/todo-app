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
import { useEffect, useState, type FormEvent } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { editTodoApi } from "../shared/lib/todo";
import type { Todo } from "../types/todo";

function EditTodoModal({
  open,
  onClose,
  todo,
  listName,
  onSaved,
}: {
  open: boolean;
  onClose: () => void;
  todo: Todo;
  listName: string;
  onSaved: (updated: Todo) => void;
}) {
  const [todoName, setTodoName] = useState("");
  const [note, setNote] = useState("");
  const [dueAt, setDueAt] = useState<Dayjs | null>(null);

  useEffect(() => {
    setTodoName(todo.title);

    setNote(todo.description ?? "");
    setDueAt(todo.dueAt ? dayjs(todo.dueAt) : null);
  }, [todo]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const dueDate = dueAt ? dueAt.format("YYYY-MM-DD") : null;

    try {
      const updated = await editTodoApi({
        id: todo.id,
        title: todoName,
        description: note,
        dueAt: dueDate || undefined,
      });
      console.log("Todo edited:", { todoName, note, dueAt });
      onClose();
      onSaved(updated);
    } catch (error) {
      console.error("Error editing todo:", error);
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
        <DialogTitle>Edit todo</DialogTitle>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>List</FormLabel>
              <Input placeholder={listName} disabled />
            </FormControl>
            <FormControl>
              <FormLabel>Todo name</FormLabel>
              <Input
                value={todoName}
                onChange={(e) => setTodoName(e.target.value)}
                autoFocus
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Notes</FormLabel>
              <Input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                autoFocus
                required
              />
            </FormControl>

            <FormControl>
              <FormLabel>Deadline</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select date"
                  value={dueAt}
                  onChange={(newValue) => setDueAt(newValue)}
                ></DatePicker>
              </LocalizationProvider>
            </FormControl>

            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}

export default EditTodoModal;
