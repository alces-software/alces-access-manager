import { connect } from 'react-redux';

import ClusterSelectionPage from 'components/pages/ClusterSelectionPage';

export default connect(
  (state) => ({
    environment: state.environment,
    clusters: state.clusters,
  })
)(ClusterSelectionPage);
