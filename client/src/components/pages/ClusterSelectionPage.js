
import React from 'react';

import ClusterSelectionBox from 'components/ClusterSelectionBox';
import SelectionPage from 'components/SelectionPage';

require("styles/ClusterSelectionPage.scss");

export default class ClusterSelectionPage extends React.Component {
  render() {
    const {clusters, environment} = this.props;
    const headerText = (
      <span>
        Connected to environment <em>{environment.name}</em>. Select a cluster
        below to get started.
      </span>
    );

    return (
      <SelectionPage
        items={clusters}
        headerText={headerText}
        selectionBoxComponent={ClusterSelectionBox}
      />
    );
  }
}
