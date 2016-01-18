'use strict';

import React from 'react';
import noVNC from 'novnc-node';

require('styles/NoVnc.scss');

class NoVnc extends React.Component {
  render() {
    return (
      <canvas
        id='novnc-canvas'
        onMouseOver={this.handleMouseOver.bind(this)}
        onMouseOut={this.handleMouseOut.bind(this)}
        >
      </canvas>
    );
  }

  componentDidMount() {
    this.canvas = document.getElementById('novnc-canvas');
    this.rfb = new noVNC.RFB({
      local_cursor: true,
      target: this.canvas,
    });

    // /websocket suffix required as specified here:
    // http://procbits.com/2013/10/09/connecting-to-a-sockjs-server-from-native-html5-websocket.
    this.rfb.connect('ws://localhost:6080/websocket', 6080);
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
}

NoVnc.displayName = 'NoVNC';

// Uncomment properties you need
// NoVncComponent.propTypes = {};
// NoVncComponent.defaultProps = {};

export default NoVnc;
