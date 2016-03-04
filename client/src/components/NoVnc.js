'use strict';

import React, {PropTypes} from 'react';
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
      onClipboard: this.clipboardHandler.bind(this),
    });

    this.connect();
  }

  componentWillReceiveProps(nextProps) {
    const {novnc: {pastedText}} = nextProps;

    if (pastedText) {
      // Send text to session clipboard.
      this.rfb.clipboardPasteFrom(pastedText)

      // Send all keys of pasted text to session directly.
      for (let i=0; i<pastedText.length; i++) {
        this.rfb.sendKey(pastedText.charCodeAt(i));
      }

      // Dispatch that paste is complete; will set pastedText to undefined so
      // we don't receive the same pastedText in future prop updates.
      this.props.pasteComplete();
    }
  }

  stateHandler(rfb, state, oldstate, msg) {
    // The stateChange action just takes these two of the onUpdateState
    // parameters since we don't want to store the rfb object and oldstate is
    // just the previous state, which is easily obtainable if needed.
    this.props.stateChange(state, msg);
  }

  clipboardHandler(rfb, text) {
    this.props.setCopyText(text);
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

NoVnc.propTypes = {
  url: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  stateChange: PropTypes.func.isRequired,
  novnc: PropTypes.object.isRequired, // noVNC Redux store state.
};

export default NoVnc;
