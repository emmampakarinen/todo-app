import { Button, Input } from "@mui/joy";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AppTitle } from "../../components/AppTitle";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      return;
    }

    try {
      await login({ username, password });
      console.log("Logging in with:", { username, password });

      setUsername("");
      setPassword("");

      navigate("/home", { replace: true }); // Redirect to home page after login
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col flex-1 items-center justify-center">
        <AppTitle />
        <div className="flex flex-col justify-center items-center rounded-lg border-4 bg-[var(--color-blush-100)] border-[var(--color-blush-300)] shadow-lg p-8 w-full max-w-md">
          <h1 className="mb-4 font-bold">Login</h1>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <Input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></Input>
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>

            <div className="flex flex-1 mt-3 justify-center items-center">
              <Button
                variant="solid"
                sx={{
                  bgcolor: "#AD1747",
                  "&:hover": { bgcolor: "#850E35" },
                }}
                type="submit"
              >
                Login
              </Button>
            </div>
          </form>
        </div>
        <div className="flex flex-col items-center justify-center mt-12 gap-1">
          <h1>Don't have an account yet?</h1>
          <Button
            variant="solid"
            sx={{
              bgcolor: "#EE6983",
              "&:hover": { bgcolor: "#B54E62" },
            }}
            component={Link}
            to="/register"
          >
            Create an account
          </Button>
        </div>
      </div>
    </>
  );
}
