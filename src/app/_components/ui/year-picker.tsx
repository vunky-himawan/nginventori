import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

interface YearPickerProps {
  onChange?: (year: number) => void;
  placeholder?: string;
  className?: string;
  key?: string;
  minYear?: number;
  maxYear?: number;
  disabled?: boolean;
  required?: boolean;
}

const YearPicker = ({
  onChange,
  placeholder,
  key,
  minYear = 1900,
  maxYear = new Date().getFullYear(),
  disabled,
  required,
}: YearPickerProps) => {
  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => i + minYear);

  return (
    <Select
      onValueChange={(value) => onChange?.(Number(value))}
      key={key}
      required={required}
      disabled={disabled}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={`${placeholder || "Select a year"}...`} />
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => (
          <SelectItem key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default YearPicker;
