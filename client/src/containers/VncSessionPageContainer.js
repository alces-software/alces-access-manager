import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import VncSessionPage from 'components/pages/VncSessionPage';
import {vncSessionPageSelector} from 'selectors';
import * as notificationActions from 'notification/actions';
import * as novncActions from 'novnc/actions';

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(notificationActions, dispatch),
  ...bindActionCreators(novncActions, dispatch),
});

export default connect(
  vncSessionPageSelector,
  mapDispatchToProps
)(VncSessionPage);
