import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { MenuList, MenuItem } from "@material-ui/core";

const DivWrapper = styled.div`
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

const MenuBar = () => {
  return (
    <DivWrapper>
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
        <MenuItem>
          <Link href="/login">
            <a>로그인</a>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/register">
            <a>회원가입</a>
          </Link>
        </MenuItem>
      </MenuList>
    </DivWrapper>
  );
};

export default MenuBar;
