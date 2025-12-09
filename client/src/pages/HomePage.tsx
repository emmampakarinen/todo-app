import { Button } from "@mui/joy";
import WeekSummary from "../components/WeekSummary";
import { useEffect, useState } from "react";
import NewListModal from "../components/NewListModal";
import { getListsApi } from "../shared/lib/lists";
import type { List } from "../types/list";
import NewTodoModal from "../components/NewTodoModal";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import type { Todo } from "../types/todo";

export function HomePage() {
  const [openTodoModal, setOpenTodoModal] = useState(false);
  const [openListModal, setOpenListModal] = useState(false);
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);
  dayjs.extend(weekOfYear);

  // Fetch lists on component mount
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const data = await getListsApi();
        setLists(data);
      } catch (error) {
        console.error("Error fetching lists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, []);

  // Handler for when a new list is created
  const handleListCreated = (newList: List) => {
    setLists((prev) => [...prev, newList]); // Append the new list to the existing lists
  };

  // Handler for when a list is deleted
  const handleListDeleted = (listId: number) => {
    setLists((prev) => prev.filter((l) => l.id !== listId)); // Remove the deleted list from the existing lists
  };

  // Handler for when a new todo is created
  const handleTodoCreated = (newTodo: Todo) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === newTodo.todoListId
          ? {
              ...list,
              todos: [...(list.todos ?? []), newTodo],
            }
          : list
      )
    );
  };

  return (
    <>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex flex-col gap-2 justify-center items-center">
          <h2 className="text-3xl">Week {dayjs().week()}</h2>
        </div>

        <div className="flex-1 min-w-0">
          <WeekSummary
            lists={lists}
            loading={loading}
            onListDeleted={handleListDeleted}
          />
        </div>

        <div className="flex flex-row justify-evenly gap-4">
          <Button
            sx={{
              bgcolor: "#AD1747",
              "&:hover": { bgcolor: "#850E35" },
            }}
            onClick={() => setOpenListModal(true)}
          >
            New list
          </Button>

          {lists.length !== 0 && (
            <Button
              sx={{
                bgcolor: "#AD1747",
                "&:hover": { bgcolor: "#850E35" },
              }}
              onClick={() => setOpenTodoModal(true)}
            >
              New task
            </Button>
          )}
        </div>
      </div>

      <NewListModal
        open={openListModal}
        onClose={() => setOpenListModal(false)}
        onListCreated={handleListCreated}
      />
      <NewTodoModal
        open={openTodoModal}
        onClose={() => setOpenTodoModal(false)}
        lists={lists}
        onTodoCreated={handleTodoCreated}
      />
    </>
  );
}

export default HomePage;
