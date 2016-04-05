import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import {Button} from 'react-bootstrap';

import Icon from 'components/Icon';
import SshAccessCommand from 'components/SshAccessCommand';
import VpnConfigDownloadLink from 'components/VpnConfigDownloadLink';

const propTypes = {
  cluster: PropTypes.object.isRequired,
  sessions: PropTypes.array.isRequired,
  sessionActions: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
};

class ClusterInformationHeader extends Component {
  render() {
    const {
      cluster,
      sessions,
      sessionActions,
      ui,
    } = this.props;

    const runningSessionsInfo = _.isEmpty(sessions) ?
      (
        <div>
          <p>
            <strong> You currently have no sessions running as <em>{cluster &&
                cluster.authenticated_username}</em> on <em>{cluster &&
                cluster.name}</em>.</strong> You can start a new session using
            the box below.
          </p>
        </div>
    )
    :
      (
        <p>
          Viewing sessions for <em>{cluster &&
            cluster.authenticated_username}</em> on <em>{cluster &&
            cluster.name}</em>. Select a session to connect to below, or create
          a new session.
        </p>
    );

    const vpnAccessInfo = cluster.hasVpn ?
      (
        <p>
          You will need to connect to this cluster's VPN to access the cluster
          using SSH, or to connect to VNC sessions on the cluster. The VPN
          configuration files are available to
          download <VpnConfigDownloadLink cluster={cluster}>
            here
          </VpnConfigDownloadLink>.
        </p>
    )
    :
      null;

    const reloadIconName = ui.reloadingSessions ? "sessions-reloading" : "sessions-reload";
    const reloadSessionsForCluster = _.partial(sessionActions.reloadSessions, cluster);

    return (
      <div>
        {runningSessionsInfo}
        <p>
          You can sign into this cluster directly with SSH, using the following
          command: <SshAccessCommand cluster={cluster}/>.
        </p>
        {vpnAccessInfo}
        <p>
          <Button
            bsStyle="primary"
            className="sessions-reload-button"
            onClick={reloadSessionsForCluster}
            disabled={ui.reloadingSessions}
            >
            Refresh sessions&nbsp;
            <Icon name={reloadIconName} size="2x"/>
          </Button>
        </p>
      </div>
    )
  }
}

ClusterInformationHeader.propTypes = propTypes;
export default ClusterInformationHeader;
