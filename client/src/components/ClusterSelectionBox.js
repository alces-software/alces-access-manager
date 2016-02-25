
import _ from 'lodash';
import React from 'react';
import {Button, Input} from 'react-bootstrap';
import FlipCard from 'react-flipcard';
import {reduxForm} from 'redux-form';
import {Link} from 'react-router';

import Icon from 'components/Icon';
import {selectionBoxPropTypes} from 'utils/propTypes';

class ClusterSelectionBox extends React.Component {
  render() {
    const {
      authenticate,
      fields: {username, password},
      handleSubmit,
      item,
      submitting,
    } = this.props;
    const cluster = item;

    const authenticateCluster = _.partial(authenticate, cluster.ip);

    const incomplete = !(username.value && password.value);

    const submitButtonIcon = submitting ? "cluster-authenticating" : "cluster-authenticate-submit";
    const submitButtonText = (
      <span>
        Login&nbsp;&nbsp;<Icon name={submitButtonIcon}/>
      </span>
    );

    const authenticatedButtonText = (
      <span>
        View&nbsp;&nbsp;<Icon name="cluster-authenticate-submit"/>
      </span>
    );

    const clusterLink = `/cluster/${cluster.ip}`;

    const box = cluster.authenticated_username ?
      (
        <div
          className="session-selection-box"
          >
          <p>
            {cluster.name}
          </p>
          <p>
            IP: {cluster.ip}
          </p>
          <p>
            [Cluster details to go here]
          </p>
          <Link to={clusterLink}>
            <Button
              className="selection-box-button"
              type="button"
              bsStyle="success"
              >
              {authenticatedButtonText}
            </Button>
          </Link>
        </div>
    )
    :
      (
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
                <Button
                  className="selection-box-button"
                  type="submit"
                  bsStyle="success"
                  disabled={incomplete || submitting}
                  >
                  {submitButtonText}
                </Button>
              </form>
            </div>
          </FlipCard>
        </div>
    )

    return box;
  }
}

ClusterSelectionBox.propTypes = selectionBoxPropTypes;

ClusterSelectionBox = reduxForm({
  fields: ['username', 'password'],
})(ClusterSelectionBox);

export default ClusterSelectionBox;
