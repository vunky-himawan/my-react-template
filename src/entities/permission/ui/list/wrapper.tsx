import { SearchProvider } from "@/shared/providers/search.provider";
import { useQueryFilters } from "@/shared/hooks/filters/use-query-filters";
import type { FC, PropsWithChildren } from "react";

export const ListPermissionWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { search, handleChange } = useQueryFilters();

  return (
    <SearchProvider
      search={search}
      onSearch={handleChange.onSearch}
      placeholderSearch="Search permissions..."
      withSearch
    >
      <div className="flex flex-col w-full h-full absolute inset-0">{children}</div>
    </SearchProvider>
  );
};
