
import React from 'react';
import {Button, ButtonGroup, ButtonToolbar} from 'react-bootstrap';

import Icon from 'components/Icon';
import NoVnc from 'components/NoVnc';

export default class VncSessionPage extends React.Component {
  render() {
    const {cluster, session} = this.props;
    const url = `ws://${cluster.ip}:${session.websocket}/websockify`

      return (
        <div className="container">
          <div className="vnc-container">
            <ButtonToolbar className="vnc-button-toolbar">
              <Button>
                <Icon name="vnc-volume-on"/>
              </Button>
              <ButtonGroup>
                <Button>
                  <Icon name="vnc-copy"/>
                </Button>
                <Button>
                  <Icon name="vnc-paste"/>
                </Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button>
                  <Icon name="vnc-interactive"/>
                </Button>
                <Button>
                  <Icon name="vnc-drag-viewport"/>
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
            <NoVnc url={url} password={session.password}/>
          </div>
        </div>
    );
  }
}
