
import _ from 'lodash';
import React, {PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {elementType} from 'react-prop-types';

class SelectionPage extends React.Component {
  render() {
    const {header, items} = this.props;
    const groupedItems = _.chunk(items, 3);

    return (
      <div className="container">
        <Grid>
          <Row>
            <Col md={12}>
              <div className="selection-details-box">
                {header}
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
    const {keyProp, selectionBoxComponent, selectionBoxProps} = this.props

    const key = item[keyProp];
    const selectionBoxElement = React.createElement(
      selectionBoxComponent,
      {item, ...selectionBoxProps}
    );

    return (
      <Col md={4} key={key}>
        {selectionBoxElement}
      </Col>
    )
  }
}

SelectionPage.propTypes = {
  header: PropTypes.element.isRequired, // Page header.
  items: PropTypes.array.isRequired, // Items to display.
  keyProp: PropTypes.string.isRequired, // Property to use for item keys.
  selectionBoxComponent: elementType.isRequired, // Component to display items with.
  selectionBoxProps: PropTypes.object, // Props to pass through to each selection box.
};

export default SelectionPage;
