import React, { memo } from "react";
import MessageListItem from "./MessageListItem";
import { useSelector } from "react-redux";

const MessageList = ({ type }) => {
  const messages = useSelector((state) =>
    type === "received" ? state.user.receivedMessages : state.user.sentMessages
  );

  return (
    <>
      {messages.map((m) => (
        <MessageListItem key={m.id} item={m} type={type} />
      ))}
    </>
  );
};

export default memo(MessageList);
