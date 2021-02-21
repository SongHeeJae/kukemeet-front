import { END } from "redux-saga";
import cookie from "cookie";
import { loadMeRequest, setToken, refreshTokenRequest } from "../reducers/user";

export const stayLoggedIn = async (context) => {
  const parsedCookies = context.req
    ? cookie.parse(context.req.headers.cookie || "")
    : "";
  if (parsedCookies) {
    if (parsedCookies["kuke-access-token"]) {
      // 액세스 토큰이 있으면
      context.store.dispatch(
        loadMeRequest({
          accessToken: parsedCookies["kuke-access-token"],
        })
      );
    } else if (parsedCookies["kuke-refresh-token"]) {
      // refresh 토큰만 있으면 task로 넘겨줌
      context.store.dispatch(
        refreshTokenRequest({
          refreshToken: parsedCookies["kuke-refresh-token"],
          task: loadMeRequest({
            accessToken: parsedCookies["kuke-access-token"],
          }),
        })
      );
    }
  }
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
  const {
    id,
    accessToken,
    refreshToken,
    setCookie,
  } = context.store.getState().user;
  if (id) {
    if (accessToken && refreshToken) {
      // refresh한 경우 쿠키 다시 세팅
      context.res.setHeader("Set-Cookie", setCookie);
    } else {
      // access token으로 요청한 경우 리덕스에만 담아줌
      context.store.dispatch(
        setToken({
          accessToken: parsedCookies["kuke-access-token"],
          refreshToken: parsedCookies["kuke-refresh-token"],
        })
      );
    }

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
};
