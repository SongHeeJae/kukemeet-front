import React, { useCallback, memo } from "react";
import { IconButton } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
const MessageButton = ({ setOpen }) => {
  const onClick = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <IconButton onClick={onClick}>
      <EmailIcon />
    </IconButton>
  );
};

export default memo(MessageButton);
