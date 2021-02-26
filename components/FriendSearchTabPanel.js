import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch, TextField } from "react-redux";
import {
  MenuItem,
  IconButton,
  InputBase,
  Paper,
  Menu,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import useInput from "../hooks/useInput";
import {
  clearLoadUsersState,
  loadUsersFailure,
  loadUsersRequest,
  setLoadUser,
} from "../reducers/user";

const FriendSearchWrapper = styled.div`
  height: 394px;
  width: 100%;
  overflow: auto;
  padding-top: 6px;
`;

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
const FriendSearchTabPanel = ({ value, index, setUserInfoDialogOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const wrapperRef = useRef();
  const [searchText, onChangeSearchText] = useInput("");
  const { loadUsers, loadUsersLoading } = useSelector((state) => state.user);

  const [condition, setCondition] = useState(conditions[0]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    return () => {
      dispatch(clearLoadUsersState());
    };
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

  const onClickUser = useCallback((user) => {
    dispatch(setLoadUser({ info: user }));
    setUserInfoDialogOpen(true);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (loadUsersLoading) return;
      if (searchText.length === 0)
        return dispatch(loadUsersFailure({ msg: "검색어를 입력해주세요." }));
      dispatch(loadUsersRequest({ [condition.type]: searchText }));
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
      <List>
        {loadUsers.map((u) => (
          <ListItem
            button
            key={u.id}
            variant="contained"
            color="primary"
            onClick={() => onClickUser(u)}
          >
            <ListItemText primary={`${u.username}(${u.nickname})`} />
          </ListItem>
        ))}
      </List>
    </FriendSearchWrapper>
  );
};

export default FriendSearchTabPanel;
