import { Button } from "@/core/components/shadcn/button";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import type { UserModel } from "../types/user.types";
import UserSearch from "./UserSearch";
import { useNavigate } from "react-router";

interface UserTableProps {
  users: UserModel[];
  search: string;
  setSearch: (search: string) => void;
  onDelete: (id: string) => void;
}

export default function UserTable({
  users,
  search,
  setSearch,
  onDelete,
}: UserTableProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#21233d] rounded-sm overflow-hidden mt-4 shadow-xl">
      <div className="flex items-center justify-between p-4 border-b border-gray-700/30">
        <h2 className="text-gray-100 text-lg font-normal">Users</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-transparent"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-transparent"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 flex justify-end">
        <UserSearch search={search} setSearch={setSearch} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-300 text-[11px] font-bold uppercase tracking-wider">
              <th className="px-6 py-4">
                <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                  AVATAR{" "}
                  <div className="flex flex-col -gap-1">
                    <ChevronUp className="h-2 w-2" />
                    <ChevronDown className="h-2 w-2" />
                  </div>
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                  NAME{" "}
                  <div className="flex flex-col -gap-1">
                    <ChevronUp className="h-2 w-2" />
                    <ChevronDown className="h-2 w-2" />
                  </div>
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                  E-MAIL{" "}
                  <div className="flex flex-col -gap-1">
                    <ChevronUp className="h-2 w-2" />
                    <ChevronDown className="h-2 w-2" />
                  </div>
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                  IS ACTIVE{" "}
                  <div className="flex flex-col -gap-1">
                    <ChevronUp className="h-2 w-2" />
                    <ChevronDown className="h-2 w-2" />
                  </div>
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                  BIRTH DATE{" "}
                  <div className="flex flex-col -gap-1">
                    <ChevronUp className="h-2 w-2" />
                    <ChevronDown className="h-2 w-2" />
                  </div>
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                  TIMEZONE{" "}
                  <div className="flex flex-col -gap-1">
                    <ChevronUp className="h-2 w-2" />
                    <ChevronDown className="h-2 w-2" />
                  </div>
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                  LANGUAGE{" "}
                  <div className="flex flex-col -gap-1">
                    <ChevronUp className="h-2 w-2" />
                    <ChevronDown className="h-2 w-2" />
                  </div>
                </div>
              </th>

              <th className="px-6 py-4">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/30">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-black/10 transition-colors">
                <td className="px-6 py-3">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-lg">
                      {user.name.charAt(0)}
                    </div>
                  )}
                </td>
                <td className="px-6 py-3 text-gray-300 text-sm font-light">
                  {user.name}
                </td>
                <td className="px-6 py-3 text-gray-300 text-sm font-light">
                  {user.email}
                </td>
                <td className="px-6 py-3 text-gray-300 text-sm font-light">
                  {user.isActive ? "Yes" : "No"}
                </td>
                <td className="px-6 py-3 text-gray-300 text-sm font-light">
                  {user.birthday}
                </td>
                <td className="px-6 py-3 text-gray-300 text-sm font-light">
                  {user.timezone}
                </td>
                <td className="px-6 py-3 text-gray-300 text-sm font-light">
                  {user.language}
                </td>

                <td className="px-6 py-3">
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      onClick={() => navigate(`/user-management/${user.id}/view`)}
                      className="bg-blue-500 hover:bg-blue-600 text-[10px] h-6 px-2 rounded-[2px] font-normal"
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => navigate(`/user-management/${user.id}/edit`)}
                      className="bg-green-500 hover:bg-green-600 text-[10px] h-6 px-2 rounded-[2px] font-normal"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => onDelete(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-[10px] h-6 px-2 rounded-[2px] font-normal"
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
