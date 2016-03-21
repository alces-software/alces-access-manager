
import _ from 'lodash';
import React from 'react';
import {Button} from 'react-bootstrap';

import AddSessionBox from 'components/AddSessionBox';
import SessionSelectionBox from 'components/SessionSelectionBox';
import SelectionPage from 'components/SelectionPage';
import Icon from 'components/Icon';

export default class SessionSelectionPage extends React.Component {
  render() {
    const {
      cluster,
      launchSession,
      reloadSessions,
      sessions,
      ui: {launchingSession, reloadingSessions},
    } = this.props;

    const headerMessage = _.isEmpty(sessions) ?
      (
        <div>
          <p>
            <strong> You currently have no sessions running on <em>{cluster &&
                cluster.name}</em>.</strong> You can start a new session using
            the box below.
          </p>
          <p>
          </p>
        </div>
    )
    :
      (
        <p>
          Viewing sessions on cluster <em>{cluster && cluster.name}</em>. Select
          a session to connect to below, or create a new session.
        </p>
    );

    const reloadIconName = reloadingSessions ? "sessions-reloading" : "sessions-reload";

    const reloadSessionsForCluster = _.partial(reloadSessions, cluster.ip);
    const header = (
      <div>
        {headerMessage}
        <p>
          <Button
            bsStyle="primary"
            className="sessions-reload-button"
            onClick={reloadSessionsForCluster}
            disabled={reloadingSessions}
            >
            Refresh sessions&nbsp;
            <Icon name={reloadIconName} size="2x"/>
          </Button>
        </p>
      </div>
    );

    const selectionBoxProps = {cluster};

    const launchSessionForCluster = _.partial(launchSession, cluster.ip);
    const addSessionBox = (
      <AddSessionBox
        launchingSession={launchingSession}
        launchSession={launchSessionForCluster}
        sessionTypes={cluster.sessionTypes}
      />
    )

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
