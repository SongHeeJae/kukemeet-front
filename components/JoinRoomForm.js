import React, { useCallback } from "react";
import AppLayout from "./AppLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import CloseIcon from "@material-ui/icons/Close";
import { Button, TextField, Collapse, IconButton } from "@material-ui/core";
import Router from "next/router";
import { joinRoomRequest, clearJoinRoomState } from "../reducers/videoroom";
import Alert from "@material-ui/lab/Alert";

const JoinRoomFormWrapper = styled.div`
  text-align: center;
  .join-room-text-field {
    margin: 10px;
  }
`;

const JoinRoomForm = ({ info, room }) => {
  const dispatch = useDispatch();
  const [pin, onChangePin] = useInput("");
  const { nickname } = useSelector((state) => state.user);
  const { joinRoomError } = useSelector((state) => state.videoroom);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        joinRoomRequest({
          info: info.current,
          room,
          nickname,
          pin,
        })
      );
    },
    [info, pin]
  );

  const onClickCancel = useCallback(() => {
    Router.replace("/");
  }, []);

  const onClickErrorIconButton = useCallback(() => {
    dispatch(clearJoinRoomState());
  }, []);

  return (
    <AppLayout>
      <JoinRoomFormWrapper>
        <h1>방 비밀번호를 입력해주세요.</h1>
        <Collapse in={joinRoomError.length > 0}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={onClickErrorIconButton}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {joinRoomError}
          </Alert>
        </Collapse>
        <form onSubmit={onSubmit}>
          <TextField
            type="password"
            required
            label="방 비밀번호"
            value={pin}
            onChange={onChangePin}
            variant="outlined"
            className="join-room-text-field"
          />
          <br />
          <Button type="submit">방 입장</Button>
          <Button onClick={onClickCancel}>취소</Button>
        </form>
      </JoinRoomFormWrapper>
    </AppLayout>
  );
};

export default JoinRoomForm;
