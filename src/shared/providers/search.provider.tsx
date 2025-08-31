import { createContext, useContext } from "react";

interface ISearchContext {
  search: string;
  onSearch: (value: string) => void;
  placeholderSearch: string;
  withSearch?: boolean;
}

const SearchContext = createContext<ISearchContext | undefined>(undefined);

interface SearchProviderProps {
  children: React.ReactNode;
  search?: string;
  onSearch?: (value: string) => void;
  placeholderSearch?: string;
  withSearch?: boolean;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({
  children,
  search = "",
  onSearch,
  placeholderSearch = "Search...",
  withSearch,
}) => {
  if (!onSearch) {
    throw new Error("SearchProvider is missing required props");
  }

  return (
    <SearchContext.Provider
      value={{
        search,
        onSearch,
        placeholderSearch,
        withSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }

  return context;
};
