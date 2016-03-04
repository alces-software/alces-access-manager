
import ClipboardAction from 'clipboard/lib/clipboard-action';
import React from 'react';
import {ButtonGroup, ButtonToolbar} from 'react-bootstrap';

import NoVnc from 'components/NoVnc';
import ToolbarButton from 'components/ToolbarButton';

export default class VncSessionPage extends React.Component {
  render() {
    const {cluster, novnc, session, stateChange, setCopyText} = this.props;

    const url = `ws://${cluster.ip}:${session.websocket}/websockify`;

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
              <ToolbarButton
                iconName="vnc-copy"
                tooltip="Copy"
                active={novnc.copyMode}
                onClick={this.handleClickCopyButton.bind(this)}
              />
              <ToolbarButton
                iconName="vnc-paste"
                tooltip="Paste"
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
            stateChange={stateChange}
            setCopyText={setCopyText}
            novnc={novnc}
          />
        </div>
      </div>
    );
  }

  handleClickCopyButton() {
    const {novnc: {copyText}} = this.props;

    // This will copy the stored text, received from the session clipboard to
    // the system clipboard.
    new ClipboardAction({
      action: 'copy',
      emitter: {emit: (event, payload) => console.log('Emit', event, payload)}, // eslint-disable-line no-console
      text: copyText,
    });
  }
}
