"use client";

import React from "react";
import {
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ChartCard from "./chart-card";
import { useContext, useEffect } from "react";
import { ChartSettingsContext } from "@/utils/contexts/chart-settings";
import { MenuSettingsContext } from "@/utils/contexts/menu-settings";
import { validRanges } from "@/utils/range";

export default function ChartGrid({ charts }) {
  const {
    showMark,
    setTickDensity,
    setShowMark,
    chartGridSize,
    setChartGridSize,
  } = useContext(ChartSettingsContext);

  const { range, setRange } = useContext(MenuSettingsContext);

  useEffect(() => {
    const density = {
      [validRanges.week]: "dense",
      [validRanges.month]: "normal",
      [validRanges.quarter]: "sparse",
      [validRanges.halfYear]: "very-sparse",
      [validRanges.year]: "very-sparse",
    };

    setTickDensity(density[range] || "normal");
  }, [range, setTickDensity]);

  return (
    <React.Fragment>
      <ToggleButtonGroup
        value={range}
        exclusive
        onChange={(_, value) => {
          if (value !== null) {
            setRange?.(value);
          }
        }}
        size="small"
        sx={{ mb: 2, display: "flex", justifyContent: "center" }}
      >
        <ToggleButton value={validRanges.week}>{validRanges.week}</ToggleButton>
        <ToggleButton value={validRanges.month}>
          {validRanges.month}
        </ToggleButton>
        <ToggleButton value={validRanges.quarter}>
          {validRanges.quarter}
        </ToggleButton>
        <ToggleButton value={validRanges.halfYear}>
          {validRanges.halfYear}
        </ToggleButton>
        <ToggleButton value={validRanges.year}>{validRanges.year}</ToggleButton>
        <FormControlLabel
          control={
            <Switch
              checked={showMark}
              onChange={(_, checked) => setShowMark(checked)}
            />
          }
          label="Show mark"
          sx={{ ml: 2 }}
        />
        <IconButton
          onClick={() => {
            chartGridSize > 3 && setChartGridSize(chartGridSize - 1);
          }}
        >
          <ZoomOutIcon sx={{ ml: 1, mt: 0.5 }} />
        </IconButton>
        <IconButton
          onClick={() => {
            chartGridSize < 12 && setChartGridSize(chartGridSize + 1);
          }}
        >
          <ZoomInIcon sx={{ ml: 1, mt: 0.5 }} />
        </IconButton>
      </ToggleButtonGroup>

      <Grid container spacing={2} justifyContent={"center"}>
        {charts.map((chart, index) => (
          <Grid size={chartGridSize} key={index}>
            <ChartCard>{chart}</ChartCard>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}
