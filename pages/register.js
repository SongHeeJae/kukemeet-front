import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
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
