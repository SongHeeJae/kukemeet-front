import React, { useEffect } from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import RegisterForm from "../components/RegisterForm";
import { useSelector } from "react-redux";
import Router from "next/router";
import wrapper from "../store/configureStore";
import { stayLoggedIn } from "../auth/auth";

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
          <title>회원가입</title>
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
