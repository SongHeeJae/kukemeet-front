import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import { useSelector } from "react-redux";
import Router from "next/router";
import wrapper from "../store/configureStore";
import { stayLoggedIn } from "../auth/auth";
import MyInfoForm from "../components/MyInfoForm";
import Head from "next/head";

const Profile = () => {
  const { id } = useSelector((state) => state.user);

  useEffect(() => {
    if (id) return;
    Router.push("/");
  }, [id]);

  return (
    <AppLayout>
      <Head>
        <title>내 정보</title>
      </Head>
      <MyInfoForm />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    await stayLoggedIn(context);
  }
);

export default Profile;
