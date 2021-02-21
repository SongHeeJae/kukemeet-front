import React, { useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import useInput from "../hooks/useInput";
import { Button, TextField, Collapse, IconButton } from "@material-ui/core";
import Router from "next/router";
import AppLayout from "./AppLayout";

const CreateRoomFormWrapper = styled.div`
  text-align: center;
  .create-room-text-field {
    margin: 10px;
  }
`;

const CreateRoomForm = ({ info }) => {
  const [title, onChangeTitle] = useInput("");
  const [password, onChangePassword] = useInput("");

  const onSubmit = useCallback(() => {
    console.log("방 생성 요청");
  }, []);

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
            value={password}
            onChange={onChangePassword}
            variant="outlined"
            className="create-room-text-field"
          />
          <br />

          <Button type="submit">방 생성</Button>
          <Button onClick={onClickCancel}>취소</Button>
        </form>
      </CreateRoomFormWrapper>
    </AppLayout>
  );
};

export default CreateRoomForm;
