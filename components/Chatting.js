import React, { useCallback } from "react";
import styled from "styled-components";
import { Button, TextField } from "@material-ui/core";
import useInput from "../hooks/useInput";
import { useSelector, useDispatch } from "react-redux";
import { sendChatRequest } from "../reducers/videoroom";

const ChatDiv = styled.div`
  width: 100%;
  maxheight: 400px;
  height: 400px;
  overflow: auto;
  border: solid 1px;
  border-radius: 20px;
  margin: 10px;
  padding: 5px;
`;

const Chatting = ({ info }) => {
  const dispatch = useDispatch();
  const [text, onChangeText, setText] = useInput("");
  const { openDataChannelDone, chatData } = useSelector(
    (state) => state.videoroom
  );
  const { username, nickname } = useSelector((state) => state.user);
  const onClick = useCallback(() => {
    dispatch(
      sendChatRequest({
        dispatch,
        info: info.current,
        display: `${nickname}(${username})`,
        text,
      })
    );
    setText("");
  }, [text]);

  const onKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        onClick();
      }
    },
    [text]
  );
  return (
    <>
      <ChatDiv>
        {chatData.map((v, i) => (
          <div key={i}>
            {v.display} : {v.text}
          </div>
        ))}
      </ChatDiv>
      <div>
        <TextField
          label="텍스트를 입력하세요"
          value={text}
          onChange={onChangeText}
          onKeyPress={onKeyPress}
          disabled={!openDataChannelDone}
        />
        <Button
          color="primary"
          onClick={onClick}
          disabled={!openDataChannelDone}
        >
          send
        </Button>
      </div>
    </>
  );
};

export default Chatting;
