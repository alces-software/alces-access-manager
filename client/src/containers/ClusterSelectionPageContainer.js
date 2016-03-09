
import { connect } from 'react-redux';

import ClusterSelectionPage from 'components/pages/ClusterSelectionPage';
import * as clusterActions from 'clusters/actions';

export default connect(
  (state) => ({
    environment: state.environment,
    clusters: state.clusters,
  }),
  clusterActions
)(ClusterSelectionPage);
