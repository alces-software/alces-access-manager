'use strict';

import React from 'react';
import noVNC from 'novnc-node';

class NoVnc extends React.Component {
  render() {
    return (
      <div className="novnc">
        <canvas
          id='novnc-canvas'
          onMouseOver={this.handleMouseOver.bind(this)}
          onMouseOut={this.handleMouseOut.bind(this)}
          >
        </canvas>
      </div>
    );
  }

  componentDidMount() {
    this.canvas = document.getElementById('novnc-canvas');

    this.rfb = new noVNC.RFB({
      local_cursor: true, // eslint-disable-line camelcase
      target: this.canvas,
      onUpdateState: this.stateHandler.bind(this),
    });

    this.connect();
  }

  stateHandler(rfb, state, oldstate, msg) {
    // The stateChange action just takes these two of the onUpdateState
    // parameters since we don't want to store the rfb object and oldstate is
    // just the previous state, which is easily obtainable if needed.
    this.props.stateChange(state, msg);
  }

  connect() {
    const {url, password} = this.props;
    this.rfb.connect(url, password);
  }

  handleMouseOver() {
    // When component moused over make keyboard send keys to canvas and focus
    // the canvas, so keys sent to the VNC session; this does not seem to
    // consistently happen otherwise.
    // TODO: still need to unfocus and refocus canvas once for this to work at
    // the moment.
    this.rfb.get_keyboard().set_focused(true);
    this.canvas.focus();
  }

  handleMouseOut() {
    // Don't send keys to canvas any more when mouse leaves.
    this.rfb.get_keyboard().set_focused(false);
  }

  handleVncConnect(event, data) {
    console.log('handling', event, data); // eslint-disable-line no-console
  }
}

NoVnc.displayName = 'NoVNC';

// Uncomment properties you need
// NoVncComponent.propTypes = {};
// NoVncComponent.defaultProps = {};

export default NoVnc;
