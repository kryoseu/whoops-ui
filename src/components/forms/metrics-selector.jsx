import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Autocomplete, Checkbox, TextField } from "@mui/material";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function MetricsSelector({
  options,
  value,
  disabledKeys,
  onChange,
}) {
  return (
    <Autocomplete
      multiple
      value={value}
      options={options}
      groupBy={(option) => option.section}
      disableCloseOnSelect
      onChange={(_, list) => onChange(list)}
      getOptionDisabled={(option) =>
        disabledKeys.includes(option.metricConfig.key)
      }
      getOptionLabel={(opt) => opt.metricConfig.name}
      renderOption={(props, option, { selected }) => {
        const { key, ...rest } = props;
        return (
          <li key={key} {...rest}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              checked={selected}
              sx={{ mr: 1 }}
            />
            {option.metricConfig.name}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField {...params} label="Metrics" placeholder="Select metrics" />
      )}
      sx={{ mb: 4 }}
    />
  );
}
