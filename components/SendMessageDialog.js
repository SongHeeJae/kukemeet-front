import React, { useCallback, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { sendMessageRequest, clearSendMessageState } from "../reducers/user";
import useInput from "../hooks/useInput";
import ErrorCollapse from "./ErrorCollapse";
import SuccessCollapse from "./SuccessCollapse";

const SendMessageDialog = (props) => {
  const { open, setOpen } = props;
  const dispatch = useDispatch();
  const {
    loadUser,
    loadUserLoading,
    sendMessageError,
    sendMessageDone,
  } = useSelector((state) => state.user);

  const { id, uid, username, nickname, createdAt } = loadUser;
  const [message, onChangeMessage, setMessage] = useInput("");

  useEffect(() => {
    return () => {
      dispatch(clearSendMessageState());
    };
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
    setMessage("");
    dispatch(clearSendMessageState());
  }, []);

  const onClickSendMessage = useCallback(() => {
    if (!id) return;
    dispatch(sendMessageRequest({ id, message }));
    setMessage("");
  }, [id, message]);

  const onClickIconButton = useCallback(() => {
    dispatch(clearSendMessageState());
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <SuccessCollapse
        flag={sendMessageDone}
        msg="쪽지가 전송되었습니다."
        onClick={onClickIconButton}
      />
      <ErrorCollapse error={sendMessageError} onClick={onClickIconButton} />
      <DialogTitle>쪽지 보내기</DialogTitle>
      {loadUserLoading ? (
        <div>로딩중...</div>
      ) : (
        <>
          <DialogContent>
            <TextField
              label="받는 사람"
              defaultValue={`${nickname}(${username})`}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </DialogContent>

          <DialogContent>
            <TextField
              label="내용을 작성해주세요"
              multiline
              rows={5}
              value={message}
              onChange={onChangeMessage}
              variant="outlined"
            />
          </DialogContent>
        </>
      )}

      <Button onClick={onClickSendMessage}>전송</Button>
      <Button onClick={onClose}>취소</Button>
    </Dialog>
  );
};

export default SendMessageDialog;
