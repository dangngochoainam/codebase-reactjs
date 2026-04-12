import type { PaginationModel } from "@/core/types/base";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { MONO } from "@/core/lib/utils/styles";

interface PaginationProps {
  pagination: PaginationModel;
  setPagination: (pagination: PaginationModel) => void;
}

export default function Pagination({ pagination, setPagination }: PaginationProps) {
  const totalPages = Math.ceil(pagination.total / pagination.limit) || 1;

  const handleLimitChange = (limit: number) => {
    setPagination({ ...pagination, limit, page: 1 });
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setPagination({ ...pagination, page });
  };

  return (
    <div className="flex items-center justify-between mt-4 px-1">
      {/* Rows per page */}
      <div className="flex items-center gap-3">
        <span
          style={{
            ...MONO,
            fontSize: "10px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#484858",
          }}
        >
          Rows
        </span>
        <div className="relative">
          <select
            value={pagination.limit}
            onChange={(e) => handleLimitChange(Number(e.target.value))}
            className="appearance-none pl-3 pr-7 py-1.5 text-[#8a8898] focus:outline-none"
            style={{
              ...MONO,
              fontSize: "11px",
              background: "#0e0f18",
              border: "1px solid #252638",
              cursor: "pointer",
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <ChevronDown
            className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ width: "10px", height: "10px", color: "#484858" }}
          />
        </div>
      </div>

      {/* Page navigation */}
      <div className="flex items-center gap-3">
        <span
          style={{
            ...MONO,
            fontSize: "10px",
            letterSpacing: "0.05em",
            color: "#484858",
          }}
        >
          {pagination.page} / {totalPages}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page <= 1}
            className="p-1.5 text-[#484858] hover:text-[#eee9f0] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            style={{ background: "#0e0f18", border: "1px solid #252638" }}
          >
            <ChevronLeft style={{ width: "12px", height: "12px" }} />
          </button>
          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page >= totalPages}
            className="p-1.5 text-[#484858] hover:text-[#eee9f0] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            style={{ background: "#0e0f18", border: "1px solid #252638" }}
          >
            <ChevronRight style={{ width: "12px", height: "12px" }} />
          </button>
        </div>
      </div>
    </div>
  );
}
