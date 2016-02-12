
import _ from 'lodash';
import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

require("styles/ClusterSelectionPage.scss");

export default class SelectionPage extends React.Component {
  render() {
    const {headerText, items} = this.props;
    const groupedItems = _.chunk(items, 3);

    return (
      <div className="container">
        <Grid>
          <Row>
            <Col md={12}>
              <div className="environment-details-box">
                {headerText}
              </div>
            </Col>
          </Row>
          {this.renderRows(groupedItems)}
        </Grid>
      </div>
    );
  }

  renderRows(rows) {
    return _.map(rows, (row, key) => (
      <Row key={key}>
        {this.renderRow(row)}
      </Row>
    ));
  }

  renderRow(row) {
    return _.map(row, (item) => this.renderColumn(item));
  }

  renderColumn(item) {
    const selectionBoxElement = React.createElement(
      this.props.selectionBoxComponent,
      {name: item.name}
    );

    return (
      <Col md={4} key={item.id}>
        {selectionBoxElement}
      </Col>
    )
  }
}
