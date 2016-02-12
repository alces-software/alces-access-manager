
import React from 'react';
import {ButtonInput, Input} from 'react-bootstrap';
import FlipCard from 'react-flipcard';

export default class ClusterSelectionBox extends React.Component {
  render() {
    const {name} = this.props;

    return (
      <div
        className="cluster-selection-box"
        >
        <FlipCard>
          <div className="cluster-selection-box-front">
            <p>
              {name}
            </p>
            <p>
              [Cluster details to go here]
            </p>
          </div>
          <div className="cluster-selection-box-back">
            <p>
              {name}
            </p>
            <form>
              <Input placeholder="Username" type="text"/>
              <Input placeholder="Password" type="password"/>
              <ButtonInput
                className="selection-box-button"
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
