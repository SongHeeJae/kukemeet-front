import React, { useCallback, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  TextField,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { loadUserByNicknameRequest, addFriendRequest } from "../reducers/user";

const UserInfoDialog = (props) => {
  const { open, setOpen } = props;
  const dispatch = useDispatch();
  const { loadUser, loadUserLoading } = useSelector((state) => state.user);

  const { id, uid, username, nickname, createdAt } = loadUser;

  useEffect(() => {
    if (!props.nickname || !open) return;
    dispatch(loadUserByNicknameRequest({ nickname: props.nickname }));
  }, [props.nickname]);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onClickAddFriend = useCallback(() => {
    if (!id) return;
    dispatch(addFriendRequest({ id }));
  }, [id]);

  return (
    <Dialog open={open} onClose={onClose}>
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
