
import React from 'react';
import {Input} from 'react-bootstrap';
import FlipCard from 'react-flipcard';

export default class ClusterSelectionBox extends React.Component {
  render() {
    const {name} = this.props;
    return (
      <div
        className="cluster-selection-box"
        >
        <FlipCard>
          <div className="cluster-selection-box-front">{name}</div>
          <div className="cluster-selection-box-back">
            <Input label="Username" type="text"/>
            <Input label="Password" type="password"/>
          </div>
        </FlipCard>
      </div>
    );
  }
}
