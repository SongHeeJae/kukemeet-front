import React, { useRef, useEffect, memo } from "react";
import ChattingTextItem from "./ChattingTextItem";
import styled from "styled-components";
import { useSelector } from "react-redux";

const ChatDivWrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow: auto;
`;

const Ul = styled.div`
  list-style: none;
  padding-left: 0px;
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
      <Ul>
        {chatData.map((v, i) => (
          <ChattingTextItem
            key={i}
            time={v.time}
            display={v.display}
            text={v.text}
          />
        ))}
      </Ul>
    </ChatDivWrapper>
  );
};

export default memo(ChattingText);
