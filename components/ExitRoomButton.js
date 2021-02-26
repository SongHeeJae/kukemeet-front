import React, { useCallback } from "react";
import { IconButton } from "@material-ui/core";
import Router from "next/router";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const ExitRoomButton = () => {
  const onClick = useCallback(() => {
    Router.replace("/");
  }, []);
  return (
    <IconButton onClick={onClick} color="secondary">
      <ExitToAppIcon />
    </IconButton>
  );
};

export default ExitRoomButton;
