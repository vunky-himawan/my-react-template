import { createContext, useContext } from "react";
import type { TFilterItem } from "../types/filter";

interface IFilterContext {
  onFilterChange: (newFilters: Record<string, string | number | undefined>) => void;
  filters?: TFilterItem[];
  setIsUnknownFilter?: (isUnknownFilter: boolean) => void;
  isUnknownFilter?: boolean;
}

const FilterContext = createContext<IFilterContext | undefined>(undefined);

interface FilterProviderProps {
  children: React.ReactNode;
  filters?: TFilterItem[];
  onFilterChange?: (newFilters: Record<string, string | number | undefined>) => void;
  setIsUnknownFilter?: (isUnknownFilter: boolean) => void;
  isUnknownFilter?: boolean;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({
  children,
  filters,
  isUnknownFilter,
  setIsUnknownFilter,
  onFilterChange,
}) => {
  if (!onFilterChange) {
    throw new Error("SearchProvider is missing required props");
  }

  return (
    <FilterContext.Provider
      value={{
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
