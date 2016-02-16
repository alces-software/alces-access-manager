
import _ from 'lodash';
import React from 'react';

import ClusterSelectionBox from 'components/ClusterSelectionBox';
import SelectionPage from 'components/SelectionPage';

export default class ClusterSelectionPage extends React.Component {
  componentWillMount() {
    this.props.loadClusters()
  }

  render() {
    const {clusters, environment} = this.props;

    const clustersAvailableMessage = _.isEmpty(clusters) ?
      `There are no clusters available within this environment, please
       create a cluster within the environment to connect to.`
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
      />
    );
  }
}
