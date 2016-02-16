import { connect } from 'react-redux';

import VncSessionPage from 'components/pages/VncSessionPage';
import {vncSessionPageSelector} from 'selectors';

export default connect(
  vncSessionPageSelector
)(VncSessionPage);
