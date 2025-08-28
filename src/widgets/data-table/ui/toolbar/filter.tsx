import { cn } from "@/shared/lib/utils";
import type { TFilterItem } from "@/widgets/data-table/types/filter";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { NumericInput } from "@/shared/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { CalendarIcon, Filter as FilterIcon } from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Label } from "@/shared/ui/label";
import { useFilter } from "../../providers/filter.provider";
import { useLocalFilters } from "../../hooks/use-local-filter";

type FilterItemProps = {
  filter: TFilterItem;
  onFilterChange: (newFilters: Record<string, string | number | undefined>) => void;
};

export const Filters = () => {
  const { filters, onFilterChange } = useFilter();
  const { resetFilters, filters: localFilters, setFilter } = useLocalFilters({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onFilterChange(localFilters);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          Filters
          <FilterIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            {filters &&
              filters.map((filter) => (
                <div key={filter.key}>
                  <Label htmlFor={filter.key}>{filter.label}</Label>
                  <FilterItems
                    onFilterChange={(newFilter) => {
                      const key = Object.keys(newFilter)[0] as keyof typeof localFilters;
                      const value = newFilter[key];
                      setFilter(key, value as (typeof localFilters)[typeof key]);
                    }}
                    filter={filter}
                  />
                </div>
              ))}
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={resetFilters}>
                Clear
              </Button>
              <Button type="submit">Apply</Button>
            </div>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};

const FilterItems = ({ filter, onFilterChange }: FilterItemProps) => {
  const [singleDate, setSingleDate] = useState<Date>();
  const [dateRange, setDateRange] = useState<DateRange>();

  const handleValueChange = (value: string | number | Date | DateRange | undefined) => {
    let newValue: string | number | undefined;

    if (value instanceof Date) {
      newValue = value.getTime();
    } else if (value && typeof value === "object" && "from" in value && "to" in value) {
      const fromTimestamp = value.from?.getTime();
      const toTimestamp = value.to?.getTime();
      newValue = `${fromTimestamp},${toTimestamp}`;
    } else {
      newValue = value as string | number | undefined;
    }

    onFilterChange({ [filter.key]: newValue });
  };

  switch (filter.type) {
    case "number":
      return (
        <NumericInput
          placeholder={filter.placeholder}
          name={filter.name}
          id={filter.key}
          value={filter.defaultValue?.toString() || ""}
          autoFocus={false}
          maxLength={Number.MAX_SAFE_INTEGER.toString().length}
          onInput={(e) => {
            e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
            handleValueChange(Number(e.currentTarget.value));
          }}
        />
      );
    case "select":
      return (
        <Select
          onValueChange={(value) => handleValueChange(value)}
          defaultValue={filter.defaultValue?.toString()}
        >
          <SelectTrigger>
            <SelectValue placeholder={filter.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {filter.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    case "datepicker":
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn("w-full justify-start bg-transparent text-left font-normal")}
            >
              <CalendarIcon />
              {singleDate ? format(singleDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={singleDate}
              onSelect={(date) => {
                setSingleDate(date);
                handleValueChange(date);
              }}
            />
          </PopoverContent>
        </Popover>
      );
    case "daterange":
      return (
        <div className={cn("grid gap-2")}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn("w-full justify-start bg-transparent text-left font-normal")}
              >
                <CalendarIcon />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a daterange</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                autoFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={(range) => {
                  setDateRange(range);
                  handleValueChange(range);
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      );
    // case "month":
    //   return <MonthPicker onChange={(value) => handleValueChange(value)} />;
    // case "year":
    //   return (
    //     <YearPicker
    //       key={filter.key || "year"}
    //       placeholder={filter.placeholder}
    //       onChange={(value) => handleValueChange(value)}
    //     />
    //   );
    default:
      return filter.type === "custom" && filter.render();
  }
};
