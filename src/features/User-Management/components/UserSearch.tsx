import { Input } from "@/core/components/shadcn/input";

interface UserSearchProps {
  search: string;
  setSearch: (search: string) => void;
}

export default function UserSearch(props: UserSearchProps) {
  const { search, setSearch } = props;
  return (
    <div className="relative w-full max-w-sm ml-auto">
      <Input
        type="text"
        placeholder="Search"
        className="bg-[#1a1c2e] border-none text-white placeholder:text-gray-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
