import React, { useState, useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { loadUsersFailure, loadUsersRequest } from "../reducers/user";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "90%",
    margin: "0 auto",
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
const FriendSearchBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [searchText, onChangeSearchText] = useInput("");
  const { loadUsersLoading } = useSelector((state) => state.user);

  const [condition, setCondition] = useState(conditions[0]);
  const [anchorEl, setAnchorEl] = useState(null);

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
      if (loadUsersLoading) return;
      if (searchText.length === 0)
        return dispatch(loadUsersFailure({ msg: "검색어를 입력해주세요." }));
      dispatch(loadUsersRequest({ [condition.type]: searchText }));
    },
    [searchText, condition]
  );

  return (
    <>
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
    </>
  );
};

export default memo(FriendSearchBar);
