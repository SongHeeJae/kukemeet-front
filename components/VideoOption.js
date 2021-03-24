import React, { useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup } from "@material-ui/core";
import {
  activeAudioRequest,
  inactiveAudioRequest,
  activeVideoRequest,
  inactiveVideoRequest,
  activeSpeakerDetectionRequest,
  inactiveSpeakerDetectionRequest,
  activeScreenSharingRequest,
  inactiveScreenSharingRequest,
  inactiveRecordingRequest,
  activeRecordingRequest,
} from "../reducers/videoroom";
import MicIcon from "@material-ui/icons/Mic";
import MicNoneIcon from "@material-ui/icons/MicNone";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import ScreenShareIcon from "@material-ui/icons/ScreenShare";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import SpeakerPhoneIcon from "@material-ui/icons/SpeakerPhone";
import SmartphoneIcon from "@material-ui/icons/Smartphone";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import StopIcon from "@material-ui/icons/Stop";

const VideoOption = ({ info }) => {
  const dispatch = useDispatch();
  const {
    activeAudio,
    activeVideo,
    activeSpeakerDetection,
    activeScreenSharing,
    activeRecording,
    openDataChannelDone,
    useVideo,
    useAudio,
  } = useSelector((state) => state.videoroom);

  const onClickActiveAudio = useCallback(() => {
    if (activeAudio) dispatch(inactiveAudioRequest(info.current));
    else dispatch(activeAudioRequest(info.current));
  }, [activeAudio]);
  const onClickActiveVideo = useCallback(() => {
    if (activeVideo) dispatch(inactiveVideoRequest(info.current));
    else dispatch(activeVideoRequest(info.current));
  }, [activeVideo]);
  const onClickActiveSpeakerDetection = useCallback(() => {
    if (activeSpeakerDetection) dispatch(inactiveSpeakerDetectionRequest());
    else dispatch(activeSpeakerDetectionRequest({ dispatch }));
  }, [activeSpeakerDetection]);
  const onClickActiveScreenSharing = useCallback(() => {
    if (activeScreenSharing)
      dispatch(inactiveScreenSharingRequest({ info: info.current, dispatch }));
    else dispatch(activeScreenSharingRequest({ info: info.current, dispatch }));
  }, [activeScreenSharing]);
  const onClickRecording = useCallback(() => {
    if (activeRecording) dispatch(inactiveRecordingRequest());
    else dispatch(activeRecordingRequest({ dispatch }));
  }, [activeRecording]);
  return (
    <ButtonGroup
      color="primary"
      aria-label="outlined primary button group"
      fullWidth
    >
      <Button
        onClick={onClickActiveAudio}
        disabled={!openDataChannelDone || !useAudio}
      >
        {activeAudio ? <MicIcon /> : <MicNoneIcon />}
      </Button>
      <Button
        onClick={onClickActiveVideo}
        disabled={!openDataChannelDone || !useVideo}
      >
        {activeVideo ? <VideocamIcon /> : <VideocamOffIcon />}
      </Button>
      <Button
        onClick={onClickActiveSpeakerDetection}
        disabled={!openDataChannelDone}
      >
        {activeSpeakerDetection ? <SpeakerPhoneIcon /> : <SmartphoneIcon />}
      </Button>
      <Button
        onClick={onClickActiveScreenSharing}
        disabled={!openDataChannelDone}
      >
        {activeScreenSharing ? <CancelPresentationIcon /> : <ScreenShareIcon />}
      </Button>
      <Button onClick={onClickRecording} disabled={!openDataChannelDone}>
        {activeRecording ? <StopIcon /> : <FiberManualRecordIcon />}
      </Button>
    </ButtonGroup>
  );
};

export default memo(VideoOption);
