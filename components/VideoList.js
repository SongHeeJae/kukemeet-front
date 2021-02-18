import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import VideoItem from "./VideoItem";

const VideoList = () => {
  const { myFeed, remoteFeeds } = useSelector((state) => state.videoroom);

  return (
    <div>
      {myFeed.stream && <VideoItem stream={myFeed.stream} />}
      {remoteFeeds.map((v) => (
        <VideoItem stream={v.stream} key={v.id} />
      ))}
    </div>
  );
};

export default VideoList;
