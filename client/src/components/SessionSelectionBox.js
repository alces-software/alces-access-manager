
import React from 'react';
import {ButtonInput} from 'react-bootstrap';

import {selectionBoxPropTypes} from 'utils/propTypes';

class SessionSelectionBox extends React.Component {
  render() {
    const session = this.props.item;

    return (
      <div
        className="session-selection-box"
        >
        <p>
          {session.name}
        </p>
        <p>
          [Session details to go here]
        </p>
        <ButtonInput
          className="selection-box-button"
          type="button"
          value="Connect"
          bsStyle="success"
        />
      </div>
    );
  }
}

SessionSelectionBox.propTypes = selectionBoxPropTypes;

export default SessionSelectionBox;
