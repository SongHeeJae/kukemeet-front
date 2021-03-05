import React, { memo } from "react";
import { useSelector } from "react-redux";
import { List } from "@material-ui/core";
import FriendListItem from "./FriendListItem";

const FriendList = ({ setOpen }) => {
  const { myFriends } = useSelector((state) => state.user);

  return (
    <List>
      {myFriends.map((v) => (
        <FriendListItem key={v.id} friend={v} setOpen={setOpen} />
      ))}
    </List>
  );
};

export default memo(FriendList);
