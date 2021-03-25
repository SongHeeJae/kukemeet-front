import React, { useCallback, memo } from "react";
import { Button, TextField } from "@material-ui/core";
import Router from "next/router";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import ErrorCollapse from "./ErrorCollapse";
import { useSelector, useDispatch } from "react-redux";
import { clearUseRoomState, useRoomFailure } from "../reducers/videoroom";

const RoomConfigDivWrapper = styled.div`
  text-align: center;
  .room-config-div {
    margin: 30px;
  }
`;

const RoomConfig = () => {
  const { id } = useSelector((state) => state.user);
  const { useRoomError } = useSelector((state) => state.videoroom);
  const dispatch = useDispatch();
  const [roomNumber, onChangeRoomNumber] = useInput("");

  const NotLoggedInFailure = useCallback(() => {
    dispatch(useRoomFailure({ msg: "로그인 후 이용할 수 있습니다." }));
  }, []);

  const onClickCreateRoom = useCallback(() => {
    if (!id) return NotLoggedInFailure();
    Router.push("/video");
  }, []);

  const onSubmitJoinRoom = useCallback(
    (e) => {
      e.preventDefault();
      if (!id) return NotLoggedInFailure();
      Router.push({
        pathname: "/video",
        query: { room: roomNumber },
      });
    },
    [roomNumber]
  );

  const onClickErrorIconButton = useCallback(() => {
    dispatch(clearUseRoomState());
  }, []);

  return (
    <RoomConfigDivWrapper>
      <ErrorCollapse error={useRoomError} onClick={onClickErrorIconButton} />
      <div className="room-config-div">
        <Button onClick={onClickCreateRoom}>방 생성</Button>
      </div>
      <div className="room-config-div">
        <form onSubmit={onSubmitJoinRoom}>
          <TextField
            required
            label="방 번호"
            value={roomNumber}
            onChange={onChangeRoomNumber}
            variant="outlined"
          />
          <Button type="submit"> 방 입장</Button>
        </form>
      </div>
    </RoomConfigDivWrapper>
  );
};

export default memo(RoomConfig);
