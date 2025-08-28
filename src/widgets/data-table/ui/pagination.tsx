import { Button } from "@/shared/ui/button";
import { Pagination, PaginationContent, PaginationItem } from "@/shared/ui/pagination";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useResponsive } from "@/shared/hooks/use-responsive";
import type { Table } from "@tanstack/react-table";

interface Props<T> {
  onPaginationChange: (page: number, perPage: number) => void;
  total: number;
  table: Table<T>;
}

export const DataTablePagination = <T,>({ onPaginationChange, total, table }: Props<T>) => {
  const { getState, getPageCount } = table;

  const { pageIndex, pageSize } = getState().pagination;
  const currentPage = pageIndex;
  const pageCount = getPageCount();

  const { isLg } = useResponsive();
  const pageRange = !isLg ? 1 : 2;

  const start = pageIndex * pageSize - pageSize + 1;

  const generatePageNumbers = (): (number | string)[] => {
    const maxVisiblePages = !isLg ? 3 : 6; // Maksimal jumlah halaman yang terlihat

    if (pageCount <= maxVisiblePages) {
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    if (currentPage <= pageRange + 1) {
      pages.push(...Array.from({ length: pageRange + 2 }, (_, i) => i + 1), "...");
    } else if (currentPage >= pageCount - pageRange) {
      pages.push(
        "...",
        ...Array.from({ length: pageRange + 2 }, (_, i) => pageCount - pageRange - 1 + i),
      );
    } else {
      pages.push("...", currentPage - pageRange, currentPage, currentPage + pageRange, "...");
    }

    return pages;
  };

  const handleEllipsisClick = (index: number) => {
    const isFirstEllipsis = index === 0;
    const jumpAmount = Math.floor(pageCount / 3); // Jumlah halaman untuk dilompati
    const newPage = isFirstEllipsis
      ? Math.max(1, currentPage - jumpAmount)
      : Math.min(pageCount, currentPage + jumpAmount);
    onPaginationChange(newPage, pageSize);
  };

  const renderPageButton = (page: number | string, index: number) => {
    if (typeof page === "number") {
      return (
        <Button
          variant={currentPage === page ? "default" : "outline"}
          className="h-8 w-8"
          onClick={() => onPaginationChange(page, pageSize)}
        >
          {page}
        </Button>
      );
    }

    return (
      <Button variant="outline" className="h-8 w-8" onClick={() => handleEllipsisClick(index)}>
        {page}
      </Button>
    );
  };

  return (
    <div className="flex w-full md:w-auto flex-col items-center justify-center gap-5 lg:flex-row lg:justify-between">
      <div className="flex w-full flex-col items-center justify-center gap-3 lg:w-min lg:flex-row">
        <p className="lg:w-max lg:flex-1">{`${start ?? 1}-${total ?? 0} of ${total ?? 0} items`}</p>
        <Pagination className="lg:flex-1">
          <PaginationContent className="max-lg:flex max-lg:flex-wrap">
            {/* Tombol kembali ke halaman pertama */}
            <PaginationItem>
              <Button
                variant="outline"
                className="h-8 w-8"
                onClick={() => onPaginationChange(1, pageSize)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              {/* Tombol untuk ke halaman sebelumnya */}
              <Button
                variant="outline"
                className="h-8 w-8"
                onClick={() => onPaginationChange(currentPage - 1, pageSize)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </PaginationItem>

            {/* Tombol-tombol halaman */}
            {generatePageNumbers().map((page, index) => (
              <PaginationItem key={index}>{renderPageButton(page, index)}</PaginationItem>
            ))}

            <PaginationItem>
              {/* Tombol untuk ke halaman berikutnya */}
              <Button
                variant="outline"
                className="h-8 w-8"
                onClick={() => onPaginationChange(currentPage + 1, pageSize)}
                disabled={currentPage === pageCount}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </PaginationItem>
            {/* Tombol ke halaman terakhir */}
            <PaginationItem>
              <Button
                variant="outline"
                className="h-8 w-8"
                onClick={() => onPaginationChange(pageCount, pageSize)}
                disabled={currentPage === pageCount}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
