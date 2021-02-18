import React, { useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { createGlobalStyle } from "styled-components";

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
          <video
            autoPlay
            playsInline
            ref={videoRef}
            controls
            onClick={onClick}
          />
          <div>{mainStream.display}</div>
        </>
      ) : (
        <div>메인 비디오 없음..</div>
      )}
    </>
  );
};

export default MainVideo;
