import React, { useRef, useEffect, memo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const VideoWrapper = styled.video`
  width: 100%;
  height: 100%;
`;

const MyVideo = () => {
  const videoRef = useRef();
  const { myFeed } = useSelector((state) => state.videoroom);
  useEffect(() => {
    if (!myFeed.stream) return;
    videoRef.current.srcObject = myFeed.stream;
  }, [myFeed.stream]);

  if (!myFeed.stream) {
    <div>로딩중..</div>;
  }
  return (
    <>
      <VideoWrapper ref={videoRef} autoPlay playsInline muted />
    </>
  );
};

export default memo(MyVideo);
