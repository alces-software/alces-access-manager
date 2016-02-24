
import _ from 'lodash';
import React from 'react';
import {ButtonInput, Input} from 'react-bootstrap';
import FlipCard from 'react-flipcard';
import {reduxForm} from 'redux-form';

import {selectionBoxPropTypes} from 'utils/propTypes';

class ClusterSelectionBox extends React.Component {
  render() {
    const {
      authenticate,
      fields: {username, password},
      handleSubmit,
      item,
    } = this.props;
    const cluster = item;

    const authenticateCluster = _.partial(authenticate, cluster.ip);

    const incomplete = !(username.value && password.value);

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
            <form onSubmit={handleSubmit(authenticateCluster)}>
              <Input placeholder="Username" type="text" {...username}/>
              <Input placeholder="Password" type="password" {...password}/>
                <ButtonInput
                  className="selection-box-button"
                  type="submit"
                  value="View"
                  bsStyle="success"
                  disabled={incomplete}
                />
            </form>
          </div>
        </FlipCard>
      </div>
    );
  }
}

ClusterSelectionBox.propTypes = selectionBoxPropTypes;

ClusterSelectionBox = reduxForm({
  fields: ['username', 'password'],
})(ClusterSelectionBox);

export default ClusterSelectionBox;
