'use strict';

import React from 'react';
import noVNC from 'novnc-node';
import $ from 'jquery';

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
    this.$canvas = $(this.canvas);

    // Add event handlers.
    this.$canvas.on('vnc:connect', this.handleVncConnect.bind(this));

    this.rfb = new noVNC.RFB({
      local_cursor: true, // eslint-disable-line camelcase
      target: this.canvas,
      onUpdateState: this.stateHandler.bind(this),
    });

    this.connect();
  }

  stateHandler(rfb, state, oldstate, msg) {
    // TODO: Rather than having custom events, it would be more React-y to
    // dispatch actions and monitor the state.
    const statesMap = {
      loaded: 'load',
      connect: 'start',
      failed: 'failure',
      fatal: 'fatal',
      normal: 'connect',
      disconnected: 'disconnect',
    };
    const eventState = statesMap[state];
    if (eventState && this.canvas) {
      console.log(eventState); // eslint-disable-line no-console
      const eventName = `vnc:${eventState}`
      const data = {rfb, state, oldstate, msg};
      this.$canvas.trigger(eventName, data);
    }
  }

  componentWillUnmount() {
    // TODO: Not actually manually tested yet as component never unmounts.
    this.$canvas.off();
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
