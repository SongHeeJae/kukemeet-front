import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import styled from "styled-components";

const ChatDivWrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow: auto;
`;

const ChattingText = () => {
  const chatDivRef = useRef();
  const { chatData } = useSelector((state) => state.videoroom);
  useEffect(() => {
    if (!chatDivRef.current) return;
    chatDivRef.current.scrollTop = chatDivRef.current.scrollHeight;
  }, [chatData]);

  return (
    <ChatDivWrapper ref={chatDivRef}>
      {chatData.map((v, i) => (
        <Typography key={i}>
          [{v.time}] {v.display} : {v.text}
        </Typography>
      ))}
    </ChatDivWrapper>
  );
};

export default ChattingText;
