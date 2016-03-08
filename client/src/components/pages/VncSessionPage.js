
import React from 'react';
import {Button, ButtonGroup, ButtonToolbar, Input} from 'react-bootstrap';
import {reduxForm} from 'redux-form';

import NoVnc from 'components/NoVnc';
import StandardModal from 'components/StandardModal';
import ToolbarButton from 'components/ToolbarButton';
import ToolbarCopyButton from 'components/ToolbarCopyButton';

class VncSessionPage extends React.Component {
  render() {
    const {
      cluster,
      fields: {
        pastedText,
      },
      formActions,
      notificationActions,
      novnc,
      novncActions,
      session,
    } = this.props;

    // TODO: Have different URLs for dev vs production.
    const url = `ws://${cluster.ip}:${session.websocket}/vnc/${session.host}/${session.websocket}`;

    const pasteModalButtons = (
      <Button
        onClick={novncActions.pasteText}
        bsStyle="success"
      >
        Paste
      </Button>
    );

    return (
      <div className="container">
        <div className="vnc-container">
          <ButtonToolbar className="vnc-button-toolbar">
            {/* Sound toggle planned for future iteration.
            <ButtonGroup>
              <ToolbarButton
                iconName="vnc-volume-on"
                tooltip="Disable sound (currently ON)"
              />
            </ButtonGroup>
            */}
            <ButtonGroup>
              <ToolbarCopyButton
                novnc={novnc}
                notificationActions={notificationActions}
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
              />
              <ToolbarButton
                iconName="vnc-drag-viewport"
                tooltip="Drag viewport mode"
              />
            </ButtonGroup>
          </ButtonToolbar>
          <NoVnc
            url={url}
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
}

VncSessionPage = reduxForm({
  fields: ['pastedText'],
  form: 'vnc-paste-modal',
})(VncSessionPage);

export default VncSessionPage;
