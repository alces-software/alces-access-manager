
import React from 'react';

import AuthenticatedClusterSelectionBox from 'components/AuthenticatedClusterSelectionBox';
import UnauthenticatedClusterSelectionBox from 'components/UnauthenticatedClusterSelectionBox';
import {selectionBoxPropTypes} from 'utils/propTypes';

class ClusterSelectionBox extends React.Component {
  render() {
    const {authenticate, form, item, logout} = this.props;
    const cluster = item;

    if (cluster.authenticated_username) {
      return <AuthenticatedClusterSelectionBox
        cluster={cluster}
        logout={logout}
      />
    }
    else {
      return <UnauthenticatedClusterSelectionBox
        authenticate={authenticate}
        cluster={cluster}
        form={form}
      />
    }
  }
}

ClusterSelectionBox.propTypes = selectionBoxPropTypes;

export default ClusterSelectionBox;
