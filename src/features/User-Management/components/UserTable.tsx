import type { UserModel } from "../types/user.types";
import UserSearch from "./UserSearch";
import { useNavigate } from "react-router";
import { MONO, SANS } from "@/core/lib/utils/styles";

interface UserTableProps {
  users: UserModel[];
  search: string;
  setSearch: (search: string) => void;
  onDelete: (id: string) => void;
}

const COLS = ["Avatar", "Name", "Email", "Status", "Birthday", "Timezone", "Language", "Actions"];

export default function UserTable({ users, search, setSearch, onDelete }: UserTableProps) {
  const navigate = useNavigate();

  return (
    <div style={{ border: "1px solid #1e1f30" }}>
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ background: "#0a0b12", borderBottom: "1px solid #1e1f30" }}
      >
        <span
          style={{
            ...MONO,
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#eee9f0",
          }}
        >
          Users
        </span>
        <UserSearch search={search} setSearch={setSearch} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#0a0b12", borderBottom: "1px solid #1e1f30" }}>
              {COLS.map((col) => (
                <th
                  key={col}
                  className="px-5 py-3"
                  style={{
                    ...MONO,
                    fontSize: "9px",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    color: "#484858",
                    fontWeight: 500,
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr
                key={user.id}
                style={{
                  borderBottom: i < users.length - 1 ? "1px solid #111118" : "none",
                  transition: "background 0.12s",
                  cursor: "default",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#0e0f18")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                {/* Avatar */}
                <td className="px-5 py-3">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div
                      className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        background: "#c9a84c",
                        color: "#07080d",
                        ...MONO,
                      }}
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </td>

                {/* Name */}
                <td className="px-5 py-3">
                  <span className="text-[#eee9f0] text-sm" style={SANS}>
                    {user.name}
                  </span>
                </td>

                {/* Email */}
                <td className="px-5 py-3">
                  <span className="text-[#8a8898] text-sm" style={MONO}>
                    {user.email}
                  </span>
                </td>

                {/* Status badge */}
                <td className="px-5 py-3">
                  <span
                    className="px-2 py-0.5"
                    style={{
                      ...MONO,
                      fontSize: "9px",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: user.isActive ? "#2dd4a0" : "#484858",
                      background: user.isActive
                        ? "rgba(45,212,160,0.07)"
                        : "rgba(72,72,88,0.12)",
                      border: `1px solid ${
                        user.isActive
                          ? "rgba(45,212,160,0.2)"
                          : "rgba(72,72,88,0.25)"
                      }`,
                    }}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                {/* Birthday */}
                <td className="px-5 py-3">
                  <span className="text-[#8a8898] text-sm" style={MONO}>
                    {user.birthday || "—"}
                  </span>
                </td>

                {/* Timezone */}
                <td className="px-5 py-3">
                  <span className="text-[#8a8898] text-sm" style={MONO}>
                    {user.timezone || "—"}
                  </span>
                </td>

                {/* Language */}
                <td className="px-5 py-3">
                  <span className="text-[#8a8898] text-sm" style={MONO}>
                    {user.language || "—"}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-5 py-3">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => navigate(`/user-management/${user.id}/view`)}
                      className="text-[#4e5be0] hover:text-[#7b86f0] transition-colors"
                      style={{
                        ...MONO,
                        fontSize: "10px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/user-management/${user.id}/edit`)}
                      className="text-[#c9a84c] hover:text-[#dfc470] transition-colors"
                      style={{
                        ...MONO,
                        fontSize: "10px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(user.id)}
                      className="text-[#484858] hover:text-[#e05757] transition-colors"
                      style={{
                        ...MONO,
                        fontSize: "10px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td
                  colSpan={COLS.length}
                  className="px-5 py-12 text-center"
                  style={{
                    ...MONO,
                    fontSize: "11px",
                    letterSpacing: "0.2em",
                    color: "#484858",
                    textTransform: "uppercase",
                  }}
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
