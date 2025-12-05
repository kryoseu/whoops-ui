"use client";

import React from "react";
import { purple } from "@mui/material/colors";
import { alpha } from "@mui/material/styles";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import ErrorAlert from "@/components/error-alert";
import { DashboardSettingsContext } from "@/utils/contexts/dashboard-settings";

const BUTTON_STYLE = { width: 160, height: 50 };
const buttons = [
  { id: "whoops", label: "Whoops" },
  { id: "whoop", label: "Whoop" },
];

export default function Index() {
  const [error, setError] = React.useState(null);
  const [loadingButton, setLoadingButton] = React.useState(null);
  const [fadeOut, setFadeOut] = React.useState(false);

  const { setDataSource } = React.useContext(DashboardSettingsContext);

  // Check api errors in query strings on mount
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.location.search) {
      const urlParams = new URLSearchParams(window.location.search);
      const error = urlParams.get("error");

      if (error) {
        setError(new Error(decodeURIComponent(error)));

        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );
      }
    }
  }, []);

  const handleClick = (buttonId) => {
    setLoadingButton(buttonId);
    setDataSource(buttonId);
    setFadeOut(true);

    setTimeout(() => {
      window.location.href =
        buttonId === "whoop" ? "/api/whoop/login" : "/api/whoops/login";
    }, 500);
  };

  return (
    <>
      {error && <ErrorAlert error={error} onClose={() => setError(null)} />}

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          minHeight: "100vh",
          transition: "opacity 0.5s ease-in-out",
          opacity: fadeOut ? 0 : 1,
        }}
      >
        <Typography
          gutterBottom
          sx={{
            letterSpacing: 15,
            textShadow: `0 0 10px ${alpha(purple[500], 0.5)}`,
            textTransform: "uppercase",
            color: alpha(purple[700], 0.7),
          }}
        >
          Data Source
        </Typography>
        <Box
          sx={{
            p: 4,
            borderRadius: 2,
            boxShadow: 20,
          }}
        >
          <Grid container spacing={2} justifyContent="center">
            {buttons.map(({ id, label }) => (
              <Button
                key={id}
                variant="contained"
                onClick={() => handleClick(id)}
                loading={loadingButton === id}
                disabled={loadingButton !== null && loadingButton !== id}
                sx={{ ...BUTTON_STYLE, position: "relative" }}
              >
                {loadingButton === id && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: "white",
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                )}
                {label}
              </Button>
            ))}
          </Grid>
        </Box>
      </Grid>
    </>
  );
}
