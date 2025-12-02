import { Button } from "@mui/joy";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/hooks/useAuth";
import { AppTitle } from "../components/AppTitle";

export function LandingPage() {
  const { user } = useAuth();

  const isLoggedIn = Boolean(user);

  return (
    <>
      <div className="flex flex-col items-center justify-center flex-1 gap-2">
        <AppTitle />
        <h2 className="font-sans mb-4 max-w-sm text-center">
          Your personal space for weekly goals, tasks, and focus. Track what
          matters, finish your week strong, and never lose sight of what’s
          important.
        </h2>
        {isLoggedIn ? null : (
          <div className="flex flex-row gap-3">
            <Button
              variant="solid"
              sx={{
                bgcolor: "#AD1747",
                "&:hover": { bgcolor: "#850E35" },
              }}
              component={Link}
              to="/register"
            >
              Register
            </Button>
            <Button
              variant="solid"
              sx={{
                bgcolor: "#AD1747",
                "&:hover": { bgcolor: "#850E35" },
              }}
              component={Link}
              to="/login"
            >
              Login
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
