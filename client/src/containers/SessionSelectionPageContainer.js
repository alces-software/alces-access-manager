
import { connect } from 'react-redux';

import SessionSelectionPage from 'components/pages/SessionSelectionPage';
import {sessionSelectionPageSelector} from 'selectors';
import * as sessionActions from 'sessions/actions';

export default connect(
  sessionSelectionPageSelector,
  sessionActions
)(SessionSelectionPage);
