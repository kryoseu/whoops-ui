"use client";

import React from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

export default function DrawerBase({ anchor, open, onClose, items, extra }) {
  return (
    <Drawer anchor={anchor} open={open} onClose={onClose}>
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          {items.map((item, idx) => (
            <React.Fragment key={idx}>
              <div
                onContextMenu={(e) => item.onRightClick?.(e, item)}
                style={{
                  cursor: item.onRightClick ? "context-menu" : "default",
                }}
              >
                <ListItem disablePadding onClick={() => item.onClick?.(item)}>
                  <ListItemButton selected={item.selected}>
                    {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                  {item.contextMenu}
                </ListItem>
              </div>
              {item.divider && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>

      {extra /* floating add button for right drawer */}
    </Drawer>
  );
}
