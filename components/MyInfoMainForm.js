import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { TextField, Button } from "@material-ui/core";
import moment from "moment";
import Router from "next/router";
import {
  clearUpdateUserInfoState,
  deleteUserRequest,
  updateUserInfoRequest,
  updateUserInfoFailure,
} from "../reducers/user";
import useInput from "../hooks/useInput";
import ErrorCollapse from "./ErrorCollapse";

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

  const validateUsername = useCallback(() => {
    if (uname.length > 1 && uname.match(/^[A-Za-z가-힣]+$/)) {
      return true;
    } else {
      return false;
    }
  }, [uname]);

  const validateNickname = useCallback(() => {
    if (nname.length > 1 && nname.match(/^[A-Za-z가-힣]+$/)) {
      return true;
    } else {
      return false;
    }
  }, [nname]);

  const onClickIconButton = useCallback(() => {
    dispatch(clearUpdateUserInfoState());
  }, []);

  const onClickUpdateUserInfo = useCallback(() => {
    if (infoModifiable) {
      if (!uname || !nname)
        return dispatch(
          updateUserInfoFailure({ msg: "회원 정보를 입력해주세요." })
        );
      if (!validateUsername())
        return dispatch(
          updateUserInfoFailure({
            msg: "이름은 2글자 이상의 영문 또는 한글로 입력해주세요.",
          })
        );
      if (!validateNickname())
        return dispatch(
          updateUserInfoFailure({
            msg: "닉네임은 2글자 이상의 영문 또는 한글로 입력해주세요.",
          })
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
      <ErrorCollapse error={updateUserInfoError} onClick={onClickIconButton} />
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
