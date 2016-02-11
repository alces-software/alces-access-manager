
import _ from 'lodash';
import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import ClusterSelectionBox from 'components/ClusterSelectionBox';

// require("styles/ClusterSelectionPage.scss");

export default class SessionSelectionPage extends React.Component {
  render() {
    const {cluster, sessions} = this.props;
    const groupedSessions = _.chunk(sessions, 3);

    return (
      <div className="container">
        <Grid>
          <Row>
            <Col md={12}>
              <div className="environment-details-box">
                Viewing sessions on cluster <em>{cluster.name}</em>. Select a session to connect to below.
              </div>
            </Col>
          </Row>
          {this.renderClusterRows(groupedSessions)}
        </Grid>
      </div>
    );
  }

  renderClusterRows(rows) {
    return _.map(rows, (row, key) => (
      <Row key={key}>
        {this.renderClusterRow(row)}
      </Row>
    ));
  }

  renderClusterRow(row) {
    return _.map(row, (cluster) => this.renderClusterColumn(cluster));
  }

  renderClusterColumn(cluster) {
    return (
      <Col md={4} key={cluster.id}>
        <ClusterSelectionBox name={cluster.name}/>
      </Col>
    )
  }
}
