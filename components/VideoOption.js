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
} from "../reducers/videoroom";
import MicIcon from "@material-ui/icons/Mic";
import MicNoneIcon from "@material-ui/icons/MicNone";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import ScreenShareIcon from "@material-ui/icons/ScreenShare";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import SpeakerPhoneIcon from "@material-ui/icons/SpeakerPhone";
import SmartphoneIcon from "@material-ui/icons/Smartphone";

const VideoOption = ({ info }) => {
  const dispatch = useDispatch();
  const {
    activeAudio,
    activeVideo,
    activeSpeakerDetection,
    activeScreenSharing,
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
  return (
    <ButtonGroup
      color="primary"
      aria-label="outlined primary button group"
      fullWidth
    >
      <Button onClick={onClickActiveAudio} disabled={!!info.pluginHandle}>
        {activeAudio ? <MicIcon /> : <MicNoneIcon />}
      </Button>
      <Button onClick={onClickActiveVideo} disabled={!!info.pluginHandle}>
        {activeVideo ? <VideocamIcon /> : <VideocamOffIcon />}
      </Button>
      <Button
        onClick={onClickActiveSpeakerDetection}
        disabled={!!info.pluginHandle}
      >
        {activeSpeakerDetection ? <SpeakerPhoneIcon /> : <SmartphoneIcon />}
      </Button>
      <Button
        onClick={onClickActiveScreenSharing}
        disabled={!!info.pluginHandle}
      >
        {activeScreenSharing ? <CancelPresentationIcon /> : <ScreenShareIcon />}
      </Button>
    </ButtonGroup>
  );
};

export default memo(VideoOption);
