import { useMemo } from "react";

export const usePageCount = (totalItems?: number, itemsPerPage?: number) => {
  return useMemo(() => {
    if (!totalItems || !itemsPerPage) return 0;
    return Math.ceil(totalItems / itemsPerPage);
  }, [totalItems, itemsPerPage]);
};
