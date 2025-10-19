import {
  Button,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  ModalDialog,
  Option,
  Select,
  Stack,
} from "@mui/joy";
import Modal from "@mui/joy/Modal";
import { useState, type FormEvent } from "react";
import type { List } from "../types/list";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

function NewTodoModal({
  open,
  onClose,
  lists,
}: {
  open: boolean;
  onClose: () => void;
  lists: List[];
}) {
  const [todoName, setTodoName] = useState("");
  const [todoList, setTodoList] = useState("");
  const [note, setNote] = useState("");
  const [dueAt, setDueAt] = useState<Dayjs | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // todo: call create list api
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
        <DialogTitle>Create new todo</DialogTitle>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Select which list this todo belongs to</FormLabel>
              <Select placeholder="Select list" required>
                {lists.map((list) => (
                  <Option
                    key={list.id}
                    value={list.name}
                    onChange={() => setTodoList(list.name)}
                  >
                    {list.name}
                  </Option>
                ))}
              </Select>
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

export default NewTodoModal;
