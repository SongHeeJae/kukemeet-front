import React from "react";
import Head from "next/head";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import AppLayout from "../components/AppLayout";
const content =
  "온라인 화상 회의 웹 서비스 KUKE meet 입니다.\n\
비밀번호를 분실하셨나요?\n\
가입하신 이메일 주소로 비밀번호를 찾을 수 있습니다.";

const ForgotPassword = () => {
  return (
    <AppLayout>
      <Head>
        <title>KUKE meet - 비밀번호 분실</title>
        <meta property="og:description" content={content} />
        <meta property="og:title" content="KUKE meet - 비밀번호 분실" />
        <meta name="twitter:title" content="KUKE meet - 비밀번호 분실" />
        <meta name="description" content={content} />
      </Head>
      <ForgotPasswordForm />
    </AppLayout>
  );
};

export default ForgotPassword;
