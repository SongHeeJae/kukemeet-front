import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  List,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StarIcon from "@material-ui/icons/star";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxHeight: 400,
    height: 400,
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "solid 1px",
    borderRadius: "20px",
    margin: "10px",
  },
}));

const UserList = () => {
  const { username, nickname } = useSelector((state) => state.user);
  const { remoteFeeds } = useSelector((state) => state.videoroom);
  const classes = useStyles();

  const onClick = useCallback((display) => {
    console.log(display);
  }, []);

  return (
    <div className={classes.root}>
      <List>
        <ListItem button>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary={`${nickname}(${username})`} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {remoteFeeds.map((v) => (
          <ListItem button key={v.display} onClick={() => onClick(v.display)}>
            <ListItemText primary={v.display} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UserList;
