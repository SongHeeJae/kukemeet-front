import React, { useCallback, memo } from "react";
import { useDispatch } from "react-redux";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { setLoadUser, deleteFriendRequest } from "../reducers/user";

const FriendListItem = ({ setOpen, friend }) => {
  const dispatch = useDispatch();

  const onClickFriend = useCallback(() => {
    dispatch(setLoadUser({ info: friend.user }));
    setOpen(true);
  }, []);

  const onClickDeleteFriend = useCallback(() => {
    dispatch(deleteFriendRequest({ id: friend.id }));
  }, []);

  return (
    <ListItem
      button
      key={friend.id}
      variant="contained"
      color="primary"
      onClick={() => onClickFriend(friend)}
    >
      <ListItemText
        primary={`${friend.user.username}(${friend.user.nickname})`}
      />
      <ListItemSecondaryAction>
        <IconButton onClick={() => onClickDeleteFriend(friend)}>
          <RemoveCircleOutlineIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default memo(FriendListItem);
