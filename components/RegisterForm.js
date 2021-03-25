import React, { useCallback, useEffect, memo } from "react";
import { Button, TextField, CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import useInput from "../hooks/useInput";
import styled from "styled-components";
import {
  registerRequest,
  clearRegisterState,
  registerFailure,
} from "../reducers/user";
import ErrorCollapse from "./ErrorCollapse";

const RegisterFormWrapper = styled.div`
  text-align: center;
  .register-text-field {
    margin: 10px;
  }
`;

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { registerDone, registerError, registerLoading } = useSelector(
    (state) => state.user
  );
  const [uid, onChangeUid] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordConfirm, onChangePasswordConfirm] = useInput("");
  const [username, onChangeUsername] = useInput("");
  const [nickname, onChangeNickname] = useInput("");

  useEffect(() => {
    if (!registerDone) return;
    Router.replace("/");
    dispatch(clearRegisterState());
  }, [registerDone]);

  const validateUsername = useCallback(() => {
    if (username.length > 1 && username.match(/^[A-Za-z가-힣]+$/)) {
      return true;
    } else {
      return false;
    }
  }, [username]);

  const validateNickname = useCallback(() => {
    if (nickname.length > 1 && nickname.match(/^[A-Za-z가-힣]+$/)) {
      return true;
    } else {
      return false;
    }
  }, [nickname]);

  const validatePassword = useCallback(() => {
    if (
      password.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      )
    ) {
      return true;
    } else {
      return false;
    }
  }, [password]);

  const validatePasswordConfirm = useCallback(() => {
    if (passwordConfirm && password !== passwordConfirm) return false;
    else return true;
  }, [password, passwordConfirm]);

  const onClickErrorIconButton = useCallback(() => {
    dispatch(clearRegisterState());
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!validatePassword())
        return dispatch(
          registerFailure({
            msg:
              "비밀번호는 최소 8자리이면서 1개 이상의 알파벳, 숫자, 특수문자를 포함해야합니다.",
          })
        );
      if (!validatePasswordConfirm())
        return dispatch(
          registerFailure({
            msg: "비밀번호와 비밀번호 확인을 일치시켜주세요.",
          })
        );
      if (!validateUsername())
        return dispatch(
          registerFailure({
            msg: "이름은 2글자 이상의 영문 또는 한글로 입력해주세요.",
          })
        );
      if (!validateNickname())
        return dispatch(
          registerFailure({
            msg: "닉네임은 2글자 이상의 영문 또는 한글로 입력해주세요.",
          })
        );

      dispatch(
        registerRequest({
          uid,
          password,
          username,
          nickname,
        })
      );
    },
    [uid, password, passwordConfirm, username, nickname]
  );

  return (
    <RegisterFormWrapper>
      <h1>회원 정보를 입력해주세요.</h1>
      <ErrorCollapse error={registerError} onClick={onClickErrorIconButton} />
      <form onSubmit={onSubmit}>
        <TextField
          required
          label="이메일 아이디"
          type="email"
          value={uid}
          onChange={onChangeUid}
          variant="outlined"
          className="register-text-field"
        />
        <br />
        <TextField
          type="password"
          required
          label="비밀번호"
          value={password}
          onChange={onChangePassword}
          variant="outlined"
          className="register-text-field"
        />
        <br />
        <TextField
          error={!validatePasswordConfirm()}
          type="password"
          required
          label="비밀번호 확인"
          helperText={
            !validatePasswordConfirm() && "비밀번호가 일치하지않습니다."
          }
          value={passwordConfirm}
          onChange={onChangePasswordConfirm}
          variant="outlined"
          className="register-text-field"
        />
        <br />
        <TextField
          required
          label="사용자 이름"
          value={username}
          onChange={onChangeUsername}
          variant="outlined"
          className="register-text-field"
        />
        <br />
        <TextField
          required
          label="닉네임"
          value={nickname}
          onChange={onChangeNickname}
          variant="outlined"
          className="register-text-field"
        />
        <br />
        {registerLoading ? (
          <CircularProgress />
        ) : (
          <Button type="submit">회원가입</Button>
        )}
      </form>
    </RegisterFormWrapper>
  );
};

export default memo(RegisterForm);
