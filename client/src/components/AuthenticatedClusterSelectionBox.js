
import _ from 'lodash';
import React from 'react';
import {Button} from 'react-bootstrap';
import {ButtonLink} from 'flight-common';

import ButtonContent from 'components/ButtonContent';
import ClusterSelectionInfo from 'components/ClusterSelectionInfo';
import SelectionBoxButtonContainer from 'components/SelectionBoxButtonContainer';
import SshAccessInfo from 'components/SshAccessInfo';
import VpnConfigDownloadLink from 'components/VpnConfigDownloadLink';

class AuthenticatedClusterSelectionBox extends React.Component {
  render() {
    const {cluster, logout} = this.props;

    const clusterLink = `/cluster/${cluster.ip}`;

    const logoutCluster = _.partial(logout, cluster);

    const vpnAccessInfo = cluster.hasVpn ?
      (
        <p>
          VPN configuration: <VpnConfigDownloadLink
            cluster={cluster}>
            download
          </VpnConfigDownloadLink>
        </p>
    )
    :
      null;

    return (
      <div
        className="static-selection-box"
      >
        <ClusterSelectionInfo cluster={cluster}/>
        <p>
          Logged in as <em>{cluster.authenticated_username}</em>
        </p>
        <SshAccessInfo cluster={cluster}/>
        {vpnAccessInfo}
        <SelectionBoxButtonContainer>
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
        </SelectionBoxButtonContainer>
      </div>
    );
  }
}

export default AuthenticatedClusterSelectionBox;

