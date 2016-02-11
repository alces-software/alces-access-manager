
import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import ClusterSelectionBox from 'components/ClusterSelectionBox';

require("styles/ClusterSelectionPage.scss");

export default class ClusterSelectionPage extends React.Component {
  render() {
    return (
      <div className="container">
        <Grid>
          <Row>
            <Col md={12}>
              <div className="environment-details-box">You are connected to an environment. Select a cluster below to get started.</div>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <ClusterSelectionBox name="A normal cluster"></ClusterSelectionBox>
            </Col>
            <Col md={4}>
              <ClusterSelectionBox name="Better cluster"></ClusterSelectionBox>
            </Col>
            <Col md={4}>
              <ClusterSelectionBox name="Test cluster"></ClusterSelectionBox>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <ClusterSelectionBox name="Best cluster"></ClusterSelectionBox>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
