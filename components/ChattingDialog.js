import React, { useCallback } from "react";
import styled from "styled-components";
import {
  InputBase,
  Dialog,
  DialogTitle,
  Paper,
  IconButton,
} from "@material-ui/core";
import useInput from "../hooks/useInput";
import { useSelector, useDispatch } from "react-redux";
import { sendChatRequest } from "../reducers/videoroom";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "90%",
    margin: "0 auto",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const ChatDivWrapper = styled.div`
  height: 400px;
  overflow: auto;
  border: solid 1px;
  margin: 10px;
  padding: 5px;
`;

const ChattingDialog = ({ info, open, setOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [text, onChangeText, setText] = useInput("");
  const { openDataChannelDone, chatData } = useSelector(
    (state) => state.videoroom
  );
  const { username, nickname } = useSelector((state) => state.user);
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (text.length === 0) return;
      dispatch(
        sendChatRequest({
          dispatch,
          info: info.current,
          display: `${nickname}(${username})`,
          text,
        })
      );
      setText("");
    },
    [text]
  );

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>채팅창</DialogTitle>
      <ChatDivWrapper>
        {chatData.map((v, i) => (
          <div key={i}>
            {v.display} : {v.text}
          </div>
        ))}
      </ChatDivWrapper>

      <Paper component="form" className={classes.root} onSubmit={onSubmit}>
        <InputBase
          className={classes.input}
          placeholder="텍스트를 입력해주세요"
          value={text}
          onChange={onChangeText}
          disabled={!openDataChannelDone}
        />
        <IconButton className={classes.iconButton} type="submit">
          <SendIcon />
        </IconButton>
      </Paper>
    </Dialog>
  );
};

export default ChattingDialog;
