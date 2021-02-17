import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { connectJanus } from "../../reducers/videoroom";

const Video = () => {
  const dispatch = useDispatch();
  const { janus, sfu, connectJanusDone } = useSelector(
    (state) => state.videoroom
  );
  useEffect(() => {
    dispatch(connectJanus(dispatch));
  }, []);

  useEffect(() => {
    if (!connectJanusDone) return;
  }, [connectJanusDone]);

  if (!connectJanusDone) {
    return <div>연결중입니다..</div>;
  }
  return <div>비디오페이지;ㅇㅇㅇ</div>;
};

export default Video;
