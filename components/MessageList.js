import React, { useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearReceivedMessagesState,
  clearSentMessagesState,
  loadReceivedMessagesRequest,
  loadSentMessagesRequest,
} from "../reducers/user";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styled from "styled-components";

const MessageListWrapper = styled.div`
  max-height: 400px;
  max-width: 350px;
  overflow: auto;
`;

const MessageList = ({ type, value, index }) => {
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

  return (
    <MessageListWrapper ref={wrapperRef}>
      {messages.map((m, i) => (
        <Accordion key={i}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              {m.msg} {i}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {m.msg} {i}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </MessageListWrapper>
  );
};

export default MessageList;
