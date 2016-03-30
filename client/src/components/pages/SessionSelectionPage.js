
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
      sessions,
      sessionActions,
      ui,
      uiActions,
    } = this.props;

    const headerMessage = _.isEmpty(sessions) ?
      (
        <div>
          <p>
            <strong> You currently have no sessions running as <em>{cluster &&
                cluster.authenticated_username}</em> on <em>{cluster &&
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
          Viewing sessions for <em>{cluster &&
            cluster.authenticated_username}</em> on <em>{cluster &&
            cluster.name}</em>. Select a session to connect to below, or create
          a new session.
        </p>
    );

    const reloadIconName = ui.reloadingSessions ? "sessions-reloading" : "sessions-reload";

    const reloadSessionsForCluster = _.partial(sessionActions.reloadSessions, cluster);
    const header = (
      <div>
        {headerMessage}
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
    );

    const selectionBoxProps = {cluster};

    const launchSessionForCluster = _.partial(sessionActions.launchSession, cluster);
    const addSessionBox = (
      <AddSessionBox
        launchSession={launchSessionForCluster}
        sessionTypes={cluster.sessionTypes}
        ui={ui}
        uiActions={uiActions}
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
