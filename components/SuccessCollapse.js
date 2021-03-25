import React, { memo } from "react";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import { Collapse, IconButton } from "@material-ui/core";

const SuccessCollapse = ({ flag, onClick, msg }) => {
  return (
    <Collapse in={flag}>
      <Alert
        severity="success"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClick}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {msg}
      </Alert>
    </Collapse>
  );
};

export default memo(
  SuccessCollapse,
  (prevProps, nextProps) =>
    prevProps.flag === nextProps.flag && prevProps.msg === nextProps.msg
);
