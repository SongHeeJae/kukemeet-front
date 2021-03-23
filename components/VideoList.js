import React, { memo } from "react";
import { useSelector } from "react-redux";
import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MyVideo from "./MyVideo";
import VideoItem from "./VideoItem";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
}));

const VideoList = () => {
  const { remoteFeeds, recordingTarget } = useSelector(
    (state) => state.videoroom
  );
  const classes = useStyles();

  const renderActionIcon = (display) => {
    return (
      recordingTarget === display && <FiberManualRecordIcon color="primary" />
    );
  };

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={4}>
        <GridListTile>
          <MyVideo />
          <GridListTileBar title="나" actionIcon={renderActionIcon("나")} />
        </GridListTile>

        {remoteFeeds.map((v) => (
          <GridListTile key={v.id}>
            <VideoItem stream={v.stream} display={v.display} hark={v.hark} />
            <GridListTileBar
              title={v.display}
              actionIcon={renderActionIcon(v.display)}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default memo(VideoList);
