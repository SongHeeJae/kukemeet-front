import React, { useRef, useEffect, memo, useCallback } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { changeMainStreamSuccess } from "../reducers/videoroom";
import { useDispatch } from "react-redux";

const VideoWrapper = styled.video`
  width: 100%;
  height: 100%;
`;

const MyVideo = () => {
  const dispatch = useDispatch();
  const videoRef = useRef();
  const { myFeed } = useSelector((state) => state.videoroom);
  const { stream } = myFeed;
  useEffect(() => {
    if (!stream) return;
    videoRef.current.srcObject = stream;
  }, [stream]);

  const onClick = useCallback(() => {
    dispatch(changeMainStreamSuccess({ stream, display: "나" }));
  }, [stream]);

  if (!myFeed.stream) {
    <div>로딩중..</div>;
  }
  return (
    <VideoWrapper ref={videoRef} autoPlay playsInline muted onClick={onClick} />
  );
};

export default memo(MyVideo);
