import React, { memo } from "react";
import { useSelector } from "react-redux";
import { List } from "@material-ui/core";
import SendFileListItem from "./SendFileListItem";
const SendFileList = () => {
  const { sendFiles } = useSelector((state) => state.videoroom);
  return (
    <List>
      {sendFiles.map((f) => (
        <SendFileListItem key={f.transaction} file={f} />
      ))}
    </List>
  );
};

export default memo(SendFileList);
