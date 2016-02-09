/*=============================================================================
 * Copyright (C) 2015 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Alces Flight.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React, {PropTypes} from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

/**
 * Render this.props.children in a grid.
 *
 * `this.props.children`: an array of React Elements to render in the grid.
 * `this.props.containerClassName`: the CSS class name to add to the grid.
 * `this.props.columns`: the number of columns in the grid.
 *
 */
class FlightGrid extends React.Component {
  render() {
    return (
      <Grid className={this.props.containerClassName} fluid={this.props.fluid}>
        {this.renderGroupedChildren()}
      </Grid>
    )
  }

  renderGroupedChildren() {
    return this.groupedChildren().map(
      (row, rowIdx) => this.renderRow(row, rowIdx)
    );
  }

  renderRow(row, rowIdx) {
    const columns = row.map(
      (child, colIdx) => this.renderColumn(child, colIdx)
    );
    return (
      <Row key={rowIdx}>{columns}</Row>
    )
  }

  renderColumn(child, colIdx) {
    const {columns} = this.props;
    const colWidth = 12 / columns;

    return (
      <Col key={colIdx} md={colWidth}>
        {child}
      </Col>
    )
  }

  // Return this.props.children grouped into rows and columns.
  //
  // If we were to return the following:
  //
  //   [ [one,  two,  three],
  //     [four, five],
  //   ]
  //
  // there would be two rows. The first with three items and the second
  // with two.
  //
  groupedChildren() {
    const { children, columns } = this.props;
    const groups = [];
    let group = [];
    React.Children.forEach(children, child => {
      group.push(child);
      if (group.length === columns) {
        groups.push(group);
        group = [];
      }
    })
    if (group.length > 0) {
      groups.push(group)
    }
    return groups;
  }
}

FlightGrid.propTypes = {
  containerClassName: PropTypes.string.isRequired,
  columns: PropTypes.number.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default FlightGrid;
