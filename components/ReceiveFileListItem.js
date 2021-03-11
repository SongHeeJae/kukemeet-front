import React, { memo, useCallback } from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

const ReceiveFileItem = ({ file }) => {
  const { dataUrl, filename, display } = file;

  const onClickDeleteFile = useCallback(() => {
    console.log("삭제함", filename);
  }, []);

  return (
    <ListItem variant="contained" color="primary">
      <ListItemText primary={`${display}-${filename}`} />
      <ListItemSecondaryAction>
        <IconButton
          component="a"
          href={dataUrl}
          download={filename}
          target="_blank"
        >
          <SaveIcon />
        </IconButton>
        {/* <IconButton onClick={() => onClickDeleteFile()}>
          <RemoveCircleOutlineIcon />
        </IconButton> */}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default memo(
  ReceiveFileItem,
  (prevProps, nextProps) => prevProps.file === nextProps.file
);
