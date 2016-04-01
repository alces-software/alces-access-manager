
import _ from 'lodash';
import React from 'react';

import AddSessionBox from 'components/AddSessionBox';
import ClusterInformationHeader from 'components/ClusterInformationHeader';
import SessionSelectionBox from 'components/SessionSelectionBox';
import SelectionPage from 'components/SelectionPage';

export default class SessionSelectionPage extends React.Component {
  render() {
    const {
      cluster,
      sessions,
      sessionActions,
      ui,
      uiActions,
    } = this.props;

    const selectionBoxProps = {cluster};

    const launchSessionForCluster = _.partial(sessionActions.launchSession, cluster);
    const addSessionBox = (
      <AddSessionBox
        launchSession={launchSessionForCluster}
        cluster={cluster}
        ui={ui}
        uiActions={uiActions}
      />
    );

    const header = (
      <ClusterInformationHeader
        cluster={cluster}
        sessions={sessions}
        sessionActions={sessionActions}
        ui={ui}
      />
    );

    return (
      <SelectionPage
        addItemBox={addSessionBox}
        items={sessions}
        keyProp="uuid"
        header={header}
        selectionBoxComponent={SessionSelectionBox}
        selectionBoxProps={selectionBoxProps}
      />
    );
  }
}
