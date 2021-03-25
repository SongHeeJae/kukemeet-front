import React, { useCallback, useState, memo } from "react";
import { Dialog, DialogTitle, AppBar, Tabs, Tab } from "@material-ui/core";
import ReceiveFileTabPanel from "./ReceiveFileTabPanel";
import SendFileTabPanel from "./SendFileTabPanel";
const FileDialog = ({ info, setOpen, open }) => {
  const [value, setValue] = useState(0);

  const onChange = useCallback((e, nextValue) => {
    setValue(nextValue);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>파일함</DialogTitle>
      <AppBar position="static">
        <Tabs value={value} onChange={onChange}>
          <Tab label="송신함" />
          <Tab label="수신함" />
        </Tabs>
      </AppBar>
      <SendFileTabPanel value={value} index={0} info={info} />
      <ReceiveFileTabPanel value={value} index={1} />
    </Dialog>
  );
};

export default memo(
  FileDialog,
  (prevProps, nextProps) => prevProps.open === nextProps.open
);
