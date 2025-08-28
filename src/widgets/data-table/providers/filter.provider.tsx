import { createContext, useContext } from "react";
import type { TFilterItem } from "../types/filter";

interface IFilterContext {
  search: string;
  onSearch: (value: string) => void;
  onFilterChange: (newFilters: Record<string, string | number | undefined>) => void;
  placeholderSearch: string;
  withSearch?: boolean;
  filters?: TFilterItem[];
  setIsUnknownFilter?: (isUnknownFilter: boolean) => void;
  isUnknownFilter?: boolean;
}

const FilterContext = createContext<IFilterContext | undefined>(undefined);

interface FilterProviderProps {
  children: React.ReactNode;
  search?: string;
  filters?: TFilterItem[];
  onSearch?: (value: string) => void;
  onFilterChange?: (newFilters: Record<string, string | number | undefined>) => void;
  placeholderSearch?: string;
  withSearch?: boolean;
  setIsUnknownFilter?: (isUnknownFilter: boolean) => void;
  isUnknownFilter?: boolean;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({
  children,
  search = "",
  onSearch,
  placeholderSearch = "Search...",
  withSearch,
  filters,
  isUnknownFilter,
  setIsUnknownFilter,
  onFilterChange,
}) => {
  if (!onSearch || !onFilterChange) {
    throw new Error("SearchProvider is missing required props");
  }

  return (
    <FilterContext.Provider
      value={{
        search,
        onSearch,
        placeholderSearch,
        withSearch,
        filters,
        isUnknownFilter,
        setIsUnknownFilter,
        onFilterChange,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }

  return context;
};
