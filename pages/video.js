import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  connectJanusRequest,
  connectJanusSuccess,
  connectJanusFailure,
  joinRoomSuccess,
  joinRoomFailure,
  publishOwnFeedRequest,
  publishOwnFeedSuccess,
  subscribeRemoteFeedRequest,
  openDataChannelSuccess,
  leavingRemoteFeedRequest,
  leaveRoomRequest,
  inactiveSpeakerDetectionRequest,
  setAudioVideoState,
} from "../reducers/videoroom";
import { useRouter } from "next/router";
import { Janus } from "janus-gateway";
import VideoList from "../components/VideoList";
import UserListDialog from "../components/UserListDialog";
import ChattingDialog from "../components/ChattingDialog";
import MainVideo from "../components/MainVideo";
import VideoOption from "../components/VideoOption";
import { mediaServerUrl } from "../config/config";
import wrapper from "../store/configureStore";
import { stayLoggedIn } from "../auth/auth";
import Router from "next/router";
import CreateRoomForm from "../components/CreateRoomForm";
import JoinRoomForm from "../components/JoinRoomForm";
import ExitRoomButton from "../components/ExitRoomButton";
import FriendDialog from "../components/FriendDialog";
import MessageDialog from "../components/MessageDialog";
import FriendButton from "../components/FriendButton";
import MessageButton from "../components/MessageButton";
import UserListButton from "../components/UserListButton";
import ChattingButton from "../components/ChattingButton";
import styled from "styled-components";
import RoomInfoButton from "../components/RoomInfoButton";

const LeftButtonsWrapper = styled.div`
  float: left;
`;

const RightButtonsWrapper = styled.div`
  float: right;
`;

const VideoOptionWrapper = styled.div`
  margin-bottom: 5px;
`;

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
        console.log("janus destroyed");
      },
    });
  });
};

const attachJanus = (dispatch, janus, useAudio, useVideo) => {
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
      error: (cause) => {
        reject(cause);
      },
      consentDialog: (on) => {
        Janus.debug("Consent dialog should be " + (on ? "on" : "off") + " now");
      },
      iceState: (state) => {
        Janus.log("ICE state changed to " + state);
      },
      mediaState: (medium, on) => {
        Janus.log(
          "Janus " + (on ? "started" : "stopped") + " receiving our " + medium
        );
      },
      webrtcState: (on) => {
        // empty
      },
      onmessage: (msg, jsep) => {
        let event = msg["videoroom"];
        if (event) {
          if (event === "joined") {
            dispatch(
              joinRoomSuccess({
                id: msg["id"],
                privateId: msg["private_id"],
                room: msg["room"],
                title: msg["description"],
              })
            );
            dispatch(publishOwnFeedRequest({ info, dispatch }));

            if (msg["publishers"]) {
              // 기존 접속자
              subscribeRemoteFeed(msg["publishers"], info, dispatch);
            }
          } else if (event === "event") {
            if (msg["publishers"]) {
              // 새로운 접속자
              subscribeRemoteFeed(msg["publishers"], info, dispatch);
            } else if (msg["leaving"]) {
              if (msg["leaving"] === "ok") {
                // 자신의 종료. publish만 중단. 데이터 채널, remotefeed 살아있음
                return;
              }

              dispatch(leavingRemoteFeedRequest({ id: msg["leaving"] }));
            } else if (msg["error"]) {
              if (msg["error_code"] === 433) {
                dispatch(joinRoomFailure("비밀번호가 잘못되었습니다."));
              } else if (msg["error_code"] === 426) {
                dispatch(joinRoomFailure("생성된 방이 없습니다."));
              }
            }
          } else if (event === "destroyed") {
            alert("방이 파괴되었습니다.");
            Router.replace("/");
          }
        }
        if (jsep) {
          info.pluginHandle.handleRemoteJsep({ jsep: jsep });
          if (useAudio === null && useVideo === null) {
            dispatch(
              setAudioVideoState({
                useAudio: !!msg["audio_codec"],
                useVideo: !!msg["video_codec"],
              })
            );
          }
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
      },
      oncleanup: () => {
        console.log("oncleanup");
      },
    });
  });
};

const Video = () => {
  const info = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    connectJanusDone,
    room,
    joinRoomLoading,
    useAudio,
    useVideo,
  } = useSelector((state) => state.videoroom);
  const { id } = useSelector((state) => state.user);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [friendDialogOpen, setFriendDialogOpen] = useState(false);
  const [userListDialogOpen, setUserListDialogOpen] = useState(false);
  const [chattingDialogOpen, setChattingDialogOpen] = useState(false);

  useEffect(() => {
    if (!id) return Router.push("/");

    dispatch(connectJanusRequest());
    initJanus()
      .then(connectJanus)
      .then((janus) => attachJanus(dispatch, janus, useAudio, useVideo))
      .then((result) => {
        info.current = result;
        dispatch(connectJanusSuccess());
      })
      .catch((err) => {
        console.log(err);
        dispatch(connectJanusFailure());
      });

    return () => {
      const { janus } = info.current;
      dispatch(inactiveSpeakerDetectionRequest());
      if (janus && janus.isConnected()) {
        dispatch(leaveRoomRequest({ info: info.current }));
      }
    };
  }, []);

  if (!connectJanusDone) {
    // janus 연결중
    return <div>연결중입니다..</div>;
  }

  if (joinRoomLoading) {
    return <div>입장 대기중..</div>;
  }

  if (!router.query.room) {
    // 쿼리 없이 들어왔으면 방 생성 처리
    if (!room) {
      // 방이 아직 생성 안됨
      return (
        <>
          <CreateRoomForm info={info} />
        </>
      );
    }
  } else {
    // 방을 입력하고 들어왔음
    if (!room) {
      // 아직 입장이 안됨 비밀번호 입력하면 입장 시도
      return (
        <>
          <JoinRoomForm info={info} room={router.query.room} />
        </>
      );
    }
  }

  if (!room) {
    // 방이 없음
    if (!router.query.room) {
      // 쿼리에도 없으면 방 생성 처리
    } else {
      // 쿼리에 있어서 입장요청했는데도 방이 없으면
      return <div>생성된 방이 없습니다.</div>;
    }
  }

  return (
    <>
      <UserListDialog
        open={userListDialogOpen}
        setOpen={setUserListDialogOpen}
      />
      <ChattingDialog
        info={info}
        open={chattingDialogOpen}
        setOpen={setChattingDialogOpen}
      />
      <MessageDialog open={messageDialogOpen} setOpen={setMessageDialogOpen} />
      <FriendDialog open={friendDialogOpen} setOpen={setFriendDialogOpen} />
      <LeftButtonsWrapper>
        <RoomInfoButton />
        <UserListButton setOpen={setUserListDialogOpen} />
        <ChattingButton setOpen={setChattingDialogOpen} />
      </LeftButtonsWrapper>
      <RightButtonsWrapper>
        <MessageButton setOpen={setMessageDialogOpen} />
        <FriendButton setOpen={setFriendDialogOpen} />
        <ExitRoomButton info={info} />
      </RightButtonsWrapper>
      <MainVideo />
      <VideoOptionWrapper>
        <VideoOption info={info} />
      </VideoOptionWrapper>
      <VideoList />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    await stayLoggedIn(context);
  }
);

export default Video;
