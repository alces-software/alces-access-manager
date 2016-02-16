import { connect } from 'react-redux';

import SessionSelectionPage from 'components/pages/SessionSelectionPage';
import {sessionSelectionPageSelector} from 'selectors';

export default connect(
  sessionSelectionPageSelector
)(SessionSelectionPage);
