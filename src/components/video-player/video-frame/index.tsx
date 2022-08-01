import React, { useRef, useEffect } from "react";

// This works
//import { useViewer } from "../../react-kinesis-webrtc";

// This doesn't
import { useViewer } from 'react-kinesis-webrtc';

function VideoFrame({config}: any) {

  const {
    error,
    peer: { media } = { media: undefined},
  } = useViewer(config);

  const videoRef = useRef<any>();

  // Assign the peer media stream to a video source
  useEffect(() => {
    if (videoRef.current && media) {
      videoRef.current.srcObject = media;
    }
  }, [media, videoRef]);

  useEffect(() => {
    console.log(error?.message);
    if (error?.message === 'peer disconnected') {
      console.error(error.message);
    }
  },[error])

  // Display an error
  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  if (!media) {
    return <p>Connecting to the robot...</p>
  }

  return <>
    <video ref={videoRef} muted autoPlay/>
  </>
}
export default VideoFrame;