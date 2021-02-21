import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  List,
  Divider,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StarIcon from "@material-ui/icons/star";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

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

  const onClickUserInfo = useCallback((popupState, display) => {
    popupState.close();
    console.log(display);
  }, []);

  const onClickMessage = useCallback((popupState, display) => {
    popupState.close();
    console.log(display);
  }, []);

  const onClickAddFriend = useCallback((popupState, display) => {
    popupState.close();
    console.log(display);
  }, []);

  return (
    <div className={classes.root}>
      <List>
        <ListItem button>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText
            primary={`${nickname}(${username}) 접속 ${
              remoteFeeds.length + 1
            }명`}
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        {remoteFeeds.map((v) => (
          <PopupState variant="popover" popupId={v.display} key={v.display}>
            {(popupState) => (
              <>
                <ListItem
                  button
                  key={v.display}
                  variant="contained"
                  color="primary"
                  {...bindTrigger(popupState)}
                >
                  <ListItemText primary={v.display} />
                </ListItem>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem
                    onClick={() => onClickUserInfo(popupState, v.display)}
                  >
                    사용자 정보
                  </MenuItem>
                  <MenuItem
                    onClick={() => onClickMessage(popupState, v.display)}
                  >
                    쪽지 보내기
                  </MenuItem>
                  <MenuItem
                    onClick={() => onClickAddFriend(popupState, v.display)}
                  >
                    {" "}
                    친구 추가
                  </MenuItem>
                </Menu>
              </>
            )}
          </PopupState>
        ))}
      </List>
    </div>
  );
};

export default UserList;
