import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Auth } from "aws-amplify";
import { useEffect } from "react";
import { ICredentials } from "@aws-amplify/core";
import VideoFrame from "./video-frame";


const channels = [
  { label: "video-1", value: "arn:aws:kinesisvideo:eu-west-1:565575885781:channel/test1/1659339791732" },
  { label: "video-2", value: "arn:aws:kinesisvideo:eu-west-1:565575885781:channel/test2/1659339822709" },
];

function VideoPlayer() {
  
  const [camera, setCamera] = useState(0);

  const onChange = (event: SelectChangeEvent<number>) => {
    setCamera(event.target.value as number);
  }

  const [ credentials, setCredentials ] = useState<ICredentials>();
  const [ config, setConfig] = useState<any>();


  useEffect(()=> {
    const getCreds = async () => {
      const creds = await Auth.currentCredentials();
      setCredentials(creds);
    }
    getCreds();
  }, [])


  useEffect(()=> {
    setConfig({
      credentials,
      debug: true,
      media: undefined,
      channelARN: channels[camera].value,
      region: 'eu-west-1',
    })
  },[credentials, camera]);


  if (!config?.credentials) {
    return <p>Loading...</p>
  }

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Camera</InputLabel>
        <Select
          labelId="camera"
          id="camera"
          value={camera}
          label={channels[camera].label}
          onChange={onChange}
        >
          {channels.map((option, index) => (
            <MenuItem key={option.label} value={index}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <VideoFrame config={config}/>
    </>
  );
}
export default VideoPlayer;
