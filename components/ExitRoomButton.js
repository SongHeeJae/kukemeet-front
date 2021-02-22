import React, { useCallback } from "react";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getRoomListRequest, destroyRoomRequest } from "../reducers/videoroom";
import Router from "next/router";
import { useRouter } from "next/router";
const ExitRoomButton = ({ info }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const onClick = useCallback(() => {
    if (!router.query.room) {
      // 방장나갈 땐 방 파괴
      return dispatch(destroyRoomRequest({ info: info.current }));
    }
    Router.replace("/");
  }, []);
  return (
    <Button onClick={onClick} variant="contained" color="secondary">
      나가기
    </Button>
  );
};

export default ExitRoomButton;
