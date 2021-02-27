import React, { useCallback } from "react";
import { IconButton } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
const UserListButton = ({ setOpen }) => {
  const onClick = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <IconButton onClick={onClick}>
      <PeopleIcon />
    </IconButton>
  );
};

export default UserListButton;
