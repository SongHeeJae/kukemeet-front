import React, { useCallback, useEffect, useRef } from "react";
import { Button, TextField, CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import useInput from "../hooks/useInput";
import { useRouter } from "next/router";
import {
  clearRegisterState,
  registerFailure,
  registerByProviderRequest,
  loginByProviderRequest,
} from "../reducers/user";
import ErrorCollapse from "./ErrorCollapse";
import axios from "axios";
import styled from "styled-components";

const CircularProgressWrapper = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const RegisterByProviderFormWrapper = styled.div`
  text-align: center;
  .register-text-field {
    margin: 10px;
  }
`;

const RegisterByProviderForm = () => {
  const dispatch = useDispatch();
  const accessToken = useRef(null);
  const router = useRouter();
  const {
    registerDone,
    registerError,
    registerLoading,
    loginError,
    loginDone,
  } = useSelector((state) => state.user);
  const { code, provider } = router.query;
  const [username, onChangeUsername] = useInput("");
  const [nickname, onChangeNickname] = useInput("");

  useEffect(async () => {
    if (!code || !provider) return;
    const response = await axios.post("/api/social/get-token-by-provider", {
      code,
      provider,
    });
    accessToken.current = response.data.data["access_token"];
    dispatch(
      loginByProviderRequest({
        accessToken: accessToken.current,
        provider,
      })
    );
  }, []);

  useEffect(() => {
    // 에러 코드 -1020 로그인은 됐지만, 회원 정보 아직 입력되지 않은 경우
    if (!loginError || loginError == -1020) return;
    Router.replace("/");
  }, [loginError]);

  useEffect(() => {
    if (!loginDone && !registerDone) return;
    Router.replace("/");
  }, [loginDone, registerDone]);

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

  const onClickErrorIconButton = useCallback(() => {
    dispatch(clearRegisterState());
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
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
        registerByProviderRequest({
          accessToken: accessToken.current,
          provider,
          username,
          nickname,
        })
      );
    },
    [username, nickname]
  );

  return (
    <>
      {loginError ? (
        <RegisterByProviderFormWrapper>
          <h1>회원 정보를 입력해주세요.</h1>
          <ErrorCollapse
            error={registerError}
            onClick={onClickErrorIconButton}
          />
          <form onSubmit={onSubmit}>
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
        </RegisterByProviderFormWrapper>
      ) : (
        <CircularProgressWrapper>
          <CircularProgress size="10rem" />
        </CircularProgressWrapper>
      )}
    </>
  );
};

export default RegisterByProviderForm;
