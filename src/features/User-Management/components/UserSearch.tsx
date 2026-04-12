import { Search } from "lucide-react";

interface UserSearchProps {
  search: string;
  setSearch: (search: string) => void;
}

export default function UserSearch({ search, setSearch }: UserSearchProps) {
  return (
    <div className="relative">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: "12px", height: "12px", color: "#484858" }}
      />
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-9 pr-4 py-2 text-[#eee9f0] placeholder-[#484858] focus:outline-none transition-colors"
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "12px",
          letterSpacing: "0.02em",
          background: "#07080d",
          border: "1px solid #252638",
          width: "220px",
        }}
        onFocus={(e) =>
          (e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)")
        }
        onBlur={(e) => (e.currentTarget.style.borderColor = "#252638")}
      />
    </div>
  );
}
