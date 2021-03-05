import React, { memo } from "react";
import { List } from "@material-ui/core";
import FriendSearchListItem from "./FriendSearchListItem";
import { useSelector } from "react-redux";

const FriendSearchList = ({ setOpen }) => {
  const { loadUsers } = useSelector((state) => state.user);

  return (
    <List>
      {loadUsers.map((u) => (
        <FriendSearchListItem key={u.id} user={u} setOpen={setOpen} />
      ))}
    </List>
  );
};

export default memo(FriendSearchList);
