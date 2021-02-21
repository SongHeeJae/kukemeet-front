import React, { useEffect, useCallback, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  connectJanusRequest,
  joinRoomRequest,
  connectJanusSuccess,
  connectJanusFailure,
  joinRoomSuccess,
  joinRoomFailure,
  publishOwnFeedRequest,
  publishOwnFeedSuccess,
  subscribeRemoteFeedRequest,
  openDataChannelSuccess,
  leavingRemoteFeedRequest,
} from "../reducers/videoroom";
import { useRouter } from "next/router";
import { Janus } from "janus-gateway";
import VideoList from "../components/VideoList";
import MyVideo from "../components/MyVideo";
import UserList from "../components/UserList";
import Chatting from "../components/Chatting";
import { Grid } from "@material-ui/core";
import MainVideo from "../components/MainVideo";
import VideoOption from "../components/VideoOption";
import { mediaServerUrl } from "../config/config";
import wrapper from "../store/configureStore";
import { stayLoggedIn } from "../auth/auth";
import Router from "next/router";
import CreateRoomForm from "../components/CreateRoomForm";

const subscribeRemoteFeed = (list, info, dispatch) => {
  list.forEach(({ id, display, audio_codec, video_codec }) => {
    dispatch(
      subscribeRemoteFeedRequest({
        info,
        id,
        display,
        audio_codec,
        video_codec,
        dispatch,
      })
    );
  });
};

const initJanus = () => {
  return new Promise((resolve, reject) => {
    Janus.init({
      debug: "all",
      callback: () => {
        resolve();
      },
      error: (error) => {
        reject(error);
      },
      destroyed: () => {
        console.log("destroyed");
      },
    });
  });
};

const connectJanus = () => {
  return new Promise((resolve, reject) => {
    let janus = new Janus({
      server: mediaServerUrl,
      success: () => {
        resolve(janus);
      },
      error: (error) => {
        reject(error);
      },
      destroyed: () => {
        console.log("destroyed");
      },
    });
  });
};

const attachJanus = (dispatch, janus) => {
  return new Promise((resolve, reject) => {
    const opaqueId = "videoroom-" + Janus.randomString(12);
    const info = { opaqueId };
    janus.attach({
      plugin: "janus.plugin.videoroom",
      opaqueId: opaqueId,
      success: (pluginHandle) => {
        info.pluginHandle = pluginHandle;
        info.janus = janus;
        resolve({ janus, pluginHandle, opaqueId });
      },
      error: (cause) => {},
      consentDialog: (on) => {
        Janus.debug("Consent dialog should be " + (on ? "on" : "off") + " now");
      },
      iceState: (state) => {
        Janus.log("ICE state changed to " + state);
      },
      mediaState: (medium, on) => {
        console.log("mediaum스테이트", medium);
        Janus.log(
          "Janus " + (on ? "started" : "stopped") + " receiving our " + medium
        );
      },
      webrtcState: (on) => {
        console.log("webrtcstate ===ㅇㅇ", on);
      },
      onmessage: (msg, jsep) => {
        console.log(msg);
        let event = msg["videoroom"];
        if (event) {
          if (event === "joined") {
            dispatch(
              joinRoomSuccess({
                id: msg["id"],
                privateId: msg["private_id"],
                room: msg["room"],
              })
            );

            dispatch(publishOwnFeedRequest({ info, useAudio: true }));

            if (msg["publishers"]) {
              // 기존 접속자
              subscribeRemoteFeed(msg["publishers"], info, dispatch);
            }
          } else if (event === "event") {
            if (msg["publishers"]) {
              // 새로운 접속자
              subscribeRemoteFeed(msg["publishers"], info, dispatch);
            } else if (msg["leaving"]) {
              dispatch(leavingRemoteFeedRequest({ id: msg["leaving"] }));
            } else if (msg["error"]) {
              if (msg["error_code"] === 426) {
                dispatch(joinRoomFailure());
              }
            }
          } else if (event === "destroyed") {
            alert("룸 제거");
          }
        }
        if (jsep) {
          info.pluginHandle.handleRemoteJsep({ jsep: jsep });
        }
      },
      onlocalstream: (stream) => {
        dispatch(publishOwnFeedSuccess({ stream }));
      },
      onremotestream: (stream) => {},
      ondataopen: (data) => {
        dispatch(openDataChannelSuccess());
      },
      ondata: (data) => {
        // empty
        console.log("내가 데이터 채널로 받은메시지====\n", data);
      },
      oncleanup: () => {
        console.log("클린업ㅇㅇㅇ");
      },
    });
  });
};

const Video = () => {
  const info = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { connectJanusDone, room, joinRoomLoading } = useSelector(
    (state) => state.videoroom
  );
  const { username, nickname, id } = useSelector((state) => state.user);
  useEffect(() => {
    if (!id) return Router.push("/");

    dispatch(connectJanusRequest());
    initJanus()
      .then(connectJanus)
      .then((janus) => attachJanus(dispatch, janus))
      .then((result) => {
        info.current = result;
        dispatch(connectJanusSuccess());
      })
      .catch((err) => {
        console.log(err);
        dispatch(connectJanusFailure());
      });
  }, []);

  useEffect(() => {
    if (!connectJanusDone) return;
    if (!router.query.room && !room) {
      // 쿼리에 room 없고 생성된 방 없으면
      return;
    }
    dispatch(
      joinRoomRequest({
        info: info.current,
        room: parseInt(router.query.room),
        nickname,
        username,
      })
    );
    // 반환 426 코드면 룸 생성하면됨 테스트룸 1234
  }, [connectJanusDone]);

  useEffect(() => {});

  if (!connectJanusDone) {
    return <div>연결중입니다..</div>;
  }

  if (joinRoomLoading) {
    return <div>입장 대기중..</div>;
  }

  if (!room) {
    // 방이 없음
    if (!router.query.room) {
      // 쿼리에도 없으면 방 생성 처리
      return (
        <>
          <CreateRoomForm />
        </>
      );
    } else {
      // 쿼리에 있어서 입장요청했는데도 방이 없으면
      return <div>생성된 방이 없습니다.</div>;
    }
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <UserList />
          <MyVideo />
        </Grid>
        <Grid item xs={6}>
          <MainVideo />
          <VideoOption info={info} />
        </Grid>
        <Grid item xs={3}>
          <Chatting info={info} />
        </Grid>
      </Grid>
      <VideoList />
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    await stayLoggedIn(context);
  }
);

export default Video;
