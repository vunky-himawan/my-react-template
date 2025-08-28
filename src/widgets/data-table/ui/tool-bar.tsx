import { Search } from "./toolbar/search";
import { Filters } from "./toolbar/filter";
import { useFilter } from "../providers/filter.provider";

export const DataTableToolBar = () => {
  const { isUnknownFilter, filters, withSearch } = useFilter();
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
