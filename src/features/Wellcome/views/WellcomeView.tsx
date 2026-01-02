import { useAuthContext } from "@/core/auth/hooks/useAuth";
import { Button } from "@/core/components/shadcn/button";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useAuthDispatch } from "@/core/auth/hooks/useAuthDispatch";
import { AuthActionType } from "@/core/auth/types";

export default function WelcomeView() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  const authDispatch = useAuthDispatch();

  const handleSignOut = async () => {
    try {
      await signOut();
      authDispatch({ type: AuthActionType.SIGN_OUT });
      navigate("/signin");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-gray-800 flex-col gap-4">
        <h1 className="text-white text-xl font-bold">
          Welcome To Feature-Based React Project!
        </h1>

        {isAuthenticated ? (
          <>
            <div className="flex items-center gap-2 justify-center">
              <Button variant="outline" onClick={() => navigate("/products")}>
                Products
              </Button>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Button variant="outline" onClick={() => handleSignOut()}>
                Sign Out
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 justify-center">
              <Link
                className="border px-6 py-2 rounded border-white text-white"
                to={{ pathname: "/signin" }}
              >
                Sign In
              </Link>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Link
                className="border px-6 py-2 rounded border-white text-white"
                to={{ pathname: "/signup" }}
              >
                Sign Up
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
