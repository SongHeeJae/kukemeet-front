import React from "react";
import AppLayout from "../components/AppLayout";
import wrapper from "../store/configureStore";
import { stayLoggedIn } from "../auth/auth";
import RoomConfig from "../components/RoomConfig";
import Head from "next/head";

const Index = () => {
  return (
    <>
      <AppLayout>
        <Head>
          <title>KUKE meet</title>

          <meta
            property="og:description"
            content="무료 온라인 화상 회의 웹 서비스 KUKE meet 입니다."
          />
          <meta
            property="og:title"
            content="무료 온라인 화상 회의 웹 서비스 KUKE meet"
          />
          <meta
            name="twitter:title"
            content="무료 온라인 화상 회의 웹 서비스 KUKE meet"
          />
          <meta
            name="description"
            content="무료 온라인 화상 회의 웹 서비스 KUKE meet 입니다."
          />
        </Head>

        <RoomConfig />
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
