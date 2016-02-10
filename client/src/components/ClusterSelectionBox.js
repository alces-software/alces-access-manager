
import React from 'react';
import {ButtonInput, Input} from 'react-bootstrap';
import FlipCard from 'react-flipcard';

export default class ClusterSelectionBox extends React.Component {
  render() {
    const {name} = this.props;

    const nameElement = <div className="cluster-selection-box-name">{name}</div>;
    return (
      <div
        className="cluster-selection-box"
        >
        <FlipCard>
          <div className="cluster-selection-box-front">
            {nameElement}
            <div>[Cluster details to go here]</div>
          </div>
          <div className="cluster-selection-box-back">
            {nameElement}
            <form>
              <Input placeholder="Username" type="text"/>
              <Input placeholder="Password" type="password"/>
              <ButtonInput
                className="cluster-selection-box-submit"
                type="submit"
                value="View"
                bsStyle="success"
              />
            </form>
          </div>
        </FlipCard>
      </div>
    );
  }
}
