import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import VideoPlayer from './VideoPlayer.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <VideoPlayer
          videoID='GqLhLDbm0d8'
          startTimeInSeconds={17}
        />
      </div>
    );
  }
}

export default App;
