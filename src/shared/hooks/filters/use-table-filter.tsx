import { useCallback, useRef, useState } from "react";
import { debounce } from "lodash-es";
import { useQueryParams } from "./use-query-param";

export function useTableFilter<
  TFilters extends {
    page: number;
    perPage: number;
    search: string;
    sort?: string;
    order?: "asc" | "desc";
    [key: string]: string | number | boolean | undefined;
  },
>() {
  const defaultValues: TFilters = {
    page: 1,
    perPage: 10,
    search: "",
  } as TFilters;

  const { search, setParams } = useQueryParams<TFilters>();
  const { filters, updateFilters } = useFilters<TFilters>({ ...defaultValues, ...search });

  const debouncedSearch = useRef(
    debounce((value: string) => {
      updateFilters({ search: value } as Partial<TFilters>);
      setParams({ ...filters, search: value, page: 1, perPage: 10 } as Partial<TFilters>);
    }, 500),
  ).current;

  const handleChange = {
    onFilterChange: (newFilters: Partial<TFilters>) => {
      updateFilters(newFilters);
      setParams({ ...filters, ...newFilters, page: 1, perPage: 10 });
    },
    onSortingChange: (sort: string, order: "asc" | "desc") => {
      updateFilters({ sort, order } as Partial<TFilters>);
      setParams({ ...filters, sort, order, page: 1, perPage: 10 } as Partial<TFilters>);
    },
    onPaginationChange: (page: number, perPage: number) => {
      updateFilters({ page, perPage } as Partial<TFilters>);
      setParams({ ...filters, page, perPage } as Partial<TFilters>);
    },
    onSearch: (searchTerm: string) => {
      debouncedSearch(searchTerm);
    },
  };

  const pagination = {
    page: filters.page,
    perPage: filters.perPage,
  };

  return { search: filters.search, handleChange, pagination, filters };
}

export function useFilters<TFilters extends Record<string, string | number | boolean | undefined>>(
  initial: TFilters,
) {
  const [filters, setFilters] = useState<TFilters>(initial);

  const updateFilters = useCallback((newFilters: Partial<TFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  return { filters, updateFilters };
}
