import React from "react";
import { grey } from "@mui/material/colors";
import { DashboardSettingsContext } from "@/utils/contexts/dashboard-settings";
import { Box, Typography } from "@mui/material";

export default function DataSource() {
  const { dataSource } = React.useContext(DashboardSettingsContext);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 4,
        px: 2,
        py: 1,
      }}
    >
      {dataSource && (
        <Typography
          variant="subtitle2"
          sx={{ color: grey[700], fontWeight: 600 }}
        >
          Source: {dataSource.toUpperCase()}
        </Typography>
      )}
    </Box>
  );
}
