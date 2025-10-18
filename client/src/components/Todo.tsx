import { Checkbox, FormControl, FormHelperText } from "@mui/joy";

function Todo() {
  return (
    <div className="flex flex-1 flex-row gap-2">
      <FormControl>
        <Checkbox label="Sample Task" />
        <FormHelperText>Deadline for the task</FormHelperText>
      </FormControl>
    </div>
  );
}

export default Todo;
