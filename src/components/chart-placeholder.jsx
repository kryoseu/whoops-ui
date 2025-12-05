"use client";

import React from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
} from "@mui/material";
import Draggable from "react-draggable";
import AddChartForm from "./forms/add-chart";

function PaperComponent(props) {
  const nodeRef = React.useRef(null);
  return (
    <Draggable
      nodeRef={nodeRef}
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} ref={nodeRef} />
    </Draggable>
  );
}

export default function ChartPlaceHolder() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "2px dashed",
          width: "100%",
          height: 225,
          borderColor: "grey.500",
          borderRadius: 2,
        }}
      >
        <IconButton
          sx={{ width: "auto", height: "auto" }}
          onClick={handleClickOpen}
        >
          <AddIcon sx={{ fontSize: 100, color: "grey.500" }} />
        </IconButton>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle
          alignSelf="center"
          style={{ cursor: "move" }}
          id="draggable-dialog-title"
        >
          Chart Settings
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <AddChartForm onSave={handleClose} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
