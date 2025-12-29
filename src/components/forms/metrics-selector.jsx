import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import React from "react";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function MetricsSelector({
  options,
  value,
  disabledKeys,
  settings,
  onChange,
  onSettingsChange,
}) {

  const sleepSelected = value.some(
    (metric) => metric.section === "Sleep"
  );

  const napSelected = value.some(
    (metric) => metric.key === "nap"
  );

  return (
    <>
      <Autocomplete
        multiple
        value={value}
        options={options}
        groupBy={(option) => option.section}
        disableCloseOnSelect
        onChange={(_, list) => onChange(list)}
        getOptionDisabled={(option) => disabledKeys.includes(option.key)}
        getOptionLabel={(opt) => opt.name}
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
              {option.name}
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField {...params} label="Metrics" placeholder="Select metrics" />
        )}
        sx={{ mb: sleepSelected ? 0 : 4 }}
      />

      {sleepSelected && (
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={napSelected || settings.includeNaps}
                disabled={napSelected}
                onChange={(e) => onSettingsChange("includeNaps", e.target.checked)}
              />
            }
            label="Include naps"
            sx={{ mb: 4 }}
          />
        </FormGroup>
      )}
    </>
  );
}
