
import React, { Component, PropTypes } from 'react';
import ImageFallback from 'react-image-fallback';

const propTypes = {
  session: PropTypes.object.isRequired,
};

class SessionScreenshot extends Component {
  render() {
    const {session} = this.props;

    const fallbackImage = '/images/static.jpg'
    const sessionScreenshot = `/session-screenshots/${session.uuid}.png`;

    return (
      <span>
        <ImageFallback
          src={sessionScreenshot}
          fallbackImage={fallbackImage}
          initialImage={fallbackImage}
          width="85%"
        />
      </span>
    )
  }
}

SessionScreenshot.propTypes = propTypes;
export default SessionScreenshot;
