import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { TextField, Button, Collapse, IconButton } from "@material-ui/core";
import Router from "next/router";
import {
  clearUpdateUserPasswordState,
  updateUserPasswordRequest,
  updateUserPasswordFailure,
} from "../reducers/user";
import useInput from "../hooks/useInput";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";

const MyInfoMainFormWrapper = styled.div`
  text-align: center;
  .my-info-password-field {
    margin: 10px;
  }
`;

const MyInfoPasswordForm = () => {
  const dispatch = useDispatch();
  const { updateUserPasswordDone, updateUserPasswordError } = useSelector(
    (state) => state.user
  );
  const [
    currentPassword,
    onChangeCurrentPassword,
    setCurrentPassword,
  ] = useInput("");
  const [nextPassword, onChangeNextPassword, setNextPassword] = useInput("");
  const [
    nextPasswordConfirm,
    onChangeNextPasswordConfirm,
    setNextPasswordConfirm,
  ] = useInput("");

  useEffect(() => {
    return () => {
      dispatch(clearUpdateUserPasswordState());
    };
  }, []);

  useEffect(() => {
    if (!updateUserPasswordDone) return;
    setCurrentPassword("");
    setNextPassword("");
    setNextPasswordConfirm("");
  }, [updateUserPasswordDone]);

  const validatePasswordConfirm = useCallback(() => {
    if (nextPasswordConfirm && nextPassword !== nextPasswordConfirm)
      return false;
    else return true;
  }, [nextPassword, nextPasswordConfirm]);

  const onClickUpdateUserpassword = useCallback(() => {
    if (!validatePasswordConfirm())
      return dispatch(
        updateUserPasswordFailure({ msg: "비밀번호를 일치시켜주세요." })
      );
    if (!currentPassword || !nextPassword || !nextPasswordConfirm)
      return dispatch(
        updateUserPasswordFailure({ msg: "비밀번호를 입력해주세요." })
      );
    dispatch(
      updateUserPasswordRequest({
        currentPassword,
        nextPassword,
      })
    );
  }, [currentPassword, nextPassword, nextPasswordConfirm]);

  const onClickIconButton = useCallback(() => {
    dispatch(clearUpdateUserPasswordState());
  }, []);

  return (
    <MyInfoMainFormWrapper>
      <Collapse in={updateUserPasswordDone}>
        <Alert
          severity="success"
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
          비밀번호가 변경되었습니다.
        </Alert>
      </Collapse>

      <Collapse in={updateUserPasswordError.length > 0}>
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
          {updateUserPasswordError}
        </Alert>
      </Collapse>
      <h1>비밀번호 변경</h1>
      <TextField
        required
        label="현재 비밀번호"
        type="password"
        value={currentPassword}
        onChange={onChangeCurrentPassword}
        variant="outlined"
        className="my-info-password-field"
      />
      <br />
      <TextField
        required
        label="변경 비밀번호"
        type="password"
        value={nextPassword}
        onChange={onChangeNextPassword}
        className="my-info-password-field"
        variant="outlined"
      />
      <br />
      <TextField
        required
        label="변경 비밀번호 확인"
        type="password"
        value={nextPasswordConfirm}
        onChange={onChangeNextPasswordConfirm}
        variant="outlined"
        className="my-info-password-field"
        helperText={
          !validatePasswordConfirm() && "비밀번호가 일치하지않습니다."
        }
      />
      <br />
      <Button onClick={onClickUpdateUserpassword}>변경</Button>
    </MyInfoMainFormWrapper>
  );
};

export default MyInfoPasswordForm;
