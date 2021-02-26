import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch, TextField } from "react-redux";
import {
  MenuItem,
  IconButton,
  InputBase,
  Paper,
  Menu,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import useInput from "../hooks/useInput";
import { loadUsersFailure } from "../reducers/user";

const FriendSearchWrapper = styled.div`
  height: 400px;
  width: 100%;
  overflow: auto;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const conditions = [
  { type: "username", value: "이름" },
  { type: "nickname", value: "닉네임" },
  { type: "uid", value: "이메일" },
];
const FriendSearchTabPanel = ({ value, index }) => {
  const dispatch = useDispatch();
  const wrapperRef = useRef();
  const [searchText, onChangeSearchText, setSearchText] = useInput("");
  const classes = useStyles();
  const [condition, setCondition] = useState(conditions[0]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    wrapperRef.current.style.display = value !== index ? "none" : "block";
  }, [value]);

  const onClickMenuIcon = useCallback((e) => {
    setAnchorEl(e.currentTarget);
  }, []);

  const onCloseConditionMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const onCloseConditionMenuItem = useCallback((c) => {
    onCloseConditionMenu();
    setCondition({ ...c });
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (searchText.length === 0) {
        dispatch(loadUsersFailure({ msg: "검색어를 입력해주세요." }));
        return;
      }
    },
    [searchText]
  );

  return (
    <FriendSearchWrapper ref={wrapperRef}>
      <Paper component="form" className={classes.root} onSubmit={onSubmit}>
        <IconButton className={classes.iconButton} onClick={onClickMenuIcon}>
          <MenuIcon />
        </IconButton>
        <Menu
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={onCloseConditionMenu}
        >
          {conditions.map((c) => (
            <MenuItem key={c.type} onClick={() => onCloseConditionMenuItem(c)}>
              {c.value}
            </MenuItem>
          ))}
        </Menu>
        <InputBase
          className={classes.input}
          placeholder={`${condition.value}을 입력해주세요`}
          value={searchText}
          onChange={onChangeSearchText}
        />
        <IconButton className={classes.iconButton} type="submit">
          <SearchIcon />
        </IconButton>
      </Paper>
    </FriendSearchWrapper>
  );
};

export default FriendSearchTabPanel;
