import React, { useCallback, useEffect, memo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { addFriendRequest, clearAddFriendState } from "../reducers/user";
import moment from "moment";
import ErrorCollapse from "./ErrorCollapse";
import SuccessCollapse from "./SuccessCollapse";

moment.locale("ko");

const UserInfoDialog = (props) => {
  const { open, setOpen } = props;
  const dispatch = useDispatch();
  const {
    loadUser,
    loadUserLoading,
    addFriendError,
    addFriendDone,
    myFriends,
  } = useSelector((state) => state.user);

  const { id, uid, username, nickname, createdAt } = loadUser;

  useEffect(() => {
    return () => {
      if (addFriendError) dispatch(clearAddFriendState());
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
      <SuccessCollapse
        flag={addFriendDone}
        onClick={onClickIconButton}
        msg="친구로 등록되었습니다."
      />
      <ErrorCollapse error={addFriendError} onClick={onClickIconButton} />
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
              defaultValue={moment(createdAt).format("YYYY-MM-DD")}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </DialogContent>
        </>
      )}

      <Button onClick={onClose}>확인</Button>
      {!myFriends.some((f) => f.user.id === id) && (
        <Button onClick={onClickAddFriend}>친구추가</Button>
      )}
    </Dialog>
  );
};

export default memo(
  UserInfoDialog,
  (prevProps, nextProps) => prevProps.open === nextProps.open
);
