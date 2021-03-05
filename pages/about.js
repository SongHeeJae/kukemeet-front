import React from "react";
import AppLayout from "../components/AppLayout";
import wrapper from "../store/configureStore";
import { stayLoggedIn } from "../auth/auth";
import Head from "next/head";

const About = () => {
  return (
    <>
      <AppLayout>
        <Head>
          <title>About KUKE meet</title>
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

export default About;
