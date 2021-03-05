import React, { useCallback, memo } from "react";
import { useDispatch } from "react-redux";
import { ListItem, ListItemText } from "@material-ui/core";
import { setLoadUser } from "../reducers/user";

const FriendSearchListItem = ({ setOpen, user }) => {
  const dispatch = useDispatch();
  const onClickUser = useCallback((user) => {
    dispatch(setLoadUser({ info: user }));
    setOpen(true);
  }, []);

  return (
    <ListItem
      button
      variant="contained"
      color="primary"
      onClick={() => onClickUser(user)}
    >
      <ListItemText primary={`${user.username}(${user.nickname})`} />
    </ListItem>
  );
};

export default memo(FriendSearchListItem);
