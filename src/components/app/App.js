import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Orchestrator from '../orchestrator/Orchestrator'

import logo from '../../logo.svg';
import './App.css';

class App extends Component {
  render() {
    const {
      start,
      videos,
      branches,
    } = this.props.storyConfig

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Orchestrator
          start={start}
          videos={videos}
          branches={branches}
        />
      </div>
    );
  }
}

App.propTypes = {
  storyConfig: PropTypes.shape({
    start: PropTypes.object.isRequired,
    videos: PropTypes.array.isRequired,
    branches: PropTypes.array.isRequired,
  })
}

export default App;
