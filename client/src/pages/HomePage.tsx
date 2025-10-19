import { Button } from "@mui/joy";
import { currentUser } from "../shared/lib/auth";
import WeekSummary from "../components/WeekSummary";
import { useEffect, useState } from "react";
import NewListModal from "../components/NewListModal";
import OverDueTodos from "../components/OverDueTodos";
import { getListsApi } from "../shared/lib/lists";
import type { List } from "../types/list";
import NewTodoModal from "../components/NewTodoModal";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";

export function HomePage() {
  const user = currentUser();
  const [openTodoModal, setOpenTodoModal] = useState(false);
  const [openListModal, setOpenListModal] = useState(false);
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);
  dayjs.extend(weekOfYear);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const data = await getListsApi();
        setLists(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching lists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, []);

  return (
    <>
      <div className="flex flex-col items-stretch gap-2 p-5">
        <h2 className="text-3xl">Week {dayjs().week()}</h2>
        <h3 className="font-sans text-2xl font-extrabold">
          Welcome back {user.username}!
        </h3>
      </div>
      <div className="flex w-full flex-1 flex-row items-stretch gap-5 p-5">
        <div className="flex-1 min-w-0">
          <WeekSummary lists={lists} loading={loading} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex h-full flex-col items-stretch gap-4">
            <div className="flex flex-1 items-stretch">
              <OverDueTodos />
            </div>
            <div className="flex flex-row justify-evenly gap-4">
              <Button onClick={() => setOpenListModal(true)}>New list</Button>
              <Button onClick={() => setOpenTodoModal(true)}>New task</Button>
            </div>
          </div>
        </div>
      </div>
      <NewListModal
        open={openListModal}
        onClose={() => setOpenListModal(false)}
      />
      <NewTodoModal
        open={openTodoModal}
        onClose={() => setOpenTodoModal(false)}
        lists={lists}
      />
    </>
  );
}

export default HomePage;
