import React, { useCallback } from "react";
import { Button } from "@material-ui/core";
import Router from "next/router";

const ExitRoomButton = () => {
  const onClick = useCallback(() => {
    Router.replace("/");
  }, []);
  return (
    <Button onClick={onClick} color="secondary">
      나가기
    </Button>
  );
};

export default ExitRoomButton;
