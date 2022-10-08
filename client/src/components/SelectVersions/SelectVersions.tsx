import { MultiSelect, MultiSelectProps } from "@mantine/core";

export const SelectVersions = ({ data, ...props }: MultiSelectProps) => {
  return (
    <MultiSelect
      data={data}
      label={"Pick Python version(s)"}
      placeholder="Python version(s)"
      clearable
      clearButtonLabel="Clear selection"
      {...props}
    />
  );
};
