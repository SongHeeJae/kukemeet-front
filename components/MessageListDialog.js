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
import MessageList from "./MessageList";

const MessageListDialog = (props) => {
  const { open, setOpen } = props;
  const [value, setValue] = useState(0);
  const { id, uid, username, nickname, createdAt } = useSelector(
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

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>메세지함</DialogTitle>
      <AppBar position="static">
        <Tabs value={value} onChange={onChange}>
          <Tab label="받은 메세지" />
          <Tab label="보낸 메세지" />
        </Tabs>
      </AppBar>
      <MessageList type="received" value={value} index={0} />
      <MessageList type="sent" value={value} index={1} />
      <Button onClick={onClose}>닫기</Button>
    </Dialog>
  );
};

export default MessageListDialog;
