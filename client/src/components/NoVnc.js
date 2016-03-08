
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
    const {
      formActions,
      novnc,
      novncActions,
    } = nextProps;

    const currentlyPasting = this.state && this.state.pastingText;
    const startingPaste = novnc.pastedText && !currentlyPasting;
    const finishedPaste = !novnc.pastedText && currentlyPasting

    // We monitor when we receive new text to paste and set a flag in the
    // component's state until the paste has completed; this ensures that the
    // paste doesn't occur multiple times if the component receives props again
    // while the initial paste has yet to complete.
    if (startingPaste) {
      this.setPastingText(true);

      // Send text to session clipboard.
      this.rfb.clipboardPasteFrom(novnc.pastedText)

      // Send all keys of pasted text to session directly.
      for (let i=0; i<novnc.pastedText.length; i++) {
        this.rfb.sendKey(novnc.pastedText.charCodeAt(i));
      }

      // Dispatch that paste is complete; will set pastedText to undefined so
      // we don't receive the same pastedText in future prop updates.
      novncActions.pasteComplete();

      // Clear the form.
      formActions.reset('vnc-paste-modal');
    }
    else if (finishedPaste) {
      this.setPastingText(false);
    }

    const transitioningToFailedState =
      novnc.state === 'failed' && this.props.novnc.state !== 'failed';

    if (transitioningToFailedState) {
      novncActions.showSessionFailedModal();
    }
  }

  setPastingText(pastingText) {
    this.setState({
      pastingText,
    })
  }

  stateHandler(rfb, state, oldstate, msg) {
    // The stateChange action just takes these two of the onUpdateState
    // parameters since we don't want to store the rfb object and oldstate is
    // just the previous state, which is easily obtainable if needed.
    this.props.novncActions.stateChange(state, msg);
  }

  clipboardHandler(rfb, text) {
    this.props.novncActions.setCopyText(text);
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
}

NoVnc.propTypes = {
  url: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  notificationActions: PropTypes.object.isRequired,
  novnc: PropTypes.object.isRequired, // noVNC Redux store state.
  novncActions: PropTypes.object.isRequired,
  formActions: PropTypes.object.isRequired,
};

export default NoVnc;
