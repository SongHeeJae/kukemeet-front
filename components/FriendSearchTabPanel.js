import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const FriendSearchWrapper = styled.div`
  height: 400px;
  width: 100%;
  overflow: auto;
`;

const FriendSearchTabPanel = ({ value, index }) => {
  const wrapperRef = useRef();
  useEffect(() => {
    wrapperRef.current.style.display = value !== index ? "none" : "block";
  }, [value]);

  return <FriendSearchWrapper ref={wrapperRef}>친구 찾기~</FriendSearchWrapper>;
};

export default FriendSearchTabPanel;
