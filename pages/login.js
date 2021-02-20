import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <>
      <AppLayout>
        <Head>
          <title>로그인</title>
        </Head>
        <LoginForm />
      </AppLayout>
    </>
  );
};

export default Login;
