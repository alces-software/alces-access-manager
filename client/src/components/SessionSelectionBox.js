
import React from 'react';
import {ButtonInput} from 'react-bootstrap';

export default class SessionSelectionBox extends React.Component {
  render() {
    const {name} = this.props;

    return (
      <div
        className="session-selection-box"
        >
        <p>
          {name}
        </p>
        <p>
          [Session details to go here]
        </p>
        <ButtonInput
          className="cluster-selection-box-submit"
          type="button"
          value="Connect"
          bsStyle="success"
        />
      </div>
    );
  }
}
