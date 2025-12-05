"use client";

import { DashboardSettingsProvider } from "@/utils/contexts/dashboard-settings";
import { MenuSettingsProvider } from "@/utils/contexts/menu-settings";
import {
  CssBaseline,
  Container,
  ThemeProvider,
  createTheme,
} from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Container maxWidth="xl" sx={{ padding: 4 }}>
            <MenuSettingsProvider>
              <DashboardSettingsProvider>{children}</DashboardSettingsProvider>
            </MenuSettingsProvider>
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
