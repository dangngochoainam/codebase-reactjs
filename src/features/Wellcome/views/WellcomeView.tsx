import { Button } from "@/core/components/shadcn/button";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { StorageKey } from "@/core/constants/constants";
import { Storage } from "@/core/lib/utils/storage";

export default function WelcomeView() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/signin");
    } catch (error) {
      console.error(error);
    }
  };
  const isLoggedIn = Storage.getItem<string>(StorageKey.ACCESS_TOKEN);
  return (
    <>
      <div className="h-screen flex items-center justify-center bg-gray-800 flex-col gap-4">
        <h1 className="text-white text-xl font-bold">
          Welcome To Feature-Based React Project!
        </h1>
        <div className="flex items-center gap-2 justify-center">
          <Link
            className="border px-6 py-2 rounded border-white text-white"
            to={{ pathname: "/products" }}
          >
            Products
          </Link>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <Button variant="outline" onClick={() => alert("Shadcn Button")}>
            Shadcn Button
          </Button>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <Link
            className="border px-6 py-2 rounded border-white text-white"
            to={{ pathname: "/signin" }}
          >
            Sign In
          </Link>
        </div>
        {isLoggedIn && (
          <div className="flex items-center gap-2 justify-center">
            <Button variant="outline" onClick={() => handleSignOut()}>
              Sign Out
            </Button>
          </div>
        )}

        <div className="flex items-center gap-2 justify-center">
          <Link
            className="border px-6 py-2 rounded border-white text-white"
            to={{ pathname: "/signup" }}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
}
