import React, { useCallback, memo } from "react";
import { IconButton } from "@material-ui/core";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import { useSelector } from "react-redux";
import styled from "styled-components";

const BlueAnnouncementIcon = styled(AnnouncementIcon)`
  color: blue;
`;

const ChattingButton = ({ setOpen }) => {
  const { newChatData } = useSelector((state) => state.videoroom);

  const onClick = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <IconButton onClick={onClick}>
      {newChatData ? <BlueAnnouncementIcon /> : <ChatBubbleIcon />}
    </IconButton>
  );
};

export default memo(ChattingButton);
