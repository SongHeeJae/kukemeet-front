import React, { useCallback, forwardRef, memo } from "react";
import styled from "styled-components";
import {
  InputBase,
  Dialog,
  Paper,
  IconButton,
  AppBar,
  Slide,
  Toolbar,
  Typography,
} from "@material-ui/core";
import useInput from "../hooks/useInput";
import { useSelector, useDispatch } from "react-redux";
import { clearNewChatDataState, sendChatRequest } from "../reducers/videoroom";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import ChattingText from "./ChattingText";

const Transition = forwardRef((props, ref) => {
  return <Slide direction="left" ref={ref} {...props} />;
});

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
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const DialogWrapper = styled(Dialog)`
  width: 70%;
  margin-left: 30%;
`;

const ChattingDialog = ({ info, open, setOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [text, onChangeText, setText] = useInput("");
  const { openDataChannelDone } = useSelector((state) => state.videoroom);
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
    dispatch(clearNewChatDataState());
    setOpen(false);
  }, []);

  return (
    <DialogWrapper
      open={open}
      onClose={onClose}
      fullScreen
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            채팅방
          </Typography>
        </Toolbar>
      </AppBar>
      <ChattingText />

      <Paper component="form" className={classes.root} onSubmit={onSubmit}>
        <InputBase
          className={classes.input}
          placeholder="텍스트를 입력해주세요"
          value={text}
          autoFocus
          onChange={onChangeText}
          disabled={!openDataChannelDone}
        />
        <IconButton className={classes.iconButton} type="submit">
          <SendIcon />
        </IconButton>
      </Paper>
    </DialogWrapper>
  );
};

export default memo(
  ChattingDialog,
  (prevProps, nextProps) => prevProps.open === nextProps.open
);
