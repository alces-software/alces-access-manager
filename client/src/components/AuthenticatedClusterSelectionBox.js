
import React from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router';

import Icon from 'components/Icon';

class AuthenticatedClusterSelectionBox extends React.Component {
  render() {
    const {cluster} = this.props;

    const clusterLink = `/cluster/${cluster.ip}`;
    const submitButtonText = (
      <span>
        View&nbsp;&nbsp;<Icon name="cluster"/>
      </span>
    );
    const logoutButtonText = (
      <span>
        Change User&nbsp;&nbsp;<Icon name="cluster-logout"/>
      </span>
    );

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
        <Link to={clusterLink}>
          <Button
            className="selection-box-button"
            type="button"
            bsStyle="success"
            >
            {submitButtonText}
          </Button>
        </Link>
        <Button
          className="selection-box-button"
          type="button"
          bsStyle="info"
          >
          {logoutButtonText}
        </Button>
      </div>
    );
  }
}

export default AuthenticatedClusterSelectionBox;

