import React, { useCallback } from "react";
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
    <ButtonGroup color="primary" aria-label="outlined primary button group">
      <Button onClick={onClickActiveAudio} disabled={!!info.pluginHandle}>
        {activeAudio ? "음성 비활성화" : "음성 활성화"}
      </Button>
      <Button onClick={onClickActiveVideo} disabled={!!info.pluginHandle}>
        {activeVideo ? "비디오 비활성화" : "비디오 활성화"}
      </Button>
      <Button
        onClick={onClickActiveSpeakerDetection}
        disabled={!!info.pluginHandle}
      >
        {activeSpeakerDetection ? "화자 추적 비활성화" : "화자 추적 활성화"}
      </Button>
      <Button
        onClick={onClickActiveScreenSharing}
        disabled={!!info.pluginHandle}
      >
        {activeScreenSharing ? "화면 공유 비활성화" : "화면 공유 활성화"}
      </Button>
    </ButtonGroup>
  );
};

export default VideoOption;
