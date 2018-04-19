import React, { Component } from 'react';
import YouTube from 'react-youtube';

import logo from '../../logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <YouTube
          videoId='GqLhLDbm0d8'
          opts = {{
            playerVars: {
              autoplay: 1,
              start: 17,
              showinfo: 0,
              controls: 0,
            }
          }}
          onEnd={() => {alert("All Done!")}}
        />
      </div>
    );
  }
}

export default App;
