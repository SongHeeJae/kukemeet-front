import React, { useRef, useEffect, useCallback, memo, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { changeMainStreamSuccess } from "../reducers/videoroom";
import { IconButton, Slider } from "@material-ui/core";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import blue from "@material-ui/core/colors/blue";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
  },
});

const VolumeSliderWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  width: 90%;
  align-items: center;
`;

const TopWrapper = styled.div`
  position: absolute;
  background: black;
  width: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.3);
`;

const VideoWrapper = styled.video`
  width: 100%;
  height: 100%;
`;

const VideoItem = ({ stream, display }) => {
  const dispatch = useDispatch();
  const videoRef = useRef();
  const [volume, setVolume] = useState(100);

  useEffect(() => {
    videoRef.current.srcObject = stream;
  }, [stream && stream.getVideoTracks().length > 0]);

  const onClick = useCallback(() => {
    dispatch(changeMainStreamSuccess({ stream, display }));
  }, [stream]);

  const onClickVolume = useCallback(() => {
    if (volume > 0) onChangeVolume(null, 0);
    else onChangeVolume(null, 100);
  }, [volume]);

  const onChangeVolume = useCallback((e, nextVolume) => {
    setVolume(nextVolume);
    videoRef.current.volume = nextVolume / 100;
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <TopWrapper>
        <VolumeSliderWrapper>
          <IconButton onClick={onClickVolume}>
            {volume > 0 ? (
              <VolumeUpIcon color="primary" />
            ) : (
              <VolumeOffIcon color="primary" />
            )}
          </IconButton>
          <Slider value={volume} onChange={onChangeVolume} />
        </VolumeSliderWrapper>
      </TopWrapper>
      <VideoWrapper ref={videoRef} autoPlay playsInline onClick={onClick} />
    </MuiThemeProvider>
  );
};

export default memo(
  VideoItem,
  (prevProps, nextProps) => prevProps.stream === nextProps.stream
);
