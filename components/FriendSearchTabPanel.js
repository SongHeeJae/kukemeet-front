import React, { useEffect, useRef, memo } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { clearLoadUsersState } from "../reducers/user";
import FriendSearchList from "./FriendSearchList";
import FriendSearchBar from "./FriendSearchBar";

const FriendSearchWrapper = styled.div`
  height: 394px;
  width: 100%;
  overflow: auto;
  padding-top: 6px;
`;

const FriendSearchTabPanel = ({ value, index, setUserInfoDialogOpen }) => {
  const dispatch = useDispatch();
  const wrapperRef = useRef();

  useEffect(() => {
    return () => {
      dispatch(clearLoadUsersState());
    };
  }, []);

  useEffect(() => {
    wrapperRef.current.style.display = value !== index ? "none" : "block";
  }, [value]);

  return (
    <FriendSearchWrapper ref={wrapperRef}>
      <FriendSearchBar />
      <FriendSearchList setOpen={setUserInfoDialogOpen} />
    </FriendSearchWrapper>
  );
};

export default memo(FriendSearchTabPanel);
