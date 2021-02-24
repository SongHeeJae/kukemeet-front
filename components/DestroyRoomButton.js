import React, { useCallback } from "react";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { destroyRoomRequest } from "../reducers/videoroom";

const DestroyRoomButton = () => {
  const { openDataChannelDone } = useSelector((state) => state.videoroom);
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(destroyRoomRequest());
  }, []);

  return (
    <Button onClick={onClick} color="secondary" disabled={!openDataChannelDone}>
      방 파괴
    </Button>
  );
};

export default DestroyRoomButton;
