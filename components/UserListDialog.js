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
  Dialog,
  DialogTitle,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StarIcon from "@material-ui/icons/star";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import UserInfoDialog from "./UserInfoDialog";
import SendMessageDialog from "./SendMessageDialog";
import { loadUserByNicknameRequest } from "../reducers/user";
import styled from "styled-components";

const UserListWrapper = styled.div`
  height: 400px;
  overflow: auto;
`;

const UserListDialog = (props) => {
  const { open, setOpen } = props;
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

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <UserInfoDialog
        open={userInfoDialogOpen}
        setOpen={setUserInfoDialogOpen}
      />
      <SendMessageDialog
        open={sendMessageDialogOpen}
        setOpen={setSendMessageDialogOpen}
      />
      <DialogTitle>접속자 목록 - {remoteFeeds.length + 1}명</DialogTitle>
      <UserListWrapper>
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
      </UserListWrapper>
    </Dialog>
  );
};

export default UserListDialog;
