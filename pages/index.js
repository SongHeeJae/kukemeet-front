import React from "react";
import AppLayout from "../components/AppLayout";
import wrapper from "../store/configureStore";
import { stayLoggedIn } from "../auth/auth";
import { Button, TextField } from "@material-ui/core";

const Index = () => {
  return (
    <>
      <AppLayout>
        <div>
          <Button>방 생성</Button>
        </div>
        <div>
          <TextField />
          <Button>방 입장</Button>
        </div>
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    await stayLoggedIn(context);
  }
);

export default Index;
