import React, { useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { changeMainStreamRequest } from "../reducers/videoroom";

const VideoWrapper = styled.video`
  width: 100%;
  height: 100%;
`;

const VideoItem = ({ stream, display }) => {
  const dispatch = useDispatch();
  const videoRef = useRef();
  useEffect(() => {
    videoRef.current.srcObject = stream;
  }, []);

  const onClick = useCallback(() => {
    dispatch(changeMainStreamRequest({ stream, display }));
  }, [stream]);
  return <VideoWrapper ref={videoRef} autoPlay playsInline onClick={onClick} />;
};

export default VideoItem;
