import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
} from "@mui/material";
import React from "react";

export default function YAxisConfigurator({
  settings,
  onChange,
  disableFields,
}) {
  return (
    <React.Fragment>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between" }}>
        <FormControl component="fieldset" variant="standard">
          <FormLabel component="legend" sx={{ mb: 1 }}>
            Left Y Axis
          </FormLabel>
          <FormGroup>
            <TextField
              disabled={disableFields}
              label="Max"
              type="number"
              value={settings.leftYAxisMax}
              onChange={(e) => onChange("leftYAxisMax", e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              disabled={disableFields}
              label="Unit"
              value={settings.leftYAxisUnit}
              onChange={(e) => onChange("leftYAxisUnit", e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  disabled={disableFields}
                  checked={settings.leftYAxisDisabled}
                  onChange={(e) => onChange("leftYAxisDisabled", e.target.checked)}
                />
              }
              label="Hide left Y axis"
            />
          </FormGroup>
        </FormControl>
        <FormControl component="fieldset" variant="standard">
          <FormLabel component="legend" sx={{ mb: 1 }}>
            Right Y Axis
          </FormLabel>
          <FormGroup>
            <TextField
              disabled={disableFields}
              label="Max"
              type="number"
              value={settings.rightYAxisMax}
              onChange={(e) => onChange("rightYAxisMax", e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              disabled={disableFields}
              label="Unit"
              value={settings.rightYAxisUnit}
              onChange={(e) => onChange("rightYAxisUnit", e.target.value)}
            />
          </FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                disabled={disableFields}
                checked={settings.rightYAxisDisabled}
                onChange={(e) => onChange("rightYAxisDisabled", e.target.checked)}
              />
            }
            label="Hide right Y axis"
          />
        </FormControl>
      </Box>
    </React.Fragment>
  );
}
