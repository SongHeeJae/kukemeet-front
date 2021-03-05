import React, { useEffect, useRef, memo } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import {
  loadMyFriendsRequest,
  clearMyFriendsState,
  clearDeleteFriendState,
} from "../reducers/user";
import FriendList from "./FriendList";

const FriendListWrapper = styled.div`
  height: 400px;
  width: 100%;
  overflow: auto;
`;

const FriendListTabPanel = ({ value, index, setUserInfoDialogOpen }) => {
  const wrapperRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMyFriendsRequest());
    return () => {
      dispatch(clearMyFriendsState());
      dispatch(clearDeleteFriendState());
    };
  }, []);

  useEffect(() => {
    wrapperRef.current.style.display = value !== index ? "none" : "block";
  }, [value]);

  return (
    <FriendListWrapper ref={wrapperRef}>
      <FriendList setOpen={setUserInfoDialogOpen} />
    </FriendListWrapper>
  );
};

export default memo(FriendListTabPanel);
