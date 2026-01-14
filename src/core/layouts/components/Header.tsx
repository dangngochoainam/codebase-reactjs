import { useAuthContext } from "@/core/auth/hooks/useAuth";
import { useAuthDispatch } from "@/core/auth/hooks/useAuthDispatch";
import { AuthActionType } from "@/core/auth/types";
import { useNavigate } from "react-router";
import { useAuth } from "@/features/Wellcome/hooks/useAuth";

export default function Header() {
  const { isAuthenticated } = useAuthContext();
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      dispatch({ type: AuthActionType.SIGN_OUT });
      navigate("/signin");
    } catch (error) {
      console.error("Sign out error:", error);
      dispatch({ type: AuthActionType.SIGN_OUT });
      navigate("/");
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800 shadow-lg">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <p className="text-gray-300">
            Developed by <b className="text-white">Nam DNH</b>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Show in Github
          </a>

          {isAuthenticated && (
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
