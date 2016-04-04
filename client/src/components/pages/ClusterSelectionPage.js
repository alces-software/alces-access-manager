
import React from 'react';

import SingleClusterPage from 'components/SingleClusterPage';
import MultipleClustersPage from 'components/MultipleClustersPage';

export default class ClusterSelectionPage extends React.Component {
  render() {
    const {
      authenticate,
      clusters,
      singleUserMode,
    } = this.props;

    if (singleUserMode) {
      const cluster = clusters[0];
      return (
        <SingleClusterPage
          authenticate={authenticate}
          cluster={cluster}
        />
      );
    }
    else {
      return <MultipleClustersPage {...this.props}/>
    }
  }
}
