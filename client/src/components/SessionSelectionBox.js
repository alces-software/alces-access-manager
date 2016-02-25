
import React from 'react';
import {ButtonInput} from 'react-bootstrap';
import {Link} from 'react-router';

import {selectionBoxPropTypes} from 'utils/propTypes';

class SessionSelectionBox extends React.Component {
  render() {
    const session = this.props.item;
    const {cluster} = this.props;

    const sessionLink = `/cluster/${cluster.ip}/session/${session.port}`

    return (
      <div
        className="static-selection-box"
        >
        <p>
          <strong>{session.type}</strong> session running on <strong>{session.hostname}</strong>
        </p>
        <p>
          Display: {session.display}
        </p>
        <p>
          Websocket port: {session.websocket}
        </p>
        <Link to={sessionLink}>
          <ButtonInput
            className="selection-box-button"
            type="button"
            value="Connect"
            bsStyle="success"
          />
        </Link>
      </div>
    );
  }
}

SessionSelectionBox.propTypes = selectionBoxPropTypes;

export default SessionSelectionBox;
