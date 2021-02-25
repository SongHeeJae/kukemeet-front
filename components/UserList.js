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
import UserInfoDialog from "./UserInfoDialog";
import SendMessageDialog from "./SendMessageDialog";
import { loadUserByNicknameRequest } from "../reducers/user";

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
  const classes = useStyles();
  const dispatch = useDispatch();
  const { username, nickname } = useSelector((state) => state.user);
  const { remoteFeeds } = useSelector((state) => state.videoroom);

  const [userInfoDialogOpen, setUserInfoDialogOpen] = useState(false);
  const [sendMessageDialogOpen, setSendMessageDialogOpen] = useState(false);

  const onClickUserInfo = useCallback((popupState, display) => {
    popupState.close();
    dispatch(loadUserByNicknameRequest({ nickname: display }));
    setUserInfoDialogOpen(true);
  }, []);

  const onClickMessage = useCallback((popupState, display) => {
    popupState.close();
    dispatch(loadUserByNicknameRequest({ nickname: display }));
    setSendMessageDialogOpen(true);
  }, []);

  return (
    <div className={classes.root}>
      <UserInfoDialog
        open={userInfoDialogOpen}
        setOpen={setUserInfoDialogOpen}
      />
      <SendMessageDialog
        open={sendMessageDialogOpen}
        setOpen={setSendMessageDialogOpen}
      />
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
