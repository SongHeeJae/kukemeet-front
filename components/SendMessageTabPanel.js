import React, { useEffect, useRef, useCallback, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import styled from "styled-components";
import { Autocomplete, AutoComplete } from "@material-ui/lab";
import {
  clearMyFriendsState,
  clearSendMessageState,
  loadMyFriendsRequest,
  sendMessageFailure,
  sendMessageRequest,
} from "../reducers/user";
import useInput from "../hooks/useInput";

const SendMessageWrapper = styled.div`
  width: 100%;
  height: 400px;
  .send-message-autocomplete {
    margin: 10px;
  }
`;

const SendMessageTabPanel = ({ value, index }) => {
  const dispatch = useDispatch();
  const wrapperRef = useRef();
  const { myFriends } = useSelector((state) => state.user);
  const [message, onChangeMessage, setMessage] = useInput("");
  const [receiver, setReceiver] = useState(null);

  useEffect(() => {
    dispatch(loadMyFriendsRequest());
    return () => {
      dispatch(clearMyFriendsState());
      dispatch(clearSendMessageState());
    };
  }, []);

  useEffect(() => {
    wrapperRef.current.style.display = value !== index ? "none" : "block";
  }, [value]);

  const onClickSendMessage = useCallback(() => {
    if (!receiver) {
      dispatch(sendMessageFailure({ msg: "수신자를 선택해주세요." }));
      return;
    }
    dispatch(sendMessageRequest({ id: receiver, message }));
    setMessage("");
  }, [receiver, message]);

  const onChangeAutocomplete = useCallback((e, v) => {
    setReceiver(v.user.id);
  }, []);

  return (
    <SendMessageWrapper ref={wrapperRef}>
      <Autocomplete
        className="send-message-autocomplete"
        onChange={onChangeAutocomplete}
        options={myFriends}
        getOptionLabel={(option) =>
          `${option.user.uid} ${option.user.username} ${option.user.nickname}`
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="받을 사람을 선택해주세요."
            variant="outlined"
          />
        )}
      />

      <TextField
        label="내용을 작성해주세요"
        multiline
        rows={12}
        fullWidth={true}
        value={message}
        onChange={onChangeMessage}
        variant="outlined"
      />
      <Button fullWidth={true} onClick={onClickSendMessage}>
        전송
      </Button>
    </SendMessageWrapper>
  );
};

export default memo(SendMessageTabPanel);
