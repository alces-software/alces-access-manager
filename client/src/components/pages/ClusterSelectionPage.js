
import React from 'react';

import ClusterSelectionBox from 'components/ClusterSelectionBox';
import FlightGrid from 'components/FlightGrid';

require("styles/ClusterSelectionPage.scss");

export default class ClusterSelectionPage extends React.Component {
  render() {
    return (
      <FlightGrid columns={3}>
        <ClusterSelectionBox></ClusterSelectionBox>
        <ClusterSelectionBox></ClusterSelectionBox>
        <ClusterSelectionBox></ClusterSelectionBox>
        <ClusterSelectionBox></ClusterSelectionBox>
      </FlightGrid>
    );
  }
}
