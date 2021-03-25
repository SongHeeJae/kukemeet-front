import React, { useEffect, useCallback, useState, memo } from "react";
import {
  Dialog,
  DialogTitle,
  Button,
  Tabs,
  Tab,
  AppBar,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import MessageListTabPanel from "./MessageListTabPanel";
import SendMessageTabPanel from "./SendMessageTabPanel";
import {
  clearDeleteReceivedMessageState,
  clearDeleteSentMessageState,
  clearSendMessageState,
} from "../reducers/user";
import ErrorCollapse from "./ErrorCollapse";
import SuccessCollapse from "./SuccessCollapse";

const MessageDialog = (props) => {
  const { open, setOpen } = props;
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const {
    deleteReceivedMessageError,
    deleteSentMessageError,
    sendMessageDone,
    sendMessageError,
  } = useSelector((state) => state.user);

  const onChange = useCallback((e, nextValue) => {
    setValue(nextValue);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onClickDeleteReceivedMessageErrorIconButton = useCallback(() => {
    dispatch(clearDeleteReceivedMessageState());
  }, []);

  const onClickDeleteSentMessageErrorIconButton = useCallback(() => {
    dispatch(clearDeleteSentMessageState());
  }, []);

  const onClickSendMessageIconButton = useCallback(() => {
    dispatch(clearSendMessageState());
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <ErrorCollapse
        error={deleteReceivedMessageError}
        onClick={onClickDeleteReceivedMessageErrorIconButton}
      />
      <ErrorCollapse
        error={deleteSentMessageError}
        onClick={onClickDeleteSentMessageErrorIconButton}
      />
      <ErrorCollapse
        error={sendMessageError}
        onClick={onClickSendMessageIconButton}
      />
      <SuccessCollapse
        flag={sendMessageDone}
        onClick={onClickSendMessageIconButton}
        msg="쪽지가 전송되었습니다."
      />
      <DialogTitle>쪽지함</DialogTitle>
      <AppBar position="static">
        <Tabs value={value} onChange={onChange}>
          <Tab label="쪽지 보내기" />
          <Tab label="받은 쪽지" />
          <Tab label="보낸 쪽지" />
        </Tabs>
      </AppBar>
      <SendMessageTabPanel value={value} index={0} />
      <MessageListTabPanel type="received" value={value} index={1} />
      <MessageListTabPanel type="sent" value={value} index={2} />
      <Button onClick={onClose}>닫기</Button>
    </Dialog>
  );
};

export default memo(
  MessageDialog,
  (prevProps, nextProps) => prevProps.open === nextProps.open
);
