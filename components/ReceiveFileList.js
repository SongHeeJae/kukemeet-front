import React from "react";
import { useSelector } from "react-redux";

const ReceiveFileList = () => {
  const { receiveFiles } = useSelector((state) => state.videoroom);
  return (
    <div>
      {receiveFiles.map((f, i) => (
        <a href={f.data} key={i} download={f.filename}>
          {f.filename}
        </a>
      ))}
    </div>
  );
};

export default ReceiveFileList;
