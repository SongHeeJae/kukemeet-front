import React, { useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, DialogContent, Button } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styled from "styled-components";
import { Autocomplete, AutoComplete } from "@material-ui/lab";
import { clearMyFriendsState, loadMyFriendsRequest } from "../reducers/user";

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

  useEffect(() => {
    dispatch(loadMyFriendsRequest());
    return () => {
      dispatch(clearMyFriendsState());
    };
  }, []);

  useEffect(() => {
    wrapperRef.current.style.display = value !== index ? "none" : "block";
  }, [value]);

  return (
    <SendMessageWrapper ref={wrapperRef}>
      <Autocomplete
        className="send-message-autocomplete"
        options={myFriends}
        getOptionLabel={(option) =>
          `${option.uid} ${option.username} ${option.nickname}`
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
        //   value={message}
        //   onChange={onChangeMessage}
        variant="outlined"
      />
      <Button fullWidth={true}>전송</Button>
    </SendMessageWrapper>
  );
};

export default SendMessageTabPanel;
