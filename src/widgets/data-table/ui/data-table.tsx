import { getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/shared/ui/checkbox";
import { DataTableToolBar } from "./tool-bar";
import { DataTablePagination } from "./pagination";
import { usePageCount } from "../hooks/use-page-count";
import type { TFilterItem } from "../types/filter";
import { FilterProvider } from "../providers/filter.provider";
import { DataTableBody } from "./body";

interface IDataTableProps<T> {
  enableRowSelection?: boolean;
  columns: ColumnDef<T>[];
  source?: {
    data?: T[];
    meta?: {
      current?: number;
      pageSize?: number;
      total?: number;
    };
  };
  filters?: TFilterItem[];
  search?: string;
  withSearch?: boolean;
  placeholderSearch?: string;
  pagination: {
    page: number;
    perPage: number;
  };
  handleChange?: {
    onFilterChange: (newFilters: Record<string, string | number | undefined>) => void;
    onSortingChange: (sortKey: string, order: "asc" | "desc") => void;
    onPaginationChange: (page: number, perPage: number) => void;
    onSearch: (searchTerm: string) => void;
  };
}

export const DataTable = <T,>({
  columns,
  enableRowSelection,
  source,
  filters,
  search,
  placeholderSearch = "Search...",
  withSearch = true,
  handleChange,
  pagination,
}: IDataTableProps<T>) => {
  const { data } = source || {};
  const pageCount = usePageCount(source?.meta?.total, pagination.perPage);

  const selectableColumn: ColumnDef<T> = {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };

  const table = useReactTable({
    data: data || [],
    columns: enableRowSelection ? [selectableColumn, ...columns] : columns,
    getCoreRowModel: getCoreRowModel(),
    pageCount,
    state: {
      pagination: {
        pageIndex: pagination.page,
        pageSize: pagination.perPage,
      },
    },
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
  });

  return (
    <div className="flex flex-col gap-2">
      {/* Table toolbar */}
      <FilterProvider
        onFilterChange={handleChange?.onFilterChange}
        search={search}
        onSearch={handleChange?.onSearch}
        filters={filters}
        withSearch={withSearch}
        placeholderSearch={placeholderSearch}
      >
        <DataTableToolBar />
      </FilterProvider>

      {/* Table components */}
      <div className="overflow-hidden rounded-md border my-2">
        <DataTableBody table={table} />
      </div>

      {/* Pagination */}
      <div className="flex justify-end flex-col items-center gap-2 md:flex-row">
        <DataTablePagination
          table={table}
          onPaginationChange={handleChange?.onPaginationChange ?? (() => {})}
          total={source?.meta?.total ?? 0}
        />
      </div>
    </div>
  );
};
