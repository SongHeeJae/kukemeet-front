import React from "react";
import Head from "next/head";
import withReduxSaga from "next-redux-saga";
import wrapper from "../store/configureStore";
// import KakaoMainAdFit from "../components/KakaoMainAdFit";
const VideoMeeting = ({ Component }) => {
  return (
    <>
      <Head>
        <title>KUKE meet</title>
      </Head>
      <Component />
      {/* <KakaoMainAdFit /> */}
    </>
  );
};

export default wrapper.withRedux(withReduxSaga(VideoMeeting));
