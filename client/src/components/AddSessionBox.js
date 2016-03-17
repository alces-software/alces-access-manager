
import _ from 'lodash';
import React from 'react';
import {Button, Input} from 'react-bootstrap';

import ButtonContent from 'components/ButtonContent';

export default class AddSessionBox extends React.Component {
  render() {
    const {sessionTypes} = this.props;

    // TODO: make buttons in different boxes line up.

    return (
      <div className="static-selection-box add-item-box">
        <p>
          <strong>Launch new session</strong>
        </p>
        <Input type="select">
          {_.map(sessionTypes, (type, key) => (
          <option value={type} key={key}>{type}</option>
          ))}
        </Input>
        <Button
          bsStyle="success"
          className="selection-box-button"
          type="submit"
        >
          <ButtonContent text="Launch" iconName="session-launch"/>
        </Button>
      </div>
    );
  }
}
