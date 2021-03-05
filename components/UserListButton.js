import React, { useCallback, memo } from "react";
import { IconButton } from "@material-ui/core";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";

const UserListButton = ({ setOpen }) => {
  const onClick = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <IconButton onClick={onClick}>
      <SentimentVerySatisfiedIcon />
    </IconButton>
  );
};

export default memo(UserListButton);
