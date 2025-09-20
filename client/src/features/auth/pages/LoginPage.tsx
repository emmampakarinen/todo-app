import { Button, Input } from "@mui/joy";
import { Link } from "react-router-dom";

export function LoginPage() {
  return (
    <>
      {" "}
      <div className="flex flex-col flex-1 items-center justify-center">
        <div className="flex flex-col justify-center items-center rounded-xl border-2 shadow-lg p-8 w-full max-w-md">
          <h1 className="mb-4 font-bold">Login</h1>
          <form className="flex flex-col gap-2">
            <Input placeholder="Username"></Input>
            <Input placeholder="Password"></Input>

            <div className="flex flex-1 mt-3 justify-center items-center">
              <Button type="submit">Login</Button>
            </div>
          </form>
        </div>
        <div className="flex flex-col items-center justify-center mt-12 gap-1">
          <h1>Don't have an account yet?</h1>
          <Button variant="outlined" component={Link} to="/register">
            Create an account
          </Button>
        </div>
      </div>
    </>
  );
}
