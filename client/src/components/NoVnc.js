
import React, {PropTypes} from 'react';
import noVNC from 'novnc-node';

class NoVnc extends React.Component {
  render() {
    const {novnc} = this.props;

    return (
      <div id="novnc-wrapper" className="novnc">
        <canvas
          id='novnc-canvas'
          className={novnc.viewportDrag ? "novnc-canvas--dragEnabled" : ""}
          onMouseOver={this.handleMouseOver.bind(this)}
          onMouseOut={this.handleMouseOut.bind(this)}
          >
        </canvas>
      </div>
    );
  }

  componentWillMount() {
    this.resizeViewport.bind(this);
  }

  componentDidMount() {
    this.canvas = document.getElementById('novnc-canvas');

    this.rfb = new noVNC.RFB({
      local_cursor: true, // eslint-disable-line camelcase
      target: this.canvas,
      onUpdateState: this.stateHandler.bind(this),
      onClipboard: this.clipboardHandler.bind(this),
    });

    window.addEventListener("resize", this.resizeViewport.bind(this));

    this.connect();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeViewport.bind(this));

    // Reset to interactive mode; more intuitive.
    // TODO: Reset other parts of interface?
    this.props.novncActions.setInteractiveMode();
  }

  // Resize noVNC viewport to dimensions of wrapper div.
  // TODO: Should this be debounced?
  resizeViewport() {
    const novncWrapper = document.getElementById("novnc-wrapper");
    const width = novncWrapper.clientWidth;
    const height = novncWrapper.clientHeight;
    if (width && height) {
      const display = this.rfb.get_display();
      display.viewportChangeSize(width, height);
    }
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

    if (novnc.viewportDrag !== this.props.novnc.viewportDrag) {
      this.rfb.set_viewportDrag(novnc.viewportDrag);
    }

    const transitioningToState = (state) =>
      novnc.state === state && this.props.novnc.state !== state;

    if (transitioningToState('failed')) {
      const sessionFailedOnInitialConnect =
        this.props.novnc.state === 'connect';
      novncActions.showSessionFailedModal(sessionFailedOnInitialConnect);
    }
    else if (transitioningToState('normal')) {
      // TODO set dimensions
      const display = this.rfb.get_display();
      display.set_viewport(true);
      this.resizeViewport();
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
  novnc: PropTypes.object.isRequired, // noVNC Redux store state.
  novncActions: PropTypes.object.isRequired,
  formActions: PropTypes.object.isRequired,
};

export default NoVnc;
