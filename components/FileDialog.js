import React, { useCallback, useRef } from "react";
import { Dialog, DialogTitle } from "@material-ui/core";
import FileTransferForm from "./FileTransferForm";
import ReceiveFileList from "./ReceiveFileList";
const FileDialog = ({ info, setOpen, open }) => {
  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>파일함</DialogTitle>
      파일 다이얼로그
      <FileTransferForm info={info} />
      <ReceiveFileList />
    </Dialog>
  );
};

export default FileDialog;
