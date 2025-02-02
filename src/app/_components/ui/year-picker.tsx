import { useMemo, useState, useEffect } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface YearPickerProps {
  onChange?: (year: number) => void;
  placeholder?: string;
  className?: string;
  minYear?: number;
  maxYear?: number;
  defaultValue?: number;
}

const YearPicker = ({
  onChange,
  placeholder,
  minYear = new Date().getFullYear() - 10,
  maxYear = new Date().getFullYear(),
  defaultValue,
}: YearPickerProps) => {
  const [open, setOpen] = useState(false);
  const [searchYear, setSearchYear] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string | null>(
    defaultValue ? defaultValue.toString() : null,
  );

  useEffect(() => {
    if (defaultValue) {
      setSelectedYear(defaultValue.toString());
    }
  }, [defaultValue]);

  const years = useMemo(() => {
    const years = [];

    for (let i = minYear; i <= maxYear; i++) {
      years.push(i);
    }

    return years;
  }, [minYear, maxYear]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          onClick={() => {
            setOpen(!open);
            setSearchYear("");
          }}
          className={"w-full justify-start bg-transparent text-left font-normal"}
        >
          {selectedYear || placeholder || "Select a year..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput
            placeholder="Search..."
            value={searchYear}
            onValueChange={(value) => {
              setSearchYear(value);
            }}
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
            }}
          />
          <CommandList>
            <CommandEmpty
              className="mt-1 flex cursor-pointer select-none items-center gap-2 rounded-sm bg-accent px-2 py-1.5 text-sm"
              onClick={() => {
                if (searchYear) {
                  setSelectedYear(searchYear);
                  setOpen(false);
                  onChange?.(Number(searchYear));
                }
              }}
            >
              {searchYear}
            </CommandEmpty>
            <CommandGroup>
              {years
                .filter((year) => year.toString().includes(searchYear))
                .map((year) => (
                  <CommandItem
                    key={year}
                    value={year.toString()}
                    onSelect={() => {
                      setSelectedYear(year.toString());
                      setOpen(false);
                      onChange?.(year);
                    }}
                  >
                    {year}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default YearPicker;
