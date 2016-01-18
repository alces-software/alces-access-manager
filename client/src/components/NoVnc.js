'use strict';

import React from 'react';

import noVNC from 'novnc-node';

require('styles/NoVnc.scss');

class NoVnc extends React.Component {
  render() {
    return (
      <canvas id='novnc-canvas'></canvas>
    );
  }
  componentDidMount() {
    const rfb = new noVNC.RFB({
      target: document.getElementById('novnc-canvas')
    });

    // /websocket suffix required as specified here:
    // http://procbits.com/2013/10/09/connecting-to-a-sockjs-server-from-native-html5-websocket.
    rfb.connect('ws://localhost:6080/websocket', 6080);
  }
}

NoVnc.displayName = 'NoVNC';

// Uncomment properties you need
// NoVncComponent.propTypes = {};
// NoVncComponent.defaultProps = {};

export default NoVnc;
