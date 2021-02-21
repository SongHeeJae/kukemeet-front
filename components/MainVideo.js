import React, { useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

const VideoWrapper = styled.video`
  width: 100%;
`;

const EmptyVideoDivWrapper = styled.div`
  text-align: center;
  padding: 70px;
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
    <>
      <Global />
      {mainStream.stream ? (
        <>
          <VideoWrapper
            autoPlay
            playsInline
            ref={videoRef}
            controls
            onClick={onClick}
            muted={true}
          />
          <div>{mainStream.display}</div>
        </>
      ) : (
        <EmptyVideoDivWrapper>
          다른 사용자의 비디오를 클릭하면 중앙으로 활성화됩니다^^
        </EmptyVideoDivWrapper>
      )}
    </>
  );
};

export default MainVideo;
