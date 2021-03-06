
import React from 'react';
import {Button, ButtonGroup, ButtonToolbar, Input} from 'react-bootstrap';
import {reduxForm} from 'redux-form';
import {StandardModal} from 'flight-common';

import NoVnc from 'components/NoVnc';
import ToolbarButton from 'components/ToolbarButton';
import ToolbarCopyButton from 'components/ToolbarCopyButton';

class VncSessionPage extends React.Component {
  render() {
    const {
      fields: {
        pastedText,
      },
      formActions,
      notificationActions,
      novnc,
      novncActions,
      notifications: {infoGeneratorsMap},
      session,
    } = this.props;

    // We set the maximum width of the overall VNC container to the width of
    // the VNC session, so the in-browser session will display as wide as
    // possible.
    const vncContainerStyles = {maxWidth: novnc.width};

    const pasteModalButtons = (
      <Button
        onClick={novncActions.pasteText}
        bsStyle="success"
        disabled={!pastedText.value}
      >
        Paste
      </Button>
    );

    return (
      <div className="container">
        <div className="vnc-container" style={vncContainerStyles}>
          <ButtonToolbar className="vnc-button-toolbar">
            <ButtonGroup>
              <ToolbarButton
                iconName={novnc.soundEnabled ? "vnc-volume-on" : "vnc-volume-off"}
                tooltip={novnc.soundEnabled  ? "Disable sound (currently ON)" : "Enable sound (currently OFF)"}
                onClick={this.handleClickSoundButton.bind(this)}
              />
            </ButtonGroup>
            <ButtonGroup>
              <ToolbarCopyButton
                novnc={novnc}
                notificationActions={notificationActions}
                infoGeneratorsMap={infoGeneratorsMap}
              />
              <ToolbarButton
                iconName="vnc-paste"
                tooltip="Paste"
                onClick={novncActions.showPasteModal}
              />
            </ButtonGroup>
            <ButtonGroup>
              <ToolbarButton
                iconName="vnc-interactive"
                tooltip="Interactive mode"
                onClick={novncActions.setInteractiveMode}
                active={!novnc.viewportDrag}
              />
              <ToolbarButton
                iconName="vnc-drag-viewport"
                tooltip="Drag viewport mode"
                onClick={novncActions.setDragViewportMode}
                active={novnc.viewportDrag}
              />
            </ButtonGroup>
          </ButtonToolbar>
          <NoVnc
            url={this.websocketUrl()}
            password={session.password}
            novnc={novnc}
            novncActions={novncActions}
            formActions={formActions}
          />
        </div>
        <StandardModal
          show={novnc.showingPasteModal}
          title="Paste text to VNC session"
          onHide={novncActions.hidePasteModal}
          buttons={pasteModalButtons}
        >
          <form>
            <p>
              Enter some text to be sent to the VNC session below.
            </p>
            <Input type="textarea" {...pastedText}/>
          </form>
        </StandardModal>
        <StandardModal
          show={novnc.showingSessionFailedModal}
          title="VNC session connection failed"
          onHide={novncActions.hideSessionFailedModal}
        >
          <p>
            {
              novnc.sessionFailedOnInitialConnect ?
              "Unable to connect to the VNC session"
              :
              "The connection to the VNC session was lost"
            }
            . This can happen because the session has been terminated remotely
            or because of an issue with your network connection.
          </p>
          <p>
            You can try re-connecting to the session now; contact your
            environment administrator for assistance if this problem persists
            unexpectedly.
          </p>
        </StandardModal>
      </div>
    );
  }

  websocketUrl() {
    const {cluster, session} = this.props;

    if (__PRODUCTION__) {
      // In production we want to use SSL and connect to a proxy to the VNC
      // session websocket, which will run on the cluster login node. Note that
      // the IP proxied to depends on the session type - it will be the same
      // node as that running the proxy for login sessions, or the access_host
      // as determined by Clusterware for compute sessions.
      const isLoginNodeSession = session.host == cluster.loginIp;
      const internalSessionIp = isLoginNodeSession ? '127.0.0.1' : session.access_host;
      return `wss://${cluster.proxyAddress}/ws/${internalSessionIp}/${session.websocket}`
    }
    else {
      // In development we don't use SSL and connect to the websocket directly
      // on the equivalent localhost port; manually forwarding this port to the
      // correct port on the node for this session is required for this to
      // succeed.
      return `ws://localhost:${session.websocket}`;
    }
  }

  handleClickSoundButton() {
    const {
      novnc: {soundEnabled},
      novncActions: {enableSound, disableSound},
    } = this.props;

    soundEnabled ? disableSound() : enableSound();
  }

  shouldComponentUpdate(nextProps) {
    // session is parsed from URL, so if it is unset we are probably in the
    // process of navigating away from this page and shouldn't render (or will
    // get errors).
    return !!nextProps.session;
  }
}

VncSessionPage = reduxForm({
  fields: ['pastedText'],
  form: 'vnc-paste-modal',
})(VncSessionPage);

export default VncSessionPage;
