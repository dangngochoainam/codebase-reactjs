import { Outlet } from "react-router";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useAuthContext } from "@/core/auth/hooks/useAuth";

export default function FullLayout() {
  const { isAuthenticated } = useAuthContext();

  return (
    <div className="flex min-h-screen bg-gray-950">
      {isAuthenticated && <Sidebar />}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
