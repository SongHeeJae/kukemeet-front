import React, { useCallback, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Collapse,
  IconButton,
  Button,
  TextField,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { addFriendRequest, clearAddFriendState } from "../reducers/user";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";

const UserInfoDialog = (props) => {
  const { open, setOpen } = props;
  const dispatch = useDispatch();
  const {
    loadUser,
    loadUserLoading,
    addFriendError,
    addFriendDone,
  } = useSelector((state) => state.user);

  const { id, uid, username, nickname, createdAt } = loadUser;

  useEffect(() => {
    return () => {
      dispatch(clearAddFriendState());
    };
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
    dispatch(clearAddFriendState());
  }, []);

  const onClickAddFriend = useCallback(() => {
    if (!id) return;
    dispatch(addFriendRequest({ id }));
  }, [id]);

  const onClickIconButton = useCallback(() => {
    dispatch(clearAddFriendState());
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <Collapse in={addFriendDone}>
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={onClickIconButton}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          친구로 등록되었습니다.
        </Alert>
      </Collapse>
      <Collapse in={addFriendError.length > 0}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={onClickIconButton}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {addFriendError}
        </Alert>
      </Collapse>
      <DialogTitle>사용자 정보</DialogTitle>
      {loadUserLoading ? (
        <div>로딩중...</div>
      ) : (
        <>
          <DialogContent>
            <TextField
              label="아이디"
              defaultValue={uid}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </DialogContent>
          <DialogContent>
            <TextField
              label="이름"
              defaultValue={username}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </DialogContent>
          <DialogContent>
            <TextField
              label="닉네임"
              defaultValue={nickname}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </DialogContent>
          <DialogContent>
            <TextField
              label="가입일"
              defaultValue={createdAt}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </DialogContent>
        </>
      )}

      <Button onClick={onClose}>확인</Button>
      <Button onClick={onClickAddFriend}>친구추가</Button>
    </Dialog>
  );
};

export default UserInfoDialog;
