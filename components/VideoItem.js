import React, { useRef, useEffect, useCallback, memo } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { changeMainStreamSuccess } from "../reducers/videoroom";

const VideoWrapper = styled.video`
  width: 100%;
  height: 100%;
`;

const VideoItem = ({ stream, display }) => {
  const dispatch = useDispatch();
  const videoRef = useRef();

  useEffect(() => {
    videoRef.current.srcObject = stream;
  }, [stream && stream.getVideoTracks().length > 0]);

  const onClick = useCallback(() => {
    dispatch(changeMainStreamSuccess({ stream, display }));
  }, [stream]);
  return <VideoWrapper ref={videoRef} autoPlay playsInline onClick={onClick} />;
};

export default memo(
  VideoItem,
  (prevProps, nextProps) => prevProps.stream === nextProps.stream
);
