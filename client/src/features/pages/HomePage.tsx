import { Button } from "@mui/joy";
import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center flex-1 gap-2">
        <h3 className="font-sans text-2xl font-extrabold">CheckIt</h3>
        <h2 className="font-sans mb-3 max-w-sm text-center">
          Your personal space for weekly goals, tasks, and focus. Track what
          matters, finish your week strong, and never lose sight of what’s
          important.
        </h2>
        <div className="flex flex-row gap-3">
          <Button variant="outlined" component={Link} to="/register">
            Register
          </Button>
          <Button variant="outlined" component={Link} to="/login">
            Login
          </Button>
        </div>
      </div>
    </>
  );
}

export default HomePage;
