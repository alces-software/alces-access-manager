
import _ from 'lodash';
import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

export default class SelectionPage extends React.Component {
  render() {
    const {headerText, items} = this.props;
    const groupedItems = _.chunk(items, 3);

    return (
      <div className="container">
        <Grid>
          <Row>
            <Col md={12}>
              <div className="selection-details-box">
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
    const {keyProp, selectionBoxComponent} = this.props

    const key = item[keyProp];
    const selectionBoxElement = React.createElement(
      selectionBoxComponent,
      {name: item.name}
    );

    return (
      <Col md={4} key={key}>
        {selectionBoxElement}
      </Col>
    )
  }
}
