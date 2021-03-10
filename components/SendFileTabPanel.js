import React, { useEffect, useRef, memo } from "react";
import FileTransferForm from "./FileTransferForm";
import styled from "styled-components";
import SendFileList from "./SendFileList";

const SendFileTabWrapper = styled.div`
  height: 400px;
  width: 100%;
  overflow: auto;
`;

const SendFileTabPanel = ({ info, index, value }) => {
  const wrapperRef = useRef();

  useEffect(() => {
    wrapperRef.current.style.display = value !== index ? "none" : "block";
  }, [value]);

  return (
    <SendFileTabWrapper ref={wrapperRef}>
      <FileTransferForm info={info} />
      <SendFileList />
    </SendFileTabWrapper>
  );
};

export default memo(SendFileTabPanel);
