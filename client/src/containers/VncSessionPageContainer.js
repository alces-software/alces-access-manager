import { connect } from 'react-redux';

import VncSessionPage from 'components/pages/VncSessionPage';
import {vncSessionPageSelector} from 'selectors';
import * as novncActions from 'novnc/actions';

export default connect(
  vncSessionPageSelector,
  novncActions
)(VncSessionPage);
