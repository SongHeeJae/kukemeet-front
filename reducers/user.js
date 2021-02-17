import produce from "immer";

export const initialState = {
  id: 1,
  uid: "gmlwo308@naver.com",
  username: "송희재",
  nickname: "쿠케캬캬" + Math.floor(Math.random() * 10000),
  createdAt: "",
  modifiedAt: "",
};

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      default:
        break;
    }
  });

export default reducer;
