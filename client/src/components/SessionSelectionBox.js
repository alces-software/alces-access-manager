
import React from 'react';
import {Button} from 'react-bootstrap';
import FlipCard from 'react-flipcard';
import {Link} from 'react-router';

import ButtonContent from 'components/ButtonContent';
import {selectionBoxPropTypes} from 'utils/propTypes';

class SessionSelectionBox extends React.Component {
  render() {
    const session = this.props.item;
    const {cluster} = this.props;

    const sessionLink = `/cluster/${cluster.ip}/session/${session.uuid}`

    // TODO: 1st external access URL has user root in the details.txt file
    // because $USER is still always set to root even if we're acting as
    // another user - does this matter?

    const vncHyperlinkAccess = `vnc://${cluster.authenticated_username}:${session.password}@${session.access_host}:${session.port}`;
    const vncPortNumberAccess = `${session.access_host}:${session.port}`;
    const vncDisplayNumberAccess = `${session.access_host}:${session.display}`;

    return (
      <div className="flip-selection-box">
        <FlipCard>
          <div>
            <p>
              <strong>{session.type}</strong> session running
              on <strong>{session.hostname}</strong>
            </p>
            <p>
              Display: {session.display}
            </p>
            <p>
              Websocket port: {session.websocket}
            </p>
              <Link to={sessionLink}>
                <Button
                  className="selection-box-button"
                  type="button"
                  bsStyle="success"
                >
                  <ButtonContent text="Connect In Browser" iconName="session-connect"/>
                </Button>
              </Link>
              <Button
                className="selection-box-button"
                type="button"
                bsStyle="info"
              >
                <ButtonContent text="External Access" iconName="session-external-access"/>
              </Button>
          </div>

          <div>
            <p>Select a method for external access to your VNC session:</p>
            <p>
              <code>{vncHyperlinkAccess}</code>
            </p>
            <p>
              <code>{vncPortNumberAccess}</code>
            </p>
            <p>
              <code>{vncDisplayNumberAccess}</code>
            </p>
          </div>
        </FlipCard>
      </div>
    );
  }
}

SessionSelectionBox.propTypes = selectionBoxPropTypes;

export default SessionSelectionBox;
