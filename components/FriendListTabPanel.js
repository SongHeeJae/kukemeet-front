import React, { useEffect, useRef, useCallback, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import {
  setLoadUser,
  deleteFriendRequest,
  loadMyFriendsRequest,
  clearMyFriendsState,
  clearDeleteFriendState,
} from "../reducers/user";
import UserInfoDialog from "./UserInfoDialog";

const FriendListWrapper = styled.div`
  height: 400px;
  width: 100%;
  overflow: auto;
`;

const FriendListTabPanel = ({ value, index, setUserInfoDialogOpen }) => {
  const wrapperRef = useRef();
  const dispatch = useDispatch();
  const { myFriends } = useSelector((state) => state.user);

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

  const onClickFriend = useCallback((friend) => {
    dispatch(setLoadUser({ info: friend.user }));
    setUserInfoDialogOpen(true);
  }, []);

  const onClickDeleteFriend = useCallback((friend) => {
    dispatch(deleteFriendRequest({ id: friend.id }));
  }, []);

  return (
    <FriendListWrapper ref={wrapperRef}>
      <List>
        {myFriends.map((v) => (
          <ListItem
            button
            key={v.id}
            variant="contained"
            color="primary"
            onClick={() => onClickFriend(v)}
          >
            <ListItemText primary={`${v.user.username}(${v.user.nickname})`} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => onClickDeleteFriend(v)}>
                <RemoveCircleOutlineIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </FriendListWrapper>
  );
};

export default FriendListTabPanel;
