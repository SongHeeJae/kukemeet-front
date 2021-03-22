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
  getRoomServerRequest,
  joinRoomRequest,
} from "../reducers/videoroom";
import { useRouter } from "next/router";
import { Janus } from "janus-gateway";
import VideoList from "../components/VideoList";
import UserListDialog from "../components/UserListDialog";
import ChattingDialog from "../components/ChattingDialog";
import MainVideo from "../components/MainVideo";
import VideoOption from "../components/VideoOption";
import wrapper from "../store/configureStore";
import { stayLoggedIn } from "../auth/auth";
import Router from "next/router";
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
import FileDialog from "../components/FileDialog";
import FileDialogOpenButton from "../components/FileDialogOpenButton";
import { CircularProgress } from "@material-ui/core";
import CreateRoomForm from "../components/CreateRoomForm";
import RoomNotFoundForm from "../components/RoomNotFoundForm";

const CircularProgressWrapper = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

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

const connectJanus = (server) => {
  return new Promise((resolve, reject) => {
    let janus = new Janus({
      server: `${server}/janus`,
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

const attachJanus = (dispatch, janus) => {
  return new Promise((resolve, reject) => {
    const opaqueId = "videoroom-" + Janus.randomString(12);
    const info = { opaqueId };
    let connected = false;
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
          if (!connected) {
            connected = true;
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
    server,
    pin,
    getRoomServerError,
  } = useSelector((state) => state.videoroom);
  const { id, nickname } = useSelector((state) => state.user);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [friendDialogOpen, setFriendDialogOpen] = useState(false);
  const [userListDialogOpen, setUserListDialogOpen] = useState(false);
  const [chattingDialogOpen, setChattingDialogOpen] = useState(false);
  const [fileDialogOpen, setFileDialogOpen] = useState(false);

  useEffect(() => {
    if (!router.query.room) return; // 방 생성하는 경우 스킵
    dispatch(getRoomServerRequest({ room: router.query.room }));
  }, []);

  useEffect(() => {
    if (!id) return Router.push("/");
    if (!server) return;

    dispatch(connectJanusRequest());
    initJanus()
      .then(() => connectJanus(server))
      .then((janus) => attachJanus(dispatch, janus))
      .then((result) => {
        info.current = result;
        dispatch(connectJanusSuccess());
        if (!room) return; // 방 생성한 경우 즉시 연결 시도
        dispatch(
          joinRoomRequest({
            info: info.current,
            room,
            nickname,
            pin,
          })
        );
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
  }, [server]);

  if (getRoomServerError) {
    return <RoomNotFoundForm />;
  }

  if (!router.query.room) {
    if (!server) {
      // 방 생성으로 넘어와서 아직 방 생성 안한 경우
      return <CreateRoomForm />;
    }
  }

  if (!connectJanusDone || joinRoomLoading) {
    // janus 연결중, 입장 대기중
    return (
      <CircularProgressWrapper>
        <CircularProgress size="10rem" />;
      </CircularProgressWrapper>
    );
  }

  if (!room) {
    // 아직 입장이 안됨 비밀번호 입력하면 입장 시도
    return <JoinRoomForm info={info} room={router.query.room} />;
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
      <FileDialog
        info={info}
        open={fileDialogOpen}
        setOpen={setFileDialogOpen}
      />
      <MessageDialog open={messageDialogOpen} setOpen={setMessageDialogOpen} />
      <FriendDialog open={friendDialogOpen} setOpen={setFriendDialogOpen} />
      <LeftButtonsWrapper>
        <RoomInfoButton />
        <UserListButton setOpen={setUserListDialogOpen} />
        <ChattingButton
          setOpen={setChattingDialogOpen}
          open={chattingDialogOpen}
        />
        <FileDialogOpenButton setOpen={setFileDialogOpen} />
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
