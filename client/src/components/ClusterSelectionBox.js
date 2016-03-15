
import React from 'react';

import AuthenticatedClusterSelectionBox from 'components/AuthenticatedClusterSelectionBox';
import Icon from 'components/Icon';
import UnauthenticatedClusterSelectionBox from 'components/UnauthenticatedClusterSelectionBox';
import {selectionBoxPropTypes} from 'utils/propTypes';

const PingingClusterFilter = ({children}) => {
  return (
    <div className="cluster-filter-container">
      <div className="cluster-filter-message">
        <Icon name="cluster-pinging" className="cluster-pinging-icon"></Icon>
      </div>
      <div className="cluster-filter">
        {children}
      </div>
    </div>
  )
};

const UnavailableClusterFilter = ({children}) => {
  return (
    <div className="cluster-filter-container">
      <div className="cluster-filter-message">
        <strong>NOT&nbsp;AVAILABLE</strong>
      </div>
      <div className="cluster-filter">
        {children}
      </div>
    </div>
  )
}

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
        <UnavailableClusterFilter>
          {selectionBoxElement}
        </UnavailableClusterFilter>
      );
    }
    else {
      return selectionBoxElement;
    }
  }
}

ClusterSelectionBox.propTypes = selectionBoxPropTypes;

export default ClusterSelectionBox;
