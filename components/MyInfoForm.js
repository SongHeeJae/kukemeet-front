import React, { memo } from "react";
import MyInfoMainForm from "../components/MyInfoMainForm";
import MyInfoPasswordForm from "../components/MyInfoPasswordForm";

const MyInfoForm = () => {
  return (
    <>
      <MyInfoMainForm />
      <MyInfoPasswordForm />
    </>
  );
};

export default memo(MyInfoForm);
