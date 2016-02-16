
import React from 'react';
import {ButtonInput, Input} from 'react-bootstrap';
import FlipCard from 'react-flipcard';
import {Link} from 'react-router';

import {selectionBoxPropTypes} from 'utils/propTypes';

class ClusterSelectionBox extends React.Component {
  render() {
    const cluster = this.props.item;
    const clusterLink = `/cluster/${cluster.ip}`;

    return (
      <div
        className="cluster-selection-box"
        >
        <FlipCard>
          <div className="cluster-selection-box-front">
            <p>
              {cluster.name}
            </p>
            <p>
              IP: {cluster.ip}
            </p>
            <p>
              [Cluster details to go here]
            </p>
          </div>
          <div className="cluster-selection-box-back">
            <p>
              {cluster.name}
            </p>
            <form>
              <Input placeholder="Username" type="text"/>
              <Input placeholder="Password" type="password"/>
              <Link to={clusterLink}>
                <ButtonInput
                  className="selection-box-button"
                  type="submit"
                  value="View"
                  bsStyle="success"
                />
              </Link>
            </form>
          </div>
        </FlipCard>
      </div>
    );
  }
}

ClusterSelectionBox.propTypes = selectionBoxPropTypes;

export default ClusterSelectionBox;
