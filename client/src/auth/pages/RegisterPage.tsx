import { Button, FormControl, FormHelperText, Input } from "@mui/joy";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../../shared/lib/auth";
import { AppTitle } from "../../components/AppTitle";

export function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const passwordsMatch = password === confirmPassword;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !username || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const user = await registerApi({ email, username, password });
      console.log("Registered user:", user);
      alert("Registration successful! You can now log in.");
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");

      navigate("/login"); // Redirect to login page after registrarion
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <>
      {" "}
      <div className="flex flex-col flex-1 items-center justify-center">
        <AppTitle />
        <div className="rounded-lg border-4 bg-[var(--color-blush-100)] border-[var(--color-blush-300)] flex flex-col justify-center items-center shadow-lg p-8 w-full max-w-md">
          <h1 className="mb-4 font-bold text-2xl">Register</h1>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <Input
              placeholder="Enter your e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            ></Input>
            <Input
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
            ></Input>
            <FormControl>
              <Input
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              ></Input>
              <FormHelperText>Min. 8 characters</FormHelperText>
            </FormControl>
            <FormControl error={!passwordsMatch && confirmPassword.length > 0}>
              <Input
                placeholder="Re-enter password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {!passwordsMatch && confirmPassword.length > 0 && (
                <FormHelperText>Password does not match</FormHelperText>
              )}
            </FormControl>
            <div className="flex flex-1 mt-3 justify-center items-center">
              <Button
                sx={{
                  bgcolor: "#AD1747",
                  "&:hover": { bgcolor: "#850E35" },
                }}
                type="submit"
              >
                Create account
              </Button>
            </div>
          </form>
        </div>
        <div className="flex flex-col items-center justify-center mt-12 gap-1">
          <h1>Already have an account?</h1>
          <Button
            variant="solid"
            sx={{
              bgcolor: "#EE6983",
              "&:hover": { bgcolor: "#B54E62" },
            }}
            component={Link}
            to="/login"
          >
            Log back in
          </Button>
        </div>
      </div>
    </>
  );
}
