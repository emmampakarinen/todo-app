import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AppTitle() {
  const navigate = useNavigate();

  return (
    <div
      className="flex-row items-center justify-center flex mb-6 gap-2 cursor-pointer"
      onClick={() => navigate("/")}
    >
      <h1 className="font-sans text-6xl font-extrabold">checkit</h1>
      <Check size={64} color="#AD1747" />
    </div>
  );
}
