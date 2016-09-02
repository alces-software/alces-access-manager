
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
      <div className="session-screenshot-container">
        <div className="session-screenshot-text">
          {this.state && this.state.text}
        </div>
        <ImageFallback
          src={sessionScreenshot}
          fallbackImage={fallbackImage}
          initialImage={fallbackImage}
          width="85%"
          className="session-screenshot"
          onError={this.handleNoScreenshot.bind(this)}
        />
      </div>
    )
  }

  handleNoScreenshot() {
    this.setState({
      text: 'NO SCREENSHOT AVAILABLE YET',
    })
  }
}

SessionScreenshot.propTypes = propTypes;
export default SessionScreenshot;
