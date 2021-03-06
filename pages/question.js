import React from "react";
import AppLayout from "../components/AppLayout";
import wrapper from "../store/configureStore";
import { stayLoggedIn } from "../auth/auth";
import Head from "next/head";

const content =
  "KUKE meet에 관한 문의 및 오류 제보는 카톡 gmlwo308으로 부탁드립니다.\n\
* 현재 테스트 운영 중이므로 회원 정보는 초기화 될 수 있으니 유의바랍니다.\n\
* 제한된 무료 서버 운용 중이라 이용자가 없으면 서버가 닫힐 수 있습니다.";

const Question = () => {
  return (
    <>
      <AppLayout>
        <Head>
          <title>KUKE meet - 문의</title>
          <meta property="og:description" content={content} />
          <meta property="og:title" content="KUKE meet - 문의" />
          <meta name="twitter:title" content="KUKE meet - 문의" />
          <meta name="author" content="쿠케캬캬" />
          <meta name="description" content={content} />
        </Head>
        <h1>문의</h1>

        <p>
          {content.split("\n").map((v, i) => (
            <span key={i}>
              {`${v}`}
              <br />
            </span>
          ))}
        </p>
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    await stayLoggedIn(context);
  }
);

export default Question;
