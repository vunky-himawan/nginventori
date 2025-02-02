import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

interface MonthPickerProps {
  onChange?: (month: number) => void;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
}

const months = [
  {
    label: "January",
    value: 1,
  },
  {
    label: "February",
    value: 2,
  },
  {
    label: "March",
    value: 3,
  },
  {
    label: "April",
    value: 4,
  },
  {
    label: "May",
    value: 5,
  },
  {
    label: "June",
    value: 6,
  },
  {
    label: "July",
    value: 7,
  },
  {
    label: "August",
    value: 8,
  },
  {
    label: "September",
    value: 9,
  },
  {
    label: "October",
    value: 10,
  },
  {
    label: "November",
    value: 11,
  },
  {
    label: "December",
    value: 12,
  },
];

const MonthPicker = ({ onChange, placeholder, defaultValue }: MonthPickerProps) => {
  return (
    <Select onValueChange={(value) => onChange?.(Number(value))} defaultValue={defaultValue}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={`${placeholder || "Select a month"}...`} />
      </SelectTrigger>
      <SelectContent>
        {months.map((month) => (
          <SelectItem key={month.value} value={month.value.toString()}>
            {month.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default MonthPicker;
