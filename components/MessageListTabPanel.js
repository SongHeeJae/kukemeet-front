import React, { useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearReceivedMessagesState,
  clearSentMessagesState,
  loadReceivedMessagesRequest,
  loadSentMessagesRequest,
  deleteReceivedMessageRequest,
  deleteSentMessageRequest,
  clearDeleteReceivedMessageState,
  clearDeleteSentMessageState,
} from "../reducers/user";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Divider,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styled from "styled-components";
import moment from "moment";

moment.locale("ko");

const MessageListWrapper = styled.div`
  height: 400px;
  width: 100%;
  overflow: auto;
`;

const MessageListTabPanel = ({ type, value, index }) => {
  const dispatch = useDispatch();
  const wrapperRef = useRef();
  const { messages, hasNext, loadMessagesLoading } = useSelector((state) => {
    return type === "received"
      ? {
          messages: state.user.receivedMessages,
          hasNext: state.user.loadReceivedMessagesHasNext,
          loadMessagesLoading: state.user.loadReceivedMessagesLoading,
        }
      : {
          messages: state.user.sentMessages,
          hasNext: state.user.loadSentMessagesHasNext,
          loadMessagesLoading: state.user.loadSentMessagesLoading,
        };
  });

  useEffect(() => {
    loadMessages();
    return () => {
      dispatch(
        type === "received"
          ? clearReceivedMessagesState()
          : clearSentMessagesState()
      );
      dispatch(
        type === "received"
          ? clearDeleteReceivedMessageState()
          : clearDeleteSentMessageState()
      );
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (
        wrapperRef.current.clientHeight + wrapperRef.current.scrollTop >
        wrapperRef.current.scrollHeight - 300
      ) {
        if (hasNext && !loadMessagesLoading) {
          loadMessages();
        }
      }
    };
    wrapperRef.current.addEventListener("scroll", onScroll);
    return () => {
      if (!wrapperRef.current) return;
      wrapperRef.current.removeEventListener("scroll", onScroll);
    };
  }, [hasNext, loadMessagesLoading]);

  useEffect(() => {
    wrapperRef.current.style.display = value !== index ? "none" : "block";
  }, [value]);

  const loadMessages = useCallback(
    () =>
      dispatch(
        type === "received"
          ? loadReceivedMessagesRequest()
          : loadSentMessagesRequest()
      ),
    []
  );

  const onClickDeleteMessage = useCallback((id) => {
    dispatch(
      type === "received"
        ? deleteReceivedMessageRequest({ id })
        : deleteSentMessageRequest({ id })
    );
  }, []);

  return (
    <MessageListWrapper ref={wrapperRef}>
      {messages.map((m) => (
        <Accordion key={m.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              {m.user.nickname}({m.user.username}) -
              {moment(m.createdAt).fromNow()}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{m.msg}</Typography>
          </AccordionDetails>
          <Typography align="center">
            {moment(m.createdAt).format("YYYY-MM-DD hh:mm:ss")}
          </Typography>
          <Divider />
          <Button color="secondary" onClick={() => onClickDeleteMessage(m.id)}>
            삭제
          </Button>
        </Accordion>
      ))}
    </MessageListWrapper>
  );
};

export default MessageListTabPanel;
