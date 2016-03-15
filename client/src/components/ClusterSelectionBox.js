
import React from 'react';

import AuthenticatedClusterSelectionBox from 'components/AuthenticatedClusterSelectionBox';
import Icon from 'components/Icon';
import UnauthenticatedClusterSelectionBox from 'components/UnauthenticatedClusterSelectionBox';
import {selectionBoxPropTypes} from 'utils/propTypes';

const PingingClusterFilter = ({children}) => {
  return (
    <div className="pinging-cluster-filter">
      <div className="pinging-cluster-icon">
        <Icon name="cluster-pinging"></Icon>
      </div>
      <div className="pinging-cluster-element">
        {children}
      </div>
    </div>
  )
};

class ClusterSelectionBox extends React.Component {
  render() {
    const {authenticate, form, item, logout} = this.props;
    const cluster = item;

    const selectionBoxElement = cluster.authenticated_username ?
      <AuthenticatedClusterSelectionBox
        cluster={cluster}
        logout={logout}
      />
    :
      <UnauthenticatedClusterSelectionBox
        authenticate={authenticate}
        cluster={cluster}
        form={form}
      />

    if (cluster.available === undefined) {
      return (
        <PingingClusterFilter>
          {selectionBoxElement}
        </PingingClusterFilter>
      );
    }
    else if (!cluster.available) {
      return (
        <div className="unavailable-cluster-filter">
          {selectionBoxElement}
        </div>
      );
    }
    else {
      return selectionBoxElement;
    }
  }
}

ClusterSelectionBox.propTypes = selectionBoxPropTypes;

export default ClusterSelectionBox;
