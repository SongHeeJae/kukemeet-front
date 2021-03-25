import React, { memo } from "react";
import { Typography } from "@material-ui/core";

const ChattingTextItem = ({ time, display, text }) => {
  return (
    <li>
      <Typography>
        [{time}] {display} : {text}
      </Typography>
    </li>
  );
};

export default memo(ChattingTextItem);
