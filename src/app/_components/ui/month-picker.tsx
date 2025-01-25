import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

interface MonthPickerProps {
  onChange?: (month: number) => void;
  placeholder?: string;
  className?: string;
  key?: string;
  disabled?: boolean;
  required?: boolean;
}

const MonthPicker = ({ onChange, placeholder, key, disabled, required }: MonthPickerProps) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <Select
      onValueChange={(value) => onChange?.(Number(value))}
      key={key}
      required={required}
      disabled={disabled}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={`${placeholder || "Select a month"}...`} />
      </SelectTrigger>
      <SelectContent>
        {months.map((month) => (
          <SelectItem key={month} value={month}>
            {month}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default MonthPicker;
