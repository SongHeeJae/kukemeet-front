import React, { useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

const MainVideoWrapper = styled.div`
  position: relative;
`;

const VideoWrapper = styled.video`
  width: 100%;
  height: 75vh;
  position: relative;
  z-index: 0;
`;

const DisplayTextWrapper = styled.div`
  position: absolute;
  top: 95%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
  color: white;
`;

const Global = createGlobalStyle`
video::-webkit-media-controls-play-button {
  display: none !important;
  -webkit-appearance: none;
}
video::-webkit-media-controls-timeline {
  display: none !important;
  -webkit-appearance: none;
}
video::-webkit-media-controls-current-time-display {
  display: none !important;
  -webkit-appearance: none;
}
video::-webkit-media-controls-time-remaining-display {
  display: none !important;
  -webkit-appearance: none;
}
video::-webkit-media-controls-mute-button {
  display: none !important;
  -webkit-appearance: none;
}
video::-webkit-media-controls-toggle-closed-captions-button {
  display: none !important;
  -webkit-appearance: none;
}
video::-webkit-media-controls-volume-slider {
  display: none !important;
  -webkit-appearance: none;
}
`;

const MainVideo = () => {
  const { mainStream } = useSelector((state) => state.videoroom);
  const videoRef = useRef();

  useEffect(() => {
    if (!mainStream.stream) return;
    videoRef.current.srcObject = mainStream.stream;
  }, [mainStream.stream]);

  const onClick = useCallback((e) => {
    e.preventDefault();
  }, []);
  return (
    <MainVideoWrapper>
      <Global />
      <VideoWrapper
        autoPlay
        playsInline
        ref={videoRef}
        controls
        onClick={onClick}
        muted={true}
      />
      <DisplayTextWrapper>{mainStream.display}</DisplayTextWrapper>
    </MainVideoWrapper>
  );
};

export default MainVideo;
