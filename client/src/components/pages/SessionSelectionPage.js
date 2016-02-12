
import React from 'react';

import SessionSelectionBox from 'components/SessionSelectionBox';
import SelectionPage from 'components/SelectionPage';

// require("styles/ClusterSelectionPage.scss");

export default class SessionSelectionPage extends React.Component {
  render() {
    const {cluster, sessions} = this.props;
    const headerText = (
      <span>
        Viewing sessions on cluster <em>{cluster.name}</em>. Select a session
        to connect to below.
      </span>
    )

    return (
      <SelectionPage
        items={sessions}
        headerText={headerText}
        selectionBoxComponent={SessionSelectionBox}
      />
    )
  }
}
