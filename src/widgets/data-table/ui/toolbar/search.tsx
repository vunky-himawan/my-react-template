import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { useFilter } from "../../providers/filter.provider";

export const Search = () => {
  const { onSearch, placeholderSearch, search } = useFilter();

  return (
    <div className="w-full flex flex-col md:flex-row items-center gap-2">
      <Input
        placeholder={placeholderSearch}
        defaultValue={search}
        onChange={(e) => onSearch && onSearch(e.target.value)}
      />
      <Button className="w-full md:w-auto">
        Search
        <SearchIcon />
      </Button>
    </div>
  );
};
