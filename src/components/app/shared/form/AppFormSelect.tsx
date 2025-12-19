import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  type Control,
  type FieldValues,
  type Path,
  Controller,
} from 'react-hook-form';

// test comment

export type SelectOption = {
  value: string;
  label: string;
};

export interface RHFSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
}

export function AppFormSelect<T extends FieldValues>({
  name,
  control,
  options,
  placeholder,
  onValueChange,
}: RHFSelectProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          value={field.value}
          onValueChange={(value) => {
            field.onChange(value);
            onValueChange?.(value);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder ?? 'Select an option'} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{placeholder ?? 'Select an option'}</SelectLabel>
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  );
}
export default AppFormSelect;
