import React, { useEffect, useRef, memo } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  loadMyFriendsRequest,
  clearMyFriendsState,
  clearDeleteFriendState,
} from "../reducers/user";
import FriendList from "./FriendList";
import { CircularProgress } from "@material-ui/core";

const FriendListWrapper = styled.div`
  height: 400px;
  width: 100%;
  overflow: auto;
`;

const FriendListTabPanel = ({ value, index, setUserInfoDialogOpen }) => {
  const wrapperRef = useRef();
  const dispatch = useDispatch();
  const { loadMyFriendsLoading } = useSelector((state) => state.user);

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
      {loadMyFriendsLoading ? (
        <CircularProgress />
      ) : (
        <FriendList setOpen={setUserInfoDialogOpen} />
      )}
    </FriendListWrapper>
  );
};

export default memo(FriendListTabPanel);
