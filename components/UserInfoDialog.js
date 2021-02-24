import React from "react";
import { Dialog, DialogTitle } from "@material-ui/core";

const UserInfoDialog = ({ open }) => {
  return (
    <Dialog open={open}>
      <DialogTitle>사용자 정보</DialogTitle>
    </Dialog>
  );
};

export default UserInfoDialog;
