import React, { useEffect } from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import RegisterForm from "../components/RegisterForm";
import { useSelector } from "react-redux";
import Router from "next/router";

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

export default Register;
