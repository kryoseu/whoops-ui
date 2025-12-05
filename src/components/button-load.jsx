"use client";

import { Button, CircularProgress } from "@mui/material";

const BUTTON_STYLE = { width: 160, height: 50 };

export default function ButtonWithLoad({
  id,
  label,
  onClick,
  loading,
  disabled,
  sxProps = {},
}) {
  return (
    <Button
      key={id}
      variant="contained"
      onClick={() => onClick(id)}
      loading={loading}
      disabled={disabled}
      sx={{
        ...BUTTON_STYLE,
        ...sxProps,
      }}
    >
      {loading && (
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
  );
}
