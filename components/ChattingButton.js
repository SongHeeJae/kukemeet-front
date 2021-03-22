import React, { useCallback, memo, useEffect } from "react";
import { IconButton } from "@material-ui/core";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import { useSelector } from "react-redux";
const ChattingButton = ({ setOpen }) => {
  const { newChatData } = useSelector((state) => state.videoroom);

  const onClick = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <IconButton onClick={onClick}>
      {newChatData ? <AnnouncementIcon /> : <ChatBubbleIcon />}
    </IconButton>
  );
};

export default memo(ChattingButton);
