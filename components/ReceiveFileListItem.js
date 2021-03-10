import React, { memo } from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import BlockIcon from "@material-ui/icons/Block";

const ReceiveFileItem = ({ file }) => {
  const { loading, done, data, filename, display } = file;
  return (
    <ListItem variant="contained" color="primary">
      <ListItemText primary={`${display}-${filename}`} />
      <ListItemSecondaryAction>
        {loading ? (
          <CircularProgress />
        ) : done ? (
          <IconButton component="a" href={data} download={filename}>
            <SaveIcon />
          </IconButton>
        ) : (
          <IconButton>
            <BlockIcon />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default memo(
  ReceiveFileItem,
  (prevProps, nextProps) => prevProps.file === nextProps.file
);
