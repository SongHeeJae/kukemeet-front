import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Button, TextField, CircularProgress } from "@material-ui/core";
import Router from "next/router";
import Link from "next/link";
import useInput from "../hooks/useInput";
import { clearLoginState, loginFailure, loginRequest } from "../reducers/user";
import ErrorCollapse from "./ErrorCollapse";
import KakaoLoginButton from "./KakaoLoginButton";

const LoginFormWrapper = styled.div`
  text-align: center;
  .login-text-field {
    margin: 10px;
  }
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const [uid, onChangeUid] = useInput("");
  const [password, onChangePassword] = useInput("");
  const { loginError, loginDone, loginLoading } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (!loginDone) return;
    Router.replace("/");
  }, [loginDone]);

  const onClickErrorIconButton = useCallback(() => {
    dispatch(clearLoginState());
  }, []);

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

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!validatePassword())
        return dispatch(
          loginFailure({
            msg:
              "비밀번호는 최소 8자리이면서 1개 이상의 알파벳, 숫자, 특수문자를 포함해야합니다.",
          })
        );
      dispatch(loginRequest({ uid, password }));
    },
    [uid, password]
  );
  return (
    <LoginFormWrapper>
      <h1>로그인 정보를 입력해주세요.</h1>
      <ErrorCollapse error={loginError} onClick={onClickErrorIconButton} />
      <form onSubmit={onSubmit}>
        <TextField
          required
          label="이메일 아이디"
          type="email"
          value={uid}
          onChange={onChangeUid}
          variant="outlined"
          className="login-text-field"
        />
        <br />
        <TextField
          type="password"
          required
          label="비밀번호"
          value={password}
          onChange={onChangePassword}
          variant="outlined"
          className="login-text-field"
        />
        <br />
        {loginLoading ? (
          <CircularProgress />
        ) : (
          <Button type="submit">로그인</Button>
        )}
        <br />
        <KakaoLoginButton />
        <br />
        <Link href="/forgot-password">
          <Button>비밀번호를 잃어버렸어요</Button>
        </Link>
      </form>
    </LoginFormWrapper>
  );
};

export default LoginForm;
