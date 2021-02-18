import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
const VideoList = () => {
  const { myFeed } = useSelector((state) => state.videoroom);
  const videoRef = useRef();

  useEffect(() => {
    if (!myFeed.stream) return;
    videoRef.current.srcObject = myFeed.stream;
  }, [myFeed.stream]);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline />
    </div>
  );
};

export default VideoList;
