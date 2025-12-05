import { useAddChartFormControl } from "@/utils/hooks/useAddChartFormControl";
import { Box, Button } from "@mui/material";
import ErrorAlert from "../error-alert";
import ChartTypeSelector from "./chart-type-selector";
import MetricsSelector from "./metrics-selector";
import YAxisConfigurator from "./yaxis-configurator";

export default function AddChartForm({ onSave }) {
  const {
    error,
    setError,
    userChartType,
    pieChartAggType,
    setPieChartAggType,
    allMetrics,
    checkedMetrics,
    disabledMetrics,
    yAxis,
    handleChartTypeChange,
    handleMetricsChange,
    handleYAxisChange,
    handleYAxisToggle,
    handleSave,
  } = useAddChartFormControl(onSave);

  return (
    <Box sx={{ width: 500 }}>
      {error && <ErrorAlert error={error} onClose={() => setError(null)} />}

      <ChartTypeSelector
        type={userChartType}
        onTypeChange={handleChartTypeChange}
        agg={pieChartAggType}
        onAggChange={setPieChartAggType}
      />

      <MetricsSelector
        options={allMetrics}
        value={checkedMetrics}
        disabledKeys={disabledMetrics}
        onChange={handleMetricsChange}
      />

      <YAxisConfigurator
        yAxis={yAxis}
        onChange={handleYAxisChange}
        onToggle={handleYAxisToggle}
        disableFields={userChartType === "pie"}
      />

      <Box>
        <Button fullWidth variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
}
