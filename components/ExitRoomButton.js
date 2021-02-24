import React, { useCallback } from "react";
import { Button } from "@material-ui/core";
import Router from "next/router";
import { useSelector } from "react-redux";

const ExitRoomButton = () => {
  const { openDataChannelDone } = useSelector((state) => state.videoroom);

  const onClick = useCallback(() => {
    Router.replace("/");
  }, []);
  return (
    <Button onClick={onClick} color="secondary" disabled={!openDataChannelDone}>
      나가기
    </Button>
  );
};

export default ExitRoomButton;
