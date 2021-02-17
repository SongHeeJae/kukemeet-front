import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { joinRoom, connectJanus } from "../../reducers/videoroom";
import { useRouter } from "next/router";

const Video = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { room } = parseInt(router.query.room);
  const { connectJanusDone } = useSelector((state) => state.videoroom);
  const { username, nickname } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(connectJanus(dispatch));
  }, []);

  useEffect(() => {
    if (!connectJanusDone) return;
    dispatch(joinRoom({ room: 1234, nickname, username }));
    // 반환 426 코드면 룸 생성하면됨 테스트룸 1234
  }, [connectJanusDone]);

  if (!connectJanusDone) {
    return <div>연결중입니다..</div>;
  }
  return <div>비디오페이지;ㅇㅇㅇ</div>;
};

export default Video;
