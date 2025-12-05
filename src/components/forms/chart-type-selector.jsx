import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

export default function ChartTypeSelector({
  type,
  onTypeChange,
  agg,
  onAggChange,
}) {
  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <FormLabel>Chart Type</FormLabel>
      <RadioGroup row value={type} onChange={(event) => onTypeChange(event)}>
        <FormControlLabel
          value="single"
          control={<Radio />}
          label="Single Line"
        />
        <FormControlLabel
          value="biaxial"
          control={<Radio />}
          label="Biaxial Line"
        />
        <FormControlLabel
          value="stacked_bar"
          control={<Radio />}
          label="Stacked Bar"
        />
        <FormControlLabel value="pie" control={<Radio />} label="Pie" />
      </RadioGroup>

      {type === "pie" && (
        <>
          <FormLabel sx={{ mt: 2 }}>Aggregation Type</FormLabel>

          <RadioGroup
            row
            value={agg}
            onChange={(e) => onAggChange(e.target.value)}
          >
            <FormControlLabel value="sum" control={<Radio />} label="Sum" />
            <FormControlLabel value="count" control={<Radio />} label="Count" />
          </RadioGroup>
        </>
      )}
    </FormControl>
  );
}
