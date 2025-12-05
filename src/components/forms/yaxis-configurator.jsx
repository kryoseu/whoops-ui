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
  yAxis,
  onChange,
  onToggle,
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
              value={yAxis.left.max}
              onChange={onChange("left", "max")}
              sx={{ mb: 2 }}
            />
            <TextField
              disabled={disableFields}
              label="Unit"
              value={yAxis.left.unit}
              onChange={onChange("left", "unit")}
            />
            <FormControlLabel
              control={
                <Checkbox
                  disabled={disableFields}
                  checked={yAxis.left.disabled}
                  onChange={onToggle("left")}
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
              value={yAxis.right.max}
              onChange={onChange("right", "max")}
              sx={{ mb: 2 }}
            />
            <TextField
              disabled={disableFields}
              label="Unit"
              value={yAxis.right.unit}
              onChange={onChange("right", "unit")}
            />
          </FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                disabled={disableFields}
                checked={yAxis.right.disabled}
                onChange={onToggle("right")}
              />
            }
            label="Hide right Y axis"
          />
        </FormControl>
      </Box>
    </React.Fragment>
  );
}
