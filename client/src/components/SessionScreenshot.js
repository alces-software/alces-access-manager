
import React, { Component, PropTypes } from 'react';

const propTypes = {
  session: PropTypes.object.isRequired,
};

class SessionScreenshot extends Component {
  render() {
    const {session} = this.props;

    let imageSrc;
    let imageText;
    if (session.screenshot) {
      imageSrc =  `/session-screenshots/${session.screenshot}`
    }
    else {
      imageSrc = '/images/static.jpg'
      imageText = 'NO SCREENSHOT AVAILABLE YET'
    }

    return (
      <div className="session-screenshot-container">
        <div className="session-screenshot-text">
          {imageText}
        </div>
        <img
          src={imageSrc}
          width="85%"
          className="session-screenshot"
        />
      </div>
    )
  }
}

SessionScreenshot.propTypes = propTypes;
export default SessionScreenshot;
