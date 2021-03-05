import React from "react";
import AppLayout from "../components/AppLayout";
import wrapper from "../store/configureStore";
import { stayLoggedIn } from "../auth/auth";
import Head from "next/head";

const Question = () => {
  return (
    <>
      <AppLayout>
        <Head>
          <title>문의</title>
        </Head>
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    await stayLoggedIn(context);
  }
);

export default Question;
