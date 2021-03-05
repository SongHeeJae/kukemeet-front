import React, { memo } from "react";
import { useSelector } from "react-redux";
import VideoItem from "./VideoItem";
import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MyVideo from "./MyVideo";

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
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.dark,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

const VideoList = () => {
  const { remoteFeeds } = useSelector((state) => state.videoroom);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={4}>
        <GridListTile>
          <MyVideo />
          <GridListTileBar
            title="나"
            classes={{
              root: classes.titleBar,
              title: classes.title,
            }}
          />
        </GridListTile>

        {remoteFeeds.map((v) => (
          <GridListTile key={v.id}>
            <VideoItem stream={v.stream} display={v.display} hark={v.hark} />
            <GridListTileBar
              title={v.display}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default memo(VideoList);
