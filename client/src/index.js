/*=============================================================================
 * Copyright (C) 2015 Stephen F. Norledge and Alces Software Ltd.
 *
 * This file is part of Alces Flight.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';

import DevTools from 'containers/DevTools';

import configureStore from 'store/configureStore';
import routes from 'routes';
import {retrieveSession, setCsrfToken} from 'auth/actions';
import retrieveCsrfToken from 'utils/retrieveCsrfToken.js';

const store = configureStore();
store.dispatch(setCsrfToken(retrieveCsrfToken()));
store.dispatch(retrieveSession());

ReactDOM.render(
  <Provider store={store}>
    <div>
      <ReduxRouter>{routes}</ReduxRouter>
      {debugPanel()}
    </div>
  </Provider>,
  document.getElementById('root')
);

function debugPanel() {
  if (__DEVTOOLS__) {
    return <DevTools />
  }
}
