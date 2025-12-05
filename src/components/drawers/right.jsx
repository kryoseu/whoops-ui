"use client";

import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { IconButton, Menu, MenuItem, TextField } from "@mui/material";
import DrawerBase from "./base";
import { buildRightDrawerItems } from "@/utils/drawer/right-items";
import { createRightDrawerHandlers } from "@/utils/drawer/handlers";
import { DashboardSettingsContext } from "@/utils/contexts/dashboard-settings";
import { MenuSettingsContext } from "@/utils/contexts/menu-settings";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { clearDashboard } from "@/utils/services/dashboard";

export default function RightDrawer() {
  const [open, setOpen] = React.useState(false);

  const [contextMenu, setContextMenu] = React.useState(null);
  const [contextItem, setContextItem] = React.useState(null);

  const [renameOpen, setRenameOpen] = React.useState(false);
  const [renameValue, setRenameValue] = React.useState("");

  const menuCtx = React.useContext(MenuSettingsContext);
  const dashboardCtx = React.useContext(DashboardSettingsContext);

  const handleContextMenu = (event, item) => {
    event.preventDefault();
    setContextItem(item);
    setContextMenu({
      mouseX: event.clientX + 2,
      mouseY: event.clientY - 6,
    });
  };

  const handleClose = () => setContextMenu(null);

  const { click, rename, del } = createRightDrawerHandlers({
    ...menuCtx,
    ...dashboardCtx,
    setOpen,
  });

  const renameDialog = (
    <Dialog open={renameOpen} onClose={() => setRenameOpen(false)}>
      <DialogTitle>Rename Dashboard</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          variant="filled"
          fullWidth
          label="New name"
          value={renameValue}
          onChange={(e) => setRenameValue(e.target.value)}
          slotProps={{ htmlInput: { maxLength: 20 } }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setRenameOpen(false)}>Cancel</Button>
        <Button
          onClick={() => {
            rename(contextItem, renameValue);
            setRenameOpen(false);
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );

  const ctxMenu = (
    <React.Fragment>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem
          onClick={(e) => {
            e.stopPropagation(); // prevents parent click (chart load)
            setRenameOpen(true);
            handleClose();
          }}
        >
          Rename
        </MenuItem>
        <MenuItem
          onClick={() => {
            del(contextItem);
            handleClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </React.Fragment>
  );

  const items = buildRightDrawerItems(dashboardCtx.customDashboards).map(
    (item) => ({
      ...item,
      selected: menuCtx.selectedCustomDashboard === item.id,
      onClick: click,
      contextMenu: ctxMenu,
      onRightClick: handleContextMenu,
    }),
  );

  const addButton = (
    <Fab
      aria-label="add"
      style={{ position: "absolute", bottom: 20, alignSelf: "center" }}
      onClick={() => {
        menuCtx.setSelectedSection([]);
        dashboardCtx.setCharts([]);
        dashboardCtx.setUnsavedCustomCharts([]);
        dashboardCtx.setShowPlaceHolderChart(true);
        dashboardCtx.setChartConfigs([]);
        setOpen(false);
      }}
    >
      <AddIcon />
    </Fab>
  );

  return (
    <>
      <IconButton style={{ float: "right" }} onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>

      {renameDialog}

      <DrawerBase
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        items={items}
        extra={addButton}
      />
    </>
  );
}
