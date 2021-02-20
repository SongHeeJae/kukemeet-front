import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { MenuList, MenuItem } from "@material-ui/core";
import { useSelector } from "react-redux";

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
  const { id } = useSelector((state) => state.user);

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
          {id ? (
            <MenuItem>
              <Link href="/profile">
                <a>내정보</a>
              </Link>
            </MenuItem>
          ) : (
            [
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
            ]
          )}
        </MenuList>
      </MenuWrapper>
      {children}
    </>
  );
};

export default AppLayout;
