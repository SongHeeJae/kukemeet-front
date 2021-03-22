import React, { useCallback, useState, memo } from "react";
import { IconButton, Popover, Typography, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";
import { useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import styled from "styled-components";

const CopyToClipboardWrapper = styled(CopyToClipboard)`
  display: flex;
`;

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

const RoomInfoButton = () => {
  const { title, room, pin } = useSelector((state) => state.videoroom);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const onClick = useCallback((e) => {
    setAnchorEl(e.currentTarget);
  }, []);

  const onCopy = useCallback(() => {
    setSnackbarOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const onCloseSnackbar = useCallback(() => {
    setSnackbarOpen(false);
  }, []);

  return (
    <>
      <IconButton onClick={onClick}>
        <InfoIcon />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography className={classes.typography}>
          ID : {room}
          <CopyToClipboardWrapper text={room} onCopy={onCopy}>
            <IconButton>
              <FileCopyIcon />
            </IconButton>
          </CopyToClipboardWrapper>
        </Typography>
        <Typography className={classes.typography}>
          PW : {pin}
          <CopyToClipboardWrapper text={pin} onCopy={onCopy}>
            <IconButton>
              <FileCopyIcon />
            </IconButton>
          </CopyToClipboardWrapper>
        </Typography>
        <Typography className={classes.typography}>{title}</Typography>
      </Popover>
      <Snackbar
        open={snackbarOpen}
        onClose={onCloseSnackbar}
        message="복사되었습니다."
      />
    </>
  );
};

export default memo(RoomInfoButton);
