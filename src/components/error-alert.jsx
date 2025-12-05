"use client";

import { Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ErrorAlert({ error, onClose }) {
  if (!error) return null;

  return (
    <Alert
      severity="error"
      sx={{ mb: 2 }}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => onClose?.(null)}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      {error.message || "An unexpected error occurred."}
    </Alert>
  );
}
