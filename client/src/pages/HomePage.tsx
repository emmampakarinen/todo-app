import { currentUser } from "../shared/lib/auth";

export function HomePage() {
  const user = currentUser();

  return (
    <>
      <div className="flex flex-col items-center justify-center flex-1 gap-2">
        <h3 className="font-sans text-2xl font-extrabold">
          Welcome back {user.username}!
        </h3>
      </div>
    </>
  );
}

export default HomePage;
