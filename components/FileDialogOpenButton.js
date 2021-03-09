import React, { useCallback, memo } from "react";
import { IconButton } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";

const FileDialogOpenButton = ({ setOpen }) => {
  const onClick = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <IconButton onClick={onClick}>
      <GetAppIcon />
    </IconButton>
  );
};

export default memo(FileDialogOpenButton);
