import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const VideoWrapper = styled.video`
  width: 100%;
  height: 100%;
`;

const VideoItem = ({ stream }) => {
  const videoRef = useRef();
  useEffect(() => {
    videoRef.current.srcObject = stream;
  }, []);
  return (
    <VideoWrapper
      style={{ width: "100%", height: "100%" }}
      ref={videoRef}
      autoPlay
      playsInline
    />
  );
};

export default VideoItem;
