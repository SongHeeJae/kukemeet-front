import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { MenuList, MenuItem } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import { logoutRequest } from "../reducers/user";
import MessageDialog from "./MessageDialog";
import FriendDialog from "./FriendDialog";
const MenuWrapper = styled.div`
  display: flex;
  .sign-menu {
    margin-left: auto;
    order: 2;
  }

  .main-menu {
  }

  .menu-list {
    display: flex;
    flex-direction: row;
  }

  a {
    text-decoration: none;
    color: black;
  }
`;

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { id, logoutDone } = useSelector((state) => state.user);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [friendDialogOpen, setFriendDialogOpen] = useState(false);

  useEffect(() => {
    if (!logoutDone) return;
    Router.replace("/");
  }, [logoutDone]);

  const onClickLogout = useCallback(() => {
    dispatch(logoutRequest());
  }, []);

  const onClickMessage = useCallback(() => {
    setMessageDialogOpen(true);
  }, []);

  const onClickFriend = useCallback(() => {
    setFriendDialogOpen(true);
  }, []);

  return (
    <>
      <MenuWrapper>
        <MenuList className="main-menu menu-list">
          <MenuItem>
            <Link href="/">
              <a>홈</a>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/about">
              <a>소개</a>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/question">
              <a>문의</a>
            </Link>
          </MenuItem>
        </MenuList>

        <MenuList className="sign-menu menu-list">
          {id
            ? [
                <MenuItem key="profile">
                  <Link href="/profile">
                    <a>내정보</a>
                  </Link>
                </MenuItem>,
                <MenuItem key="message" onClick={onClickMessage}>
                  쪽지함
                </MenuItem>,
                <MenuItem key="friend" onClick={onClickFriend}>
                  친구관리
                </MenuItem>,
                <MenuItem key="logout" onClick={onClickLogout}>
                  로그아웃
                </MenuItem>,
              ]
            : [
                <MenuItem key="login">
                  <Link href="/login">
                    <a>로그인</a>
                  </Link>
                </MenuItem>,
                <MenuItem key="register">
                  <Link href="/register">
                    <a>회원가입</a>
                  </Link>
                </MenuItem>,
              ]}
        </MenuList>
      </MenuWrapper>
      {!!id && (
        <>
          <MessageDialog
            open={messageDialogOpen}
            setOpen={setMessageDialogOpen}
          />
          <FriendDialog open={friendDialogOpen} setOpen={setFriendDialogOpen} />
        </>
      )}

      {children}
    </>
  );
};

export default AppLayout;
