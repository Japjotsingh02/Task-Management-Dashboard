import type { ReactNode } from "react";

export type ChipOption<ChipValue extends string> = {
  label: string;
  value: ChipValue;
  icon?: ReactNode;
};

export type FilterChipsProps<ChipValue extends string> = {
  options: ChipOption<ChipValue>[];
  value: ChipValue;
  onChange: (value: ChipValue) => void;
};

const FilterChips = <ChipValue extends string>({
  options,
  value,
  onChange,
}: FilterChipsProps<ChipValue>) => {
  return (
    <div className="flex items-center gap-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`chip ${value === option.value ? "chip-active" : "chip-inactive"}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default FilterChips;
