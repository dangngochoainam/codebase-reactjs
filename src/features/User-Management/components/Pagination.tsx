import { Button } from "@/core/components/shadcn/button";
import type { PaginationModel } from "@/core/types/base";

interface PaginationProps {
  pagination: PaginationModel;
  setPagination: (pagination: PaginationModel) => void;
}

export default function Pagination(props: PaginationProps) {
  const { pagination, setPagination } = props;
  // const handlePageChange = (page: number) => {
  //   setPagination({ ...pagination, page });
  // };
  const handleLimitChange = (limit: number) => {
    setPagination({ ...pagination, limit });
  };
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="relative">
        <select
          onChange={(e) => handleLimitChange(Number(e.target.value))}
          className="bg-[#21233d] border border-gray-700 text-gray-300 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 appearance-none pr-8"
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-400">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          className="h-8 w-8 p-0 bg-[#21233d] border-gray-700 text-gray-300"
        >
          1
        </Button>
      </div>
    </div>
  );
}

import { ChevronDown } from "lucide-react";
