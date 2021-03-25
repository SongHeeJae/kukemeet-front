import React, { memo } from "react";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import { Collapse, IconButton } from "@material-ui/core";

const ErrorCollapse = ({ error, onClick }) => {
  return (
    <Collapse in={error.length > 0}>
      <Alert
        severity="error"
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
        {error}
      </Alert>
    </Collapse>
  );
};

export default memo(
  ErrorCollapse,
  (prevProps, nextProps) => prevProps.error === nextProps.error
);
