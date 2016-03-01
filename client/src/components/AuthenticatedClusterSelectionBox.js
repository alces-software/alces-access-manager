
import React from 'react';
import {Button} from 'react-bootstrap';

import Icon from 'components/Icon';
import {ButtonLink} from 'components/Links';

class AuthenticatedClusterSelectionBox extends React.Component {
  render() {
    const {cluster} = this.props;

    const clusterLink = `/cluster/${cluster.ip}`;

    const ButtonContent = ({text, iconName}) => (
      <span>
        {text}&nbsp;&nbsp;<Icon name={iconName}/>
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
          type="button"
          >
          <ButtonContent text="Change User" iconName="cluster-logout"/>
        </Button>
      </div>
    );
  }
}

export default AuthenticatedClusterSelectionBox;

