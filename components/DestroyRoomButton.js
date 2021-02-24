import React, { useCallback } from "react";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { destroyRoomRequest } from "../reducers/videoroom";
import Router from "next/router";
import { useRouter } from "next/router";
const DestroyRoomButton = ({ info }) => {
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(destroyRoomRequest({ info: info.current }));
  }, []);

  return (
    <Button onClick={onClick} color="secondary">
      방 파괴
    </Button>
  );
};

export default DestroyRoomButton;
