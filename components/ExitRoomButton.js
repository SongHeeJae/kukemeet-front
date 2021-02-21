import React, { useCallback } from "react";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getRoomListRequest } from "../reducers/videoroom";
const ExitRoomButton = ({ info }) => {
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(getRoomListRequest({ info: info.current }));
  }, []);
  return (
    <Button onClick={onClick} variant="contained" color="secondary">
      나가기
    </Button>
  );
};

export default ExitRoomButton;
