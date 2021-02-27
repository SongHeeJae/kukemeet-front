import React, { useCallback } from "react";
import { IconButton } from "@material-ui/core";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

const ChattingButton = ({ setOpen }) => {
  const onClick = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <IconButton onClick={onClick}>
      <ChatBubbleIcon />
    </IconButton>
  );
};

export default ChattingButton;
