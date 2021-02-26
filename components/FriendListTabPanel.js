import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const FriendListWrapper = styled.div`
  height: 400px;
  width: 100%;
  overflow: auto;
`;

const FriendListTabPanel = ({ value, index }) => {
  const wrapperRef = useRef();

  useEffect(() => {
    wrapperRef.current.style.display = value !== index ? "none" : "block";
  }, [value]);

  return <FriendListWrapper ref={wrapperRef}>친구목록</FriendListWrapper>;
};

export default FriendListTabPanel;
