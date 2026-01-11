import UserTable from "../components/UserTable";
import Pagination from "../components/Pagination";
import { useUsers } from "../hooks/useUsers";
import { useEffect, useState } from "react";
import type { UserModel } from "../types/user.types";
import type { PaginationModel } from "@/core/types/base";

export default function UserManagementView() {
  const { getUsers, deleteUser } = useUsers();
  const [users, setUsers] = useState<UserModel[]>([]);
  const [pagination, setPagination] = useState<PaginationModel>({
    page: 1,
    limit: 10,
    total: 0,
  });
  const [search, setSearch] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers({
          page: pagination.page,
          limit: pagination.limit,
          search: search,
          sort: "",
          order: "",
        });
        setUsers(response.users);
        setPagination((prev) => ({
          ...prev,
          total: response.pagination.total,
        }));
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [getUsers, pagination.page, pagination.limit, search, refreshTrigger]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        setRefreshTrigger((prev) => prev + 1);
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen bg-[#1a1c2e]">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-3xl font-light text-gray-100">
          User <span className="font-semibold">Management</span>
        </h1>
      </div>

      <UserTable
        users={users}
        search={search}
        setSearch={setSearch}
        onDelete={handleDelete}
      />
      <Pagination pagination={pagination} setPagination={setPagination} />
    </div>
  );
}
