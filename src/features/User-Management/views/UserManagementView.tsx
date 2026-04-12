import UserTable from "../components/UserTable";
import Pagination from "../components/Pagination";
import { useUsers } from "../hooks/useUsers";
import { useEffect, useState } from "react";
import type { UserModel } from "../types/user.types";
import type { PaginationModel } from "@/core/types/base";
import { EYEBROW, PAGE_HEADING, MONO } from "@/core/lib/utils/styles";

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
    <div className="min-h-screen bg-app-bg">
      <div className="container mx-auto px-6 py-10">
        {/* Page header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-6 bg-app-accent" />
              <span style={EYEBROW}>Directory</span>
            </div>
            <h1 style={PAGE_HEADING}>User Management</h1>
          </div>
          <span style={{ ...MONO, fontSize: "11px", color: "var(--app-text-dim)", letterSpacing: "0.05em" }}>
            {pagination.total} records
          </span>
        </div>

        <UserTable
          users={users}
          search={search}
          setSearch={setSearch}
          onDelete={handleDelete}
        />
        <Pagination pagination={pagination} setPagination={setPagination} />
      </div>
    </div>
  );
}
