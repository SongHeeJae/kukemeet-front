import React from "react";
import AppLayout from "../components/AppLayout";
import { END } from "redux-saga";
import axios from "axios";
import wrapper from "../store/configureStore";
import cookie from "cookie";
import { loadMeRequest, setToken } from "../reducers/user";

const Index = () => {
  return (
    <>
      <AppLayout>
        <div>시작 페이지입니다.</div>;
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const parsedCookies = context.req
      ? cookie.parse(context.req.headers.cookie || "")
      : "";
    if (parsedCookies && parsedCookies["kuke-access-token"]) {
      context.store.dispatch(
        loadMeRequest({
          accessToken: parsedCookies["kuke-access-token"],
        })
      );
    }

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
    const { id } = context.store.getState().user;
    if (id) {
      context.store.dispatch(
        setToken({
          accessToken: parsedCookies["kuke-access-token"],
          refreshToken: parsedCookies["kuke-refresh-token"],
        })
      );
    }
  }
);

export default Index;
