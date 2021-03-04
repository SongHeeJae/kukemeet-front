import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { TextField, Button } from "@material-ui/core";
import moment from "moment";
import Router from "next/router";
import { deleteUserRequest } from "../reducers/user";

moment.locale("ko");

const MyInfoFormWrapper = styled.div`
  text-align: center;
  .my-info-text-field {
    margin: 10px;
  }
`;

const MyInfoForm = () => {
  const dispatch = useDispatch();
  const { uid, username, nickname, createdAt, deleteUserDone } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (!deleteUserDone) return;
    Router.replace("/");
  }, [deleteUserDone]);

  const onClickDeleteUser = useCallback(() => {
    dispatch(deleteUserRequest());
  }, []);

  return (
    <MyInfoFormWrapper>
      <h1>내 정보</h1>

      <TextField
        required
        label="이메일"
        InputProps={{
          readOnly: true,
        }}
        value={uid}
        variant="outlined"
        className="my-info-text-field"
      />
      <br />
      <TextField
        required
        label="이름"
        value={username}
        InputProps={{
          readOnly: true,
        }}
        variant="outlined"
        className="my-info-text-field"
      />
      <br />
      <TextField
        required
        label="닉네임"
        value={nickname}
        InputProps={{
          readOnly: true,
        }}
        variant="outlined"
        className="my-info-text-field"
      />
      <br />
      <TextField
        required
        label="가입일"
        InputProps={{
          readOnly: true,
        }}
        value={moment(createdAt).format("YYYY-MM-DD")}
        variant="outlined"
        className="my-info-text-field"
      />
      <br />
      <Button onClick={onClickDeleteUser}>회원 탈퇴</Button>
    </MyInfoFormWrapper>
  );
};

export default MyInfoForm;
