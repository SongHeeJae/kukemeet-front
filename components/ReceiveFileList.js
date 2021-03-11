import React, { memo } from "react";
import { useSelector } from "react-redux";
import { List } from "@material-ui/core";
import ReceiveFileListItem from "./ReceiveFileListItem";

const ReceiveFileList = () => {
  const { receiveFiles } = useSelector((state) => state.videoroom);
  return (
    <List>
      {receiveFiles.map((f) => (
        <ReceiveFileListItem key={f.dataUrl} file={f} />
      ))}
    </List>
  );
};

export default memo(ReceiveFileList);
