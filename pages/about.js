import React from "react";
import AppLayout from "../components/AppLayout";
import wrapper from "../store/configureStore";
import { stayLoggedIn } from "../auth/auth";
import Head from "next/head";
import { Button } from "@material-ui/core";

const content =
  "온라인 화상 회의 웹 서비스 KUKE meet 입니다.\n\
브라우저 상에서 손쉽게 화상 회의 서비스를 이용할 수 있습니다.\n\
마이크 ON / OFF, 비디오 ON / OFF, 음성 사용자 추적 ON / OFF, 화면공유 ON / OFF를 지원합니다.\n\
회의룸 내의 가벼운 채팅 및 쪽지 기능으로 원활한 소통을 도와줍니다.\n\
구체적인 사용법은 아래의 버튼을 눌러주세요.";
const url = "https://blog.naver.com/gmlwo308/222265465861";

const About = () => {
  return (
    <>
      <AppLayout>
        <Head>
          <title>KUKE meet - 소개</title>
          <meta property="og:description" content={content} />
          <meta property="og:title" content="KUKE meet - 소개" />
          <meta name="twitter:title" content="KUKE meet - 소개" />
          <meta name="author" content="쿠케캬캬" />
          <meta name="description" content={content} />
        </Head>
        <h1>KUKE meet</h1>

        <p>
          {content.split("\n").map((v, i) => (
            <span key={i}>
              {`${v}`}
              <br />
            </span>
          ))}
        </p>
        <a target="_blank" href={url} rel="noopener noreferrer">
          <Button>사용법</Button>
        </a>
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    await stayLoggedIn(context);
  }
);

export default About;
