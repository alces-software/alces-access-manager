
import React from 'react';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';

import Icon from 'components/Icon';
import NoVnc from 'components/NoVnc';

export default class VncSessionPage extends React.Component {
  render() {
    const {cluster, session} = this.props;

    const url = `ws://${cluster.ip}:${session.websocket}/websockify`;

    const volumeTooltip = <Tooltip>Disable sound (currently ON)</Tooltip>;
    const copyTooltip = <Tooltip>Copy</Tooltip>;
    const pasteTooltip = <Tooltip>Paste</Tooltip>;
    const interactiveTooltip = <Tooltip>Interactive mode</Tooltip>;
    const dragViewportTooltip = <Tooltip>Drag viewport mode</Tooltip>;

    return (
      <div className="container">
        <div className="vnc-container">
          <ButtonToolbar className="vnc-button-toolbar">
            <OverlayTrigger placement="top" overlay={volumeTooltip}>
              <Button>
                <Icon name="vnc-volume-on"/>
              </Button>
            </OverlayTrigger>
            <ButtonGroup>
              <OverlayTrigger placement="top" overlay={copyTooltip}>
                <Button>
                  <Icon name="vnc-copy"/>
                </Button>
              </OverlayTrigger>
              <OverlayTrigger placement="top" overlay={pasteTooltip}>
                <Button>
                  <Icon name="vnc-paste"/>
                </Button>
              </OverlayTrigger>
            </ButtonGroup>
            <ButtonGroup>
              <OverlayTrigger placement="top" overlay={interactiveTooltip}>
                <Button>
                  <Icon name="vnc-interactive"/>
                </Button>
              </OverlayTrigger>
              <OverlayTrigger placement="top" overlay={dragViewportTooltip}>
                <Button>
                  <Icon name="vnc-drag-viewport"/>
                </Button>
              </OverlayTrigger>
            </ButtonGroup>
          </ButtonToolbar>
          <NoVnc url={url} password={session.password}/>
        </div>
      </div>
    );
  }
}
