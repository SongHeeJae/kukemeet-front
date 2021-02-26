import React, { useEffect, useCallback, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Collapse,
  IconButton,
  Button,
  TextField,
  Tabs,
  Tab,
  AppBar,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import MessageListTabPanel from "./MessageListTabPanel";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import {
  clearDeleteReceivedMessageState,
  clearDeleteSentMessageState,
} from "../reducers/user";

const MessageDialog = (props) => {
  const { open, setOpen } = props;
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const { deleteReceivedMessageError, deleteSentMessageError } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    return () => {
      // clear
    };
  }, []);

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

  return (
    <Dialog open={open} onClose={onClose}>
      <Collapse in={deleteReceivedMessageError.length > 0}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={onClickDeleteReceivedMessageErrorIconButton}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {deleteReceivedMessageError}
        </Alert>
      </Collapse>
      <Collapse in={deleteSentMessageError.length > 0}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={onClickDeleteSentMessageErrorIconButton}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {deleteSentMessageError}
        </Alert>
      </Collapse>
      <DialogTitle>쪽지함</DialogTitle>
      <AppBar position="static">
        <Tabs value={value} onChange={onChange}>
          <Tab label="받은 쪽지" />
          <Tab label="보낸 쪽지" />
        </Tabs>
      </AppBar>
      <MessageListTabPanel type="received" value={value} index={0} />
      <MessageListTabPanel type="sent" value={value} index={1} />
      <Button onClick={onClose}>닫기</Button>
    </Dialog>
  );
};

export default MessageDialog;
