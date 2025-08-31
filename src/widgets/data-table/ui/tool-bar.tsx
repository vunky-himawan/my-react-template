import { Search } from "../../toolbar/search";
import { Filters } from "./toolbar/filter";
import { useFilter } from "../providers/filter.provider";
import { useSearch } from "@/shared/providers/search.provider";

export const DataTableToolBar = () => {
  const { isUnknownFilter, filters } = useFilter();
  const { withSearch } = useSearch();

  return (
    <>
      <div className="flex justify-between gap-2">
        {/* Filter component */}
        {!isUnknownFilter && filters && <Filters />}

        {/* Search components */}
        {withSearch && <Search />}
      </div>
    </>
  );
};
