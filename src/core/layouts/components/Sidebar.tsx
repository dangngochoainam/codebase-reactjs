import { Link, useLocation } from "react-router";
import { useAuthContext } from "@/core/auth/hooks/useAuth";
import { Home, Package, Users, LogIn, UserPlus, Menu, X } from "lucide-react";
import { useState } from "react";

interface MenuItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  requireAuth?: boolean;
}

const menuItems: MenuItem[] = [
  {
    label: "Home",
    path: "/",
    icon: <Home className="w-5 h-5" />,
  },
  {
    label: "Products",
    path: "/products",
    icon: <Package className="w-5 h-5" />,
    requireAuth: true,
  },
  {
    label: "User Management",
    path: "/user-management",
    icon: <Users className="w-5 h-5" />,
    requireAuth: true,
  },
];

const authMenuItems: MenuItem[] = [
  {
    label: "Sign In",
    path: "/signin",
    icon: <LogIn className="w-5 h-5" />,
  },
  {
    label: "Sign Up",
    path: "/signup",
    icon: <UserPlus className="w-5 h-5" />,
  },
];

export default function Sidebar() {
  const location = useLocation();
  const { isAuthenticated, user } = useAuthContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filteredMenuItems = isAuthenticated
    ? menuItems
    : [...menuItems.filter((item) => !item.requireAuth), ...authMenuItems];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white hover:bg-gray-700"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen w-64 bg-gray-900 border-r border-gray-800
          transition-transform duration-300 ease-in-out z-40
          ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-xl font-bold text-white">React App</h2>
            {isAuthenticated && (
              <p className="text-sm text-gray-400 mt-1">Dashboard</p>
            )}
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {filteredMenuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg
                      transition-colors duration-200
                      ${
                        isActive(item.path)
                          ? "bg-blue-600 text-white"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }
                    `}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {isAuthenticated && (
            <div className="p-4 border-t border-gray-800">
              <div className="flex items-center gap-3 px-2">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium text-white truncate">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {user?.email || "Authenticated"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}
