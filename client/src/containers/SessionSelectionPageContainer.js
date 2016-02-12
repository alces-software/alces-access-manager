import { connect } from 'react-redux';

import SessionSelectionPage from 'components/pages/SessionSelectionPage';

export default connect(
  (state) => ({
    cluster: state.clusters[0],
    sessions: state.sessions,
  })
)(SessionSelectionPage);
