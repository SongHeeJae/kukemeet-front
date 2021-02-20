import React, { useCallback, useEffect } from "react";
import { Button, TextField, Collapse, IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import Alert from "@material-ui/lab/Alert";
import useInput from "../hooks/useInput";
import styled from "styled-components";
import { registerRequest, clearRegisterState } from "../reducers/user";
import CloseIcon from "@material-ui/icons/Close";

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
      if (!validatePasswordConfirm()) return;
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
      <Collapse in={registerError.length > 0}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={onClickErrorIconButton}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {registerError}
        </Alert>
      </Collapse>
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
        <Button type="submit">회원가입</Button>
      </form>
    </RegisterFormWrapper>
  );
};

export default RegisterForm;
