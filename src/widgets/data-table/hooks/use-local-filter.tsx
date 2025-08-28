import { useQueryParams } from "@/shared/hooks/filters/use-query-param";
import { useFilters } from "@/shared/hooks/filters/use-table-filter";
import { useState } from "react";

export function useLocalFilters<
  TLocalFilter extends {
    search?: string | number | undefined;
    page?: string | number | undefined;
    perPage?: string | number | undefined;
    [key: string]: string | number | undefined;
  },
>(initial: TLocalFilter) {
  const [filters, setFilters] = useState<TLocalFilter>(initial);
  const { updateFilters } = useFilters<TLocalFilter>(initial);
  const { setParams } = useQueryParams<TLocalFilter>();

  const setFilter = (key: keyof TLocalFilter, value: TLocalFilter[keyof TLocalFilter]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    const params: Partial<TLocalFilter> = {};

    if (filters.search && filters.search !== "") {
      params.search = filters.search;
    }

    params.page = filters.page ?? 1;

    params.perPage = filters.perPage ?? 10;

    updateFilters(params);
    setParams(params);
    setFilters(params as TLocalFilter);
  };

  return {
    filters,
    setFilter,
    resetFilters,
  };
}
