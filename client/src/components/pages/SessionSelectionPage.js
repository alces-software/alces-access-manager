
import React from 'react';
import {Button} from 'react-bootstrap';

import SessionSelectionBox from 'components/SessionSelectionBox';
import SelectionPage from 'components/SelectionPage';
import Icon from 'components/Icon';

// require("styles/ClusterSelectionPage.scss");

export default class SessionSelectionPage extends React.Component {
  render() {
    const {cluster, sessions} = this.props;
    const headerText = (
      <p>
        <span>
          Viewing sessions on cluster <em>{cluster.name}</em>. Select a session
          to connect to below.
        </span>
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
