
import React from 'react';

import ClusterSelectionBox from 'components/ClusterSelectionBox';
import FlightGrid from 'components/FlightGrid';

require("styles/ClusterSelectionPage.scss");

export default class ClusterSelectionPage extends React.Component {
  render() {
    return (
      <FlightGrid columns={3} containerClassName="cluster-selection-page">
        <ClusterSelectionBox name="A normal cluster"></ClusterSelectionBox>
        <ClusterSelectionBox name="Better cluster"></ClusterSelectionBox>
        <ClusterSelectionBox name="Test cluster"></ClusterSelectionBox>
        <ClusterSelectionBox name="The best cluster"></ClusterSelectionBox>
      </FlightGrid>
    );
  }
}
