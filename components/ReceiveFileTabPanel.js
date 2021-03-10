import React, { useEffect, useRef, memo } from "react";
import ReceiveFileList from "./ReceiveFileList";
import styled from "styled-components";

const ReceiveFileTabWrapper = styled.div`
  height: 400px;
  width: 100%;
  overflow: auto;
`;

const ReceiveFileTabPanel = ({ index, value }) => {
  const wrapperRef = useRef();
  useEffect(() => {
    wrapperRef.current.style.display = value !== index ? "none" : "block";
  }, [value]);

  return (
    <ReceiveFileTabWrapper ref={wrapperRef}>
      <ReceiveFileList />
    </ReceiveFileTabWrapper>
  );
};

export default memo(ReceiveFileTabPanel);
