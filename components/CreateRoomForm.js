import React, { useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import { Button, TextField, CircularProgress } from "@material-ui/core";
import Router from "next/router";
import AppLayout from "./AppLayout";
import { createRoomRequest } from "../reducers/videoroom";

const CreateRoomFormWrapper = styled.div`
  text-align: center;
  .create-room-text-field {
    margin: 10px;
  }
`;

const CreateRoomForm = ({ info }) => {
  const dispatch = useDispatch();
  const { createRoomLoading } = useSelector((state) => state.videoroom);
  const [title, onChangeTitle] = useInput("");
  const [pin, onChangePin] = useInput("");

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(createRoomRequest({ info: info.current, title, pin }));
    },
    [info, title, pin]
  );

  const onClickCancel = useCallback(() => {
    Router.replace("/");
  }, []);

  return (
    <AppLayout>
      <CreateRoomFormWrapper>
        <h1>방 정보를 입력해주세요.</h1>

        <form onSubmit={onSubmit}>
          <TextField
            required
            label="방 제목"
            value={title}
            onChange={onChangeTitle}
            variant="outlined"
            className="create-room-text-field"
          />
          <br />
          <TextField
            type="password"
            required
            label="방 비밀번호"
            value={pin}
            onChange={onChangePin}
            variant="outlined"
            className="create-room-text-field"
          />
          <br />

          {createRoomLoading ? (
            <CircularProgress />
          ) : (
            <Button type="submit">방 생성</Button>
          )}
          <br />
          <Button onClick={onClickCancel}>취소</Button>
        </form>
      </CreateRoomFormWrapper>
    </AppLayout>
  );
};

export default CreateRoomForm;
