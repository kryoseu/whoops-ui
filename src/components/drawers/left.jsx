"use client";

import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import DrawerBase from "./base";
import { buildLeftDrawerItems } from "@/utils/drawer/left-items";
import { createLeftDrawerHandlers } from "@/utils/drawer/handlers";
import { MenuSettingsContext } from "@/utils/contexts/menu-settings";
import { DashboardSettingsContext } from "@/utils/contexts/dashboard-settings";

export default function LeftDrawer() {
  const [open, setOpen] = React.useState(false);

  const menuCtx = React.useContext(MenuSettingsContext);
  const dashboardCtx = React.useContext(DashboardSettingsContext);

  const handleClick = createLeftDrawerHandlers({
    ...menuCtx,
    ...dashboardCtx,
    setOpen,
  });


  const items = buildLeftDrawerItems(dashboardCtx.defaultDashboards).map(
    (item) => ({
      ...item,
      selected: menuCtx.selectedSection[0] === item.text,
      onClick: handleClick,
    }),
  );

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>

      <DrawerBase
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        items={items}
      />
    </>
  );
}
