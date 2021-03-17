import React, { useEffect } from "react";
import axios from "axios";
import RegisterByProviderForm from "../components/RegisterByProviderForm";
import AppLayout from "../components/AppLayout";
import Head from "next/head";

const RegisterProvider = () => {
  return (
    <AppLayout>
      <Head>
        <title>KUKE meet - 소셜 로그인</title>
        <meta property="og:description" content={"회원 정보를 입력해주세요."} />
      </Head>
      <RegisterByProviderForm />
    </AppLayout>
  );
};

export default RegisterProvider;
