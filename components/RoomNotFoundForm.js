import React, { useCallback, memo } from "react";
import AppLayout from "./AppLayout";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import Router from "next/router";

const RoomNotFoundFormWrapper = styled.div`
  text-align: center;
`;

const RoomNotFoundForm = () => {
  const onClickCancel = useCallback(() => {
    Router.replace("/");
  }, []);

  return (
    <AppLayout>
      <RoomNotFoundFormWrapper>
        <h1>방을 찾을 수 없습니다.</h1>

        <Button onClick={onClickCancel}>돌아가기</Button>
      </RoomNotFoundFormWrapper>
    </AppLayout>
  );
};

export default memo(RoomNotFoundForm);
