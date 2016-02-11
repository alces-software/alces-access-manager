
import _ from 'lodash';
import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import ClusterSelectionBox from 'components/ClusterSelectionBox';

require("styles/ClusterSelectionPage.scss");

export default class ClusterSelectionPage extends React.Component {
  render() {
    const {clusters, environment} = this.props;
    const groupedClusters = _.chunk(clusters, 3);

    return (
      <div className="container">
        <Grid>
          <Row>
            <Col md={12}>
              <div className="environment-details-box">
                Connected to environment <em>{environment.name}</em>. Select a cluster below to get started.
              </div>
            </Col>
          </Row>
          {this.renderClusterRows(groupedClusters)}
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
