
import _ from 'lodash';
import React from 'react';

import ClusterSelectionBox from 'components/ClusterSelectionBox';
import SelectionPage from 'components/SelectionPage';

export default class ClusterSelectionPage extends React.Component {
  render() {
    const {clusters, environment, authenticate, logout} = this.props;

    const clusterSelectionBoxProps = {authenticate, logout}

    const clustersAvailableMessage = _.isEmpty(clusters) ?
      <strong>
        There are no clusters available within this environment, please create
        a cluster within the environment to connect to.
      </strong>
    :
      `Select a cluster below to get started.`;
    const header = (
      <div>
        <p>
          Connected to environment <em>{environment.name}</em>.
        </p>
        <p>
          {clustersAvailableMessage}
        </p>
      </div>
    );

    return (
      <SelectionPage
        items={clusters}
        keyProp="ip"
        header={header}
        selectionBoxComponent={ClusterSelectionBox}
        selectionBoxProps={clusterSelectionBoxProps}
      />
    );
  }
}
