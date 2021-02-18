import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
const VideoList = () => {
  const { myFeed } = useSelector((state) => state.user);
  const videoRef = useRef();

  useEffect(() => {
    console.log("myFeed ===", myFeed);
  }, [myFeed]);

  return (
    <div>
      <video ref={videoRef} src={myFeed && myFeed.stream} />
    </div>
  );
};

export default VideoList;
