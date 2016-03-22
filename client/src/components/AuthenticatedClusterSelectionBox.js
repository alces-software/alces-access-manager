
import _ from 'lodash';
import React from 'react';
import {Button} from 'react-bootstrap';

import ButtonContent from 'components/ButtonContent';
import {ButtonLink} from 'components/Links';

class AuthenticatedClusterSelectionBox extends React.Component {
  render() {
    const {cluster, logout} = this.props;

    const clusterLink = `/cluster/${cluster.ip}`;

    const logoutCluster = _.partial(logout, cluster);

    return (
      <div
        className="static-selection-box"
        >
        <p>
          <strong>{cluster.name}</strong>
        </p>
        <p>
          IP: {cluster.ip}
        </p>
        <p>
          Logged in as <em>{cluster.authenticated_username}</em>
        </p>
        <ButtonLink
          bsStyle="success"
          className="selection-box-button"
          to={clusterLink}
          type="button"
          >
          <ButtonContent text="View" iconName="cluster"/>
        </ButtonLink>
        <Button
          bsStyle="info"
          className="selection-box-button"
          onClick={logoutCluster}
          type="button"
          >
          <ButtonContent text="Change User" iconName="cluster-logout"/>
        </Button>
      </div>
    );
  }
}

export default AuthenticatedClusterSelectionBox;

