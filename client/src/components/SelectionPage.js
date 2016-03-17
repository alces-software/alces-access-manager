
import _ from 'lodash';
import React, {PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {elementType} from 'react-prop-types';
import ReactCSSTransitionReplace from 'react-css-transition-replace';

class SelectionPage extends React.Component {
  render() {
    const {addItemBox, header, items, keyProp} = this.props;

    // Render item columns here so we can group all rendered columns together
    // (addItemBox is passed in rendered), before splitting these into rows and
    // rendering these.
    const renderedItemColumns = _.map(items, (item) => this.renderColumn(item));
    // TODO reduce duplication with below.
    const addItemColumn = (
      <Col md={4} key="add-session">
        {addItemBox}
      </Col>
    );
    const allRenderedColumns = [...renderedItemColumns, addItemColumn];

    const groupedColumns = _.chunk(allRenderedColumns, 3);

    // Form a key by concatenating the keyProp of all items, and then we can
    // fade out all items to the new ones whenever this changes.
    const keyComponents = _.map(items, keyProp);
    const key = _.join(keyComponents, '-');

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
          <ReactCSSTransitionReplace
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            transitionName="cross-fade"
            >
            <div key={key}>
              {this.renderRows(groupedColumns)}
            </div>
          </ReactCSSTransitionReplace>
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
    return _.map(row, (element) => element);
  }

  renderColumn(item) {
    const {keyProp, selectionBoxComponent, selectionBoxProps} = this.props

    let finalSelectionBoxProps;
    if (typeof selectionBoxProps === 'function') {
      finalSelectionBoxProps = selectionBoxProps(item);
    }
    else {
      finalSelectionBoxProps = selectionBoxProps;
    }

    const key = item[keyProp];
    const selectionBoxElement = React.createElement(
      selectionBoxComponent,
      {item, ...finalSelectionBoxProps}
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
  selectionBoxProps: PropTypes.oneOfType(
    [PropTypes.object, PropTypes.func]
  ), // Props to pass through to each selection box, or function to generate these for each item.
  addItemBox: PropTypes.element, // Optional final box to add a new item.
};

export default SelectionPage;
