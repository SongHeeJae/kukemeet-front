import React, { useCallback, useEffect } from "react";
import { TextField, Button, CircularProgress } from "@material-ui/core";
import useInput from "../hooks/useInput";
import styled from "styled-components";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";

import ErrorCollapse from "./ErrorCollapse";
import {
  changeForgottenPasswordFailure,
  changeForgottenPasswordRequest,
  clearChangeForgottenPasswordState,
  clearSendCodeEmailState,
  sendCodeEmailFailure,
  sendCodeEmailRequest,
} from "../reducers/user";

const ForgotPasswordFormWrapper = styled.div`
  text-align: center;
  .forgot-password-text-field {
    margin: 10px;
  }
`;

const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const {
    sendCodeEmailError,
    sendCodeEmailLoading,
    changeForgottenPasswordLoading,
    changeForgottenPasswordError,
    changeForgottenPasswordDone,
  } = useSelector((state) => state.user);
  const [uid, onChangeUid] = useInput("");
  const [code, onChangeCode] = useInput("");
  const [nextPassword, onChangeNextPassword] = useInput("");
  const [nextPasswordConfirm, onChangeNextPasswordConfirm] = useInput("");

  useEffect(() => {
    if (!changeForgottenPasswordDone) return;
    Router.replace("/login");
  }, [changeForgottenPasswordDone]);

  const validatePassword = useCallback(() => {
    if (
      nextPassword.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      )
    ) {
      return true;
    } else {
      return false;
    }
  }, [nextPassword]);

  const validateNextPasswordConfirm = useCallback(() => {
    if (nextPasswordConfirm && nextPassword !== nextPasswordConfirm)
      return false;
    else return true;
  }, [nextPassword, nextPasswordConfirm]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!nextPassword || !nextPasswordConfirm)
        return dispatch(
          changeForgottenPasswordFailure({ msg: "비밀번호를 입력해주세요." })
        );
      if (!code)
        return dispatch(
          changeForgottenPasswordFailure({ msg: "인증번호를 입력해주세요." })
        );
      if (!validatePassword())
        return dispatch(
          changeForgottenPasswordFailure({
            msg:
              "비밀번호는 최소 8자리이면서 1개 이상의 알파벳, 숫자, 특수문자를 포함해야합니다.",
          })
        );
      if (!validateNextPasswordConfirm())
        return dispatch(
          changeForgottenPasswordFailure({ msg: "비밀번호를 일치시켜주세요." })
        );
      dispatch(
        changeForgottenPasswordRequest({
          code,
          nextPassword,
          uid,
        })
      );
    },
    [code, nextPassword, nextPasswordConfirm, uid]
  );

  const onClickSendCodeEmail = useCallback(() => {
    dispatch(sendCodeEmailRequest({ uid }));
  }, [uid]);

  const onClickSendCodeEmailErrorIconButton = useCallback(() => {
    dispatch(clearSendCodeEmailState());
  }, []);

  const onClickchangeForgottenPasswordErrorIconButton = useCallback(() => {
    dispatch(clearChangeForgottenPasswordState());
  }, []);

  return (
    <ForgotPasswordFormWrapper>
      <h1>비밀번호 변경</h1>
      <ErrorCollapse
        error={sendCodeEmailError}
        onClick={onClickSendCodeEmailErrorIconButton}
      />
      <ErrorCollapse
        error={changeForgottenPasswordError}
        onClick={onClickchangeForgottenPasswordErrorIconButton}
      />
      <form onSubmit={onSubmit}>
        <TextField
          required
          label="이메일"
          type="email"
          value={uid}
          onChange={onChangeUid}
          variant="outlined"
          className="forgot-password-text-field"
        />
        <br />
        {sendCodeEmailLoading ? (
          <CircularProgress />
        ) : (
          <Button onClick={onClickSendCodeEmail}>인증번호 발송</Button>
        )}

        <br />
        <TextField
          required
          label="인증번호"
          value={code}
          onChange={onChangeCode}
          variant="outlined"
          className="forgot-password-text-field"
        />
        <br />
        <TextField
          required
          label="변경 비밀번호"
          type="password"
          value={nextPassword}
          onChange={onChangeNextPassword}
          variant="outlined"
          className="forgot-password-text-field"
        />
        <br />
        <TextField
          required
          label="변경 비밀번호 확인"
          type="password"
          value={nextPasswordConfirm}
          onChange={onChangeNextPasswordConfirm}
          className="forgot-password-text-field"
          variant="outlined"
          helperText={
            !validateNextPasswordConfirm() && "비밀번호가 일치하지않습니다."
          }
        />
        <br />
        {changeForgottenPasswordLoading ? (
          <CircularProgress />
        ) : (
          <Button type="submit">변경</Button>
        )}
      </form>
    </ForgotPasswordFormWrapper>
  );
};

export default ForgotPasswordForm;
