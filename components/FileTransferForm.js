import React, { useCallback, useState } from "react";
import { TextField, IconButton } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SendIcon from "@material-ui/icons/Send";
import { sendFileRequest } from "../reducers/videoroom";
import { useSelector, useDispatch } from "react-redux";

const FileTransferForm = ({ info }) => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);

  const onClickFileTransfer = useCallback(() => {
    if (!selectedFile) return;
    dispatch(sendFileRequest({ info: info.current, file: selectedFile }));
  }, [selectedFile]);

  const onChangeFile = useCallback((e) => {
    setSelectedFile(e.target.files[0]);
  }, []);

  return (
    <div>
      <input
        type="file"
        onChange={onChangeFile}
        hidden
        id="transfer-file-upload"
      />
      <label htmlFor="transfer-file-upload">
        <IconButton component="span">
          <AttachFileIcon />
        </IconButton>
      </label>
      <TextField
        InputProps={{
          readOnly: true,
        }}
        variant="outlined"
        value={selectedFile ? selectedFile.name : "파일을 선택해주세요"}
      />
      <IconButton onClick={onClickFileTransfer}>
        <SendIcon />
      </IconButton>
    </div>
  );
};

export default FileTransferForm;
