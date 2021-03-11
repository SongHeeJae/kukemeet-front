import React, { memo } from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import BlockIcon from "@material-ui/icons/Block";

const SendFileItem = ({ file }) => {
  const { loading, done, dataUrl, filename } = file;
  return (
    <ListItem variant="contained" color="primary">
      <ListItemText primary={filename} />
      <ListItemSecondaryAction>
        {loading ? (
          <CircularProgress />
        ) : done ? (
          <IconButton
            component="a"
            href={dataUrl}
            download={filename}
            target="_blank"
          >
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
  SendFileItem,
  (prevProps, nextProps) => prevProps.file === nextProps.file
);
