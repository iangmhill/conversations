import React, { Component } from 'react';
import PropTypes from 'prop-types';

const BASE_URL = 'https://www.youtube.com/embed';

class VideoPlayer extends Component {
  render() {
    const {
      videoID,
      loop,
      autoplay,
      showControls,
      startTimeInSeconds,
      showVideoInfo,
    } = this.props;

    const videoOptions = {
      loop: loop ? 1 : 0,
      autoplay: autoplay ? 1 : 0,
      controls: showControls ? 1 : 0,
      showinfo: showVideoInfo ? 1 : 0,
      start: startTimeInSeconds,
      modestbranding: 1, // Doesn't work
    }

    // Convert the options hash into URI encoded parameters
    const videoOptionsURI = Object.entries(videoOptions).map((kvPair) => {
      const [key, value] = kvPair
      return `&${key}=${value}`
    }).join("")

    const videoURI = `${BASE_URL}/${videoID}?${videoOptionsURI}`

    return (
      <div className="VideoPlayer">
        <iframe
          title={`video ${videoID}`}
          src={videoURI}
          allowFullScreen
        />
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  videoID: PropTypes.string.isRequired,
  loop: PropTypes.bool,
  autoplay: PropTypes.bool,
  showControls: PropTypes.bool,
  showVideoInfo: PropTypes.bool,
}

VideoPlayer.defaultProps = {
  loop: false,
  autoplay: true,
  showControls: false,
  showVideoInfo: false,
}

export default VideoPlayer;
