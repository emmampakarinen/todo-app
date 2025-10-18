import { Button } from "@mui/joy";
import { currentUser } from "../shared/lib/auth";
import WeekSummary from "../components/WeekSummary";
import TodoLists from "../components/OverDueTodos";
import { useState } from "react";
import NewListModal from "../components/NewListModal";

export function HomePage() {
  const user = currentUser();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className=" flex-col items-stretch justify-center gap-2 p-5">
        <h1>week number</h1>
        <h3 className="font-sans text-2xl font-extrabold">
          Welcome back {user.username}!
        </h3>
      </div>
      <div className="flex flex-row justify-center flex-1 gap-2 p-5">
        <WeekSummary />
        <div className="flex flex-1 flex-col items-stretch justify-center p-2">
          <div className="flex flex-row items-stretch justify-center flex-1 gap-2 mt-2 mb-2">
            <TodoLists />
          </div>
          <div className="flex flex-row justify-evenly gap-4">
            <Button onClick={() => setOpen(true)}>New list</Button>
            <Button>New task</Button>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <NewListModal open={open} onClose={() => setOpen(false)} />
      </div>
    </>
  );
}

export default HomePage;
