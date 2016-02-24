
import _ from 'lodash';
import React from 'react';
import {Button} from 'react-bootstrap';

import SessionSelectionBox from 'components/SessionSelectionBox';
import SelectionPage from 'components/SelectionPage';
import Icon from 'components/Icon';

export default class SessionSelectionPage extends React.Component {
  render() {
    const {cluster, sessions} = this.props;

    // Declare this string separately so don't need to escape angle brackets
    // within JSX.
    // TODO: show this command as code.
    const sessionStartCommand = "alces session start <session type>";

    // TODO: Display appropriate message if cluster not found.
    const headerMessage = _.isEmpty(sessions) ?
      <span>
        You currently have no sessions running
        on <em>{cluster && cluster.name}</em>, you'll need to sign in to your
        environment and create a session to connect to (this can be done with
        "{sessionStartCommand}").
      </span>
    :
      <span>
        Viewing sessions on cluster <em>{cluster && cluster.name}</em>. Select
        a session to connect to below.
      </span>
    const header = (
      <p>
        {headerMessage}
        &nbsp;
        <span>
          <Button
            bsStyle="primary"
            className="sessions-reload-button"
            >
            Refresh sessions&nbsp;
            <Icon name="sessions-reload" size="2x"/>
          </Button>
        </span>
      </p>
    );

    const selectionBoxProps = {cluster};

    return (
      <SelectionPage
        items={sessions}
        keyProp="port"
        header={header}
        selectionBoxComponent={SessionSelectionBox}
        selectionBoxProps={selectionBoxProps}
      />
    );
  }
}
