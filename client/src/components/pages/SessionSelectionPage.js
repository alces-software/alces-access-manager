
import _ from 'lodash';
import React from 'react';
import {Button} from 'react-bootstrap';

import SessionSelectionBox from 'components/SessionSelectionBox';
import SelectionPage from 'components/SelectionPage';
import Icon from 'components/Icon';

export default class SessionSelectionPage extends React.Component {
  render() {
    const {
      cluster,
      reloadSessions,
      sessions,
      ui: {reloadingSessions},
    } = this.props;

    // Declare this string separately so don't need to escape angle brackets
    // within JSX.
    const sessionStartCommand = "alces session start <session type>";

    const headerMessage = _.isEmpty(sessions) ?
      (
        <div>
          <p>
            <strong>
              You currently have no sessions running
              on <em>{cluster && cluster.name}</em>.
            </strong>
          </p>
          <p>
            You'll need to sign in to your environment and create a session to
            connect to; this can be done with <code>{sessionStartCommand}</code>.
          </p>
        </div>
    )
    :
      (
        <p>
          Viewing sessions on cluster <em>{cluster && cluster.name}</em>. Select
          a session to connect to below.
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

    return (
      <SelectionPage
        items={sessions}
        keyProp="uuid"
        header={header}
        selectionBoxComponent={SessionSelectionBox}
        selectionBoxProps={selectionBoxProps}
      />
    );
  }
}
