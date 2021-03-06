import React, { useEffect } from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import RegisterForm from "../components/RegisterForm";
import { useSelector } from "react-redux";
import Router from "next/router";
import wrapper from "../store/configureStore";
import { stayLoggedIn } from "../auth/auth";

const content = "KUKE meet 회원가입을 해주세요.";

const Register = () => {
  const { id } = useSelector((state) => state.user);

  useEffect(() => {
    if (!id) return;
    Router.push("/");
  }, [id]);
  return (
    <>
      <AppLayout>
        <Head>
          <title>KUKE meet - 회원가입</title>
          <meta property="og:description" content={content} />
          <meta name="description" content={content} />
          <meta property="og:title" content="KUKE meet - 회원가입" />
          <meta name="twitter:title" content="KUKE meet - 회원가입" />
        </Head>

        <RegisterForm />
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    await stayLoggedIn(context);
  }
);

export default Register;
