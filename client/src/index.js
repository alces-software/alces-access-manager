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

import {loadSessionData} from 'ui/actions';
import configureStore from 'store/configureStore';
import routes from 'routes';

const store = configureStore();

store.dispatch(loadSessionData());

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
