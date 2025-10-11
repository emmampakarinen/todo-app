import { Button } from "@mui/joy";
import { currentUser } from "../shared/lib/auth";
import WeekSummary from "../components/WeekSummary";
import TodoLists from "../components/TodoLists";
import OverDueTasks from "../components/OverDueTasks";

export function HomePage() {
  const user = currentUser();

  return (
    <>
      <div className="flex flex-row items-stretch justify-center flex-1 gap-2 p-5">
        <WeekSummary />
        <div className="flex flex-1 flex-col items-stretch justify-center border-4 border-pink-600 rounded-lg p-4">
          <h3 className="font-sans text-2xl font-extrabold">
            Welcome back {user.username}!
          </h3>
          <div className="flex flex-row items-stretch justify-center flex-1 gap-2 p-5">
            <TodoLists />
            <OverDueTasks />
          </div>
          <div className="flex flex-row justify-evenly gap-4">
            <Button>New list</Button>
            <Button>New task</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
