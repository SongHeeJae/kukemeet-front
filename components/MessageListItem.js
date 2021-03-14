import React, { useCallback, memo } from "react";
import {
  deleteReceivedMessageRequest,
  deleteSentMessageRequest,
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
import { useDispatch } from "react-redux";
import moment from "moment";

moment.locale("ko");

const MessageListItem = ({ type, item }) => {
  const dispatch = useDispatch();

  const onClickDeleteMessage = useCallback((id) => {
    dispatch(
      type === "received"
        ? deleteReceivedMessageRequest({ id })
        : deleteSentMessageRequest({ id })
    );
  }, []);

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
            {item.user.nickname}({item.user.username}) -
            {moment(item.createdAt).fromNow()}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{item.msg}</Typography>
        </AccordionDetails>
        <Typography align="center">
          {moment(item.createdAt).format("YYYY-MM-DD hh:mm:ss")}
        </Typography>
        <Divider />
        <Button
          color="secondary"
          onClick={() => onClickDeleteMessage(item.id)}
          fullWidth
        >
          삭제
        </Button>
      </Accordion>
    </>
  );
};

export default memo(MessageListItem);
