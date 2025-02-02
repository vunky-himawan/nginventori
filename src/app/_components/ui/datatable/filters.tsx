import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Button } from "../button";
import { CalendarIcon, Filter } from "lucide-react";
import { TFilterItem } from "@/types/datatable/filter";
import { Label } from "../label";
import { Input } from "../input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";
import { Calendar } from "../calendar";
import { cn } from "@/libs/utils";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import MonthPicker from "../month-picker";
import YearPicker from "../year-picker";

type FiltersProps = {
  filters: TFilterItem[];
  onFilterChange: (newFilters: Record<string, string | number | undefined>) => void;
};

type FilterItemProps = {
  filter: TFilterItem;
  onFilterChange: (newFilters: Record<string, string | number | undefined>) => void;
};

const Filters = ({ filters, onFilterChange }: FiltersProps) => {
  const [filtersState, setFiltersState] = useState<Record<string, string | number | undefined>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onFilterChange(filtersState);
  };

  const handleFilterChange = (key: string, value: string | number | undefined) => {
    setFiltersState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Filter />
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            {filters.map((filter) => (
              <div key={filter.key}>
                <Label>{filter.label}</Label>
                <FilterItems
                  onFilterChange={(newFilter) =>
                    handleFilterChange(filter.key, newFilter[filter.key])
                  }
                  filter={filter}
                />
              </div>
            ))}
            <div className="flex justify-end gap-3">
              <Button
                type="submit"
                variant="outline"
                onClick={() => {
                  setFiltersState({});
                }}
              >
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
        <Input
          type="number"
          placeholder={filter.placeholder}
          name={filter.name}
          value={filter.defaultValue?.toString() || ""}
          autoFocus={false}
          onInput={(e) => {
            e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
            handleValueChange(e.currentTarget.value);
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
                initialFocus
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
    case "month":
      return <MonthPicker onChange={(value) => handleValueChange(value)} />;
    case "year":
      return (
        <YearPicker
          key={filter.key || "year"}
          placeholder={filter.placeholder}
          onChange={(value) => handleValueChange(value)}
        />
      );
    default:
      return <div>Unknown filter</div>;
  }
};

export default Filters;
