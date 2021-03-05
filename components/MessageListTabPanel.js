import React, { useEffect, useRef, useCallback, memo } from "react";
import styled from "styled-components";
import {
  clearReceivedMessagesState,
  clearSentMessagesState,
  loadReceivedMessagesRequest,
  loadSentMessagesRequest,
  clearDeleteReceivedMessageState,
  clearDeleteSentMessageState,
} from "../reducers/user";
import { useSelector, useDispatch } from "react-redux";
import MessageList from "./MessageList";

const MessageListWrapper = styled.div`
  height: 400px;
  width: 100%;
  overflow: auto;
`;

const MessageListTabPanel = ({ type, value, index }) => {
  const dispatch = useDispatch();
  const wrapperRef = useRef();

  const { hasNext, loadMessagesLoading } = useSelector((state) => {
    return type === "received"
      ? {
          hasNext: state.user.loadReceivedMessagesHasNext,
          loadMessagesLoading: state.user.loadReceivedMessagesLoading,
        }
      : {
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

  return (
    <MessageListWrapper ref={wrapperRef}>
      <MessageList type={type} />
    </MessageListWrapper>
  );
};

export default memo(MessageListTabPanel);
