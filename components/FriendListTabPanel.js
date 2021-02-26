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
import { setLoadUser } from "../reducers/user";
import UserInfoDialog from "./UserInfoDialog";

const FriendListWrapper = styled.div`
  height: 400px;
  width: 100%;
  overflow: auto;
`;

const FriendListTabPanel = ({ value, index }) => {
  const wrapperRef = useRef();
  const dispatch = useDispatch();
  const { myFriends } = useSelector((state) => state.user);
  const [userInfoDialogOpen, setUserInfoDialogOpen] = useState(false);

  useEffect(() => {
    wrapperRef.current.style.display = value !== index ? "none" : "block";
  }, [value]);

  const onClickFriend = useCallback((friend) => {
    dispatch(setLoadUser({ info: friend }));
    setUserInfoDialogOpen(true);
  }, []);

  const onClickDeleteFriend = useCallback((friend) => {
    console.log("친구삭제", friend);
  }, []);

  return (
    <FriendListWrapper ref={wrapperRef}>
      <UserInfoDialog
        open={userInfoDialogOpen}
        setOpen={setUserInfoDialogOpen}
      />
      <List>
        {myFriends.map((v) => (
          <ListItem
            button
            key={v.id}
            variant="contained"
            color="primary"
            onClick={() => onClickFriend(v)}
          >
            <ListItemText primary={`${v.username}(${v.nickname})`} />
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
