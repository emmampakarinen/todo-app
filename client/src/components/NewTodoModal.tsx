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
import { createTodoApi } from "../shared/lib/todo";
import type { Todo } from "../types/todo";

function NewTodoModal({
  open,
  onClose,
  lists,
  onTodoCreated,
}: {
  open: boolean;
  onClose: () => void;
  lists: List[];
  onTodoCreated: (newTodo: Todo) => void;
}) {
  const [todoName, setTodoName] = useState("");
  const [todoListId, setTodoListId] = useState(0);
  const [note, setNote] = useState("");
  const [dueAt, setDueAt] = useState<Dayjs | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const dueDate = dueAt ? dueAt.format("YYYY-MM-DD") : null;
    try {
      const newTodo = await createTodoApi({
        todoListId: todoListId,
        title: todoName,
        description: note,
        dueAt: dueDate || undefined,
      });
      console.log("Todo created:", { todoName, todoListId, note, dueAt });

      onTodoCreated(newTodo);
      setTodoName("");
      setTodoListId(0);
      setNote("");
      setDueAt(null);
      onClose();
    } catch (error) {
      console.error("Error creating todo:", error);
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
              <Select<number>
                placeholder="Select list"
                required
                value={todoListId}
                onChange={(_, value) => {
                  if (value != null) {
                    setTodoListId(value);
                  }
                }}
              >
                {lists.map((list) => (
                  <Option key={list.id} value={list.id}>
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

            <Button
              sx={{
                bgcolor: "#AD1747",
                "&:hover": { bgcolor: "#850E35" },
              }}
              type="submit"
            >
              Submit
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}

export default NewTodoModal;
