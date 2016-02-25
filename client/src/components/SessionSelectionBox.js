
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
          {session.name}
        </p>
        <p>
          Port: {session.port}
        </p>
        <p>
          [Session details to go here]
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
