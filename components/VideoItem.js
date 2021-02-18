import React, { useRef, useEffect } from "react";

const VideoItem = ({ stream }) => {
  const videoRef = useRef();

  useEffect(() => {
    videoRef.current.srcObject = stream;
  }, []);
  return <video ref={videoRef} autoPlay playsInline />;
};

export default VideoItem;
