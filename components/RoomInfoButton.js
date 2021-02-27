import React, { useCallback, useState } from "react";
import { IconButton, Popover, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

const RoomInfoButton = () => {
  const { title, room } = useSelector((state) => state.videoroom);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const onClick = useCallback((e) => {
    setAnchorEl(e.currentTarget);
  }, []);

  const onClose = useCallback(() => {
    setAnchorEl(null);
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
        <Typography className={classes.typography}>번호 - {room}</Typography>
        <Typography className={classes.typography}>{title}</Typography>
      </Popover>
    </>
  );
};

export default RoomInfoButton;
