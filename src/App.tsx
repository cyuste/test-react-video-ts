import React from 'react';
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import './App.css';
import VideoPlayer from './components/video-player';


function App(props: any) {
  return (
    <div className="App">
      <header className="App-header">
        <Heading level={1}>Hello {props.user.username}</Heading>
        <Button onClick={props.signOut}>Sign out</Button>
        <VideoPlayer/>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
