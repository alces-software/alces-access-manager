
import React from 'react';
import {ButtonGroup, ButtonToolbar} from 'react-bootstrap';

import NoVnc from 'components/NoVnc';
import ToolbarButton from 'components/ToolbarButton';

export default class VncSessionPage extends React.Component {
  render() {
    const {cluster, novnc, session, stateChange} = this.props;

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
            novnc={novnc}
          />
        </div>
      </div>
    );
  }
}
