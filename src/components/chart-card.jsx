"use client";

import { Card, CardContent } from "@mui/material";

export default function ChartCard({ children }) {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 6 }}>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
