import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { TextField, Button, Collapse, IconButton } from "@material-ui/core";
import moment from "moment";
import Router from "next/router";
import {
  clearUpdateUserInfoState,
  deleteUserRequest,
  updateUserInfoRequest,
  updateUserInfoFailure,
} from "../reducers/user";
import useInput from "../hooks/useInput";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";

moment.locale("ko");

const MyInfoMainFormWrapper = styled.div`
  text-align: center;
  .my-info-main-field {
    margin: 10px;
  }
`;

const MyInfoMainForm = () => {
  const dispatch = useDispatch();
  const [infoModifiable, setInfoModifiable] = useState(false);
  const {
    uid,
    username,
    nickname,
    createdAt,
    deleteUserDone,
    updateUserInfoDone,
    updateUserInfoError,
  } = useSelector((state) => state.user);
  const [uname, onChangeUname] = useInput(username);
  const [nname, onChangeNname] = useInput(nickname);

  useEffect(() => {
    return () => {
      dispatch(clearUpdateUserInfoState());
    };
  }, []);

  useEffect(() => {
    if (!infoModifiable) return;
    setInfoModifiable(false);
    dispatch(clearUpdateUserInfoState());
  }, [updateUserInfoDone]);

  useEffect(() => {
    if (!deleteUserDone) return;
    Router.replace("/");
  }, [deleteUserDone]);

  const onClickIconButton = useCallback(() => {
    dispatch(clearUpdateUserInfoState());
  }, []);

  const onClickUpdateUserInfo = useCallback(() => {
    if (infoModifiable) {
      if (!uname || !nname)
        return dispatch(
          updateUserInfoFailure({ msg: "회원 정보를 입력해주세요." })
        );
      dispatch(updateUserInfoRequest({ username: uname, nickname: nname }));
    } else {
      setInfoModifiable(true);
    }
  }, [uname, nname, infoModifiable]);

  const onClickDeleteUser = useCallback(() => {
    dispatch(deleteUserRequest());
  }, []);

  return (
    <MyInfoMainFormWrapper>
      <Collapse in={updateUserInfoError.length > 0}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={onClickIconButton}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {updateUserInfoError}
        </Alert>
      </Collapse>
      <h1>내 정보</h1>
      <TextField
        required
        label="이메일"
        InputProps={{
          readOnly: true,
        }}
        value={uid}
        variant="outlined"
        className="my-info-main-field"
      />
      <br />
      <TextField
        required
        label="이름"
        value={uname}
        onChange={onChangeUname}
        InputProps={{
          readOnly: !infoModifiable,
        }}
        variant={infoModifiable ? "standard" : "outlined"}
        className="my-info-main-field"
      />
      <br />
      <TextField
        required
        label="닉네임"
        color={infoModifiable ? "secondary" : "primary"}
        value={nname}
        onChange={onChangeNname}
        InputProps={{
          readOnly: !infoModifiable,
        }}
        variant={infoModifiable ? "standard" : "outlined"}
        className="my-info-main-field"
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
        className="my-info-main-field"
      />
      <br />
      <Button onClick={onClickUpdateUserInfo}>
        {infoModifiable ? "완료" : "수정"}
      </Button>
      <Button onClick={onClickDeleteUser}>회원 탈퇴</Button>
    </MyInfoMainFormWrapper>
  );
};

export default MyInfoMainForm;
