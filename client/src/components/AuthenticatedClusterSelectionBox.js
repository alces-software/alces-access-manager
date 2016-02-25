
import React from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router';

import Icon from 'components/Icon';

class AuthenticatedClusterSelectionBox extends React.Component {
  render() {
    const {cluster} = this.props;

    const buttonText = (
      <span>
        View&nbsp;&nbsp;<Icon name="cluster-authenticate-submit"/>
      </span>
    );
    const clusterLink = `/cluster/${cluster.ip}`;

    return (
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
            {buttonText}
          </Button>
        </Link>
      </div>
    );
  }
}

export default AuthenticatedClusterSelectionBox;

