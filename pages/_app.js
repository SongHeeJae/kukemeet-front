import React from "react";
import Head from "next/head";
import withReduxSaga from "next-redux-saga";
import wrapper from "../store/configureStore";

const VideoMeeting = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>KUKE meet</title>
      </Head>
      <Component />
    </>
  );
};

export default wrapper.withRedux(withReduxSaga(VideoMeeting));
