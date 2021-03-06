import React, { useEffect } from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import LoginForm from "../components/LoginForm";
import { useSelector } from "react-redux";
import Router from "next/router";
import wrapper from "../store/configureStore";
import { stayLoggedIn } from "../auth/auth";

const Login = () => {
  const { id } = useSelector((state) => state.user);

  useEffect(() => {
    if (!id) return;
    Router.push("/");
  }, [id]);

  return (
    <>
      <AppLayout>
        <Head>
          <title>KUKE meet - 로그인</title>
          <meta
            property="og:description"
            content="KUKE meet 로그인을 해주세요."
          />
          <meta property="og:title" content="KUKE meet - 로그인" />
          <meta name="twitter:title" content="KUKE meet - 로그인" />
        </Head>
        <LoginForm />
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    await stayLoggedIn(context);
  }
);

export default Login;
