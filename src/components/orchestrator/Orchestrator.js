import React, { Component } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

import BranchSelection from '../branch-selection/BranchSelection';

const VIDEO_TYPE = "video"
const BRANCH_TYPE = "branch"
const VALID_OBJECT_TYPES = [VIDEO_TYPE, BRANCH_TYPE]

class Orchestrator extends Component {
  constructor(props) {
    super(props)

    const {
      start,
    } = this.props;

    const activeType = start.type;
    const activeObject = this.lookup(start.type, start.id)

    this.state = {
      activeType: activeType,
      activeObject: activeObject,
    }
  }

  activateObject(type, id) {
    this.setState({
      activeType: type,
      activeObject: this.lookup(type, id),
    })
  }

  lookup(type, id) {
    let value;
    if (type === VIDEO_TYPE) value = this._videoLookup(id);
    else value = this._branchesLookup(id);

    if (value === undefined) console.error(
      `Could not find ${type} with id: ${id}.`
    )

    return value
  }

  _videoLookup(id) {
    return this.props.videos.find((elem) => {
      return elem.id === id
    })
  }

  _branchesLookup(id) {
    return this.props.branches.find((elem) => {
      return elem.id === id
    })
  }

  render() {
    const {
      activeType,
      activeObject,
    } = this.state;

    let activeObjectElem;
    if (activeType === VIDEO_TYPE) {
      const videoOpts = activeObject.videoOpts || {};
      const subsequentObject = activeObject.subsequent || null;
      activeObjectElem = (

        <YouTube
          videoId={activeObject.videoId}
          opts = {{
            playerVars: {
              autoplay: 1,
              showinfo: 0,
              // TODO: Disable after debugging/after we implement controls
              controls: 1,

              // Config vars
              start: videoOpts.startTimeInSeconds || 0,
            }
          }}
          onEnd={ () => {
            if (subsequentObject) {
              this.activateObject(
                subsequentObject.type,
                subsequentObject.id)
              }
            }
          }
        />
      )
    } else {
      activeObjectElem = (
        <BranchSelection
          onBranch={
            (id) => { this.activateObject(VIDEO_TYPE, id) }
          }
          branches={activeObject.branches}
        />
      )
    }

    return (
      <div>
        {activeObjectElem}
      </div>
    );
  }
}

Orchestrator.propTypes = {
  start: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(VALID_OBJECT_TYPES).isRequired,
  }).isRequired,

  videos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      videoId: PropTypes.string.isRequired,
      startTimeInSeconds: PropTypes.number,
      subsequent: PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.oneOf(VALID_OBJECT_TYPES).isRequired,
        waitInSeconds: PropTypes.number.isRequired,
      }),
    })
  ).isRequired,

  branches: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      branches: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          imageURI: PropTypes.string.isRequired,
        })
      ).isRequired,
      subsequent: PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.oneOf(VALID_OBJECT_TYPES).isRequired,
        waitInSeconds: PropTypes.number.isRequired,
      }),
    })
  ).isRequired,
}

export default Orchestrator;
