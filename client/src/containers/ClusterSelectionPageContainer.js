import { connect } from 'react-redux';

import ClusterSelectionPage from 'components/pages/ClusterSelectionPage';

export default connect(
  (state) => ({clusters: state.clusters})
)(ClusterSelectionPage);
